import base64
import io

import numpy as np
from astropy.io import fits
from astropy.wcs import WCS
from astropy.coordinates import SkyCoord
from astropy.nddata import Cutout2D, NoOverlapError
from astropy.stats import sigma_clipped_stats
from astropy.visualization import ZScaleInterval
import astropy.units as u
from astropy.wcs.utils import fit_wcs_from_points
from photutils.detection import DAOStarFinder
from PIL import Image


def _find_image_hdu(hdul):
    """
    SPHEREx files are multi-extension: the primary HDU is empty and the science
    image lives in the extension named "IMAGE" (others: FLAGS, VARIANCE, ZODI, PSF, WCS-WAVE).
    """
    if "IMAGE" in hdul:
        return hdul["IMAGE"]
    for hdu in hdul:
        if getattr(hdu, "data", None) is not None and hdu.data.ndim == 2:
            return hdu
    raise ValueError("No 2D image extension found in FITS file")


def load_and_crop(fits_path: str, ra: float, dec: float, size_arcmin: float):
    """Crop a fixed sky-coordinate window out of a SPHEREx FITS frame."""
    with fits.open(fits_path) as hdul:
        hdu = _find_image_hdu(hdul)
        data = hdu.data.astype(float)
        wcs = WCS(hdu.header, hdul)

    center = SkyCoord(ra=ra * u.deg, dec=dec * u.deg, frame="icrs")
    pixscale = np.abs(wcs.proj_plane_pixel_scales()[0].to(u.arcmin).value)
    size_px = max(int(size_arcmin / pixscale), 20)

    try:
        cutout = Cutout2D(data, position=center, size=(size_px, size_px), wcs=wcs,
                          mode="partial", fill_value=np.nan)
    except NoOverlapError:
        raise ValueError("Target position is outside this image")

    image = cutout.data
    # NaN pixels (masked / off-detector) break detection and PNG scaling
    image = np.nan_to_num(image, nan=float(np.nanmedian(image)) if np.isfinite(image).any() else 0.0)
    return image, cutout.wcs


def detect_sources(image: np.ndarray, fwhm: float = 3.0, threshold_sigma: float = 5.0):
    mean, median, std = sigma_clipped_stats(image, sigma=3.0)
    finder = DAOStarFinder(fwhm=fwhm, threshold=threshold_sigma * std)
    sources = finder(image - median)
    if sources is None or len(sources) == 0:
        return np.empty((0, 2))
    return np.column_stack((sources["xcentroid"], sources["ycentroid"]))


def find_moving_source(prev_xy, curr_xy, max_static_shift=1.5, min_move=1.0):
    """Pick the detection in curr_xy that isn't explained by a static star."""
    if curr_xy is None or len(curr_xy) == 0:
        return None
    if prev_xy is None or len(prev_xy) == 0:
        return curr_xy[0]

    candidates = []
    for pt in curr_xy:
        dists = np.linalg.norm(prev_xy - pt, axis=1)
        nearest = dists.min()
        if nearest > max_static_shift:
            candidates.append((pt, nearest))

    if not candidates:
        return None

    candidates.sort(key=lambda c: c[1])
    for pt, d in candidates:
        if d >= min_move:
            return pt
    return candidates[0][0]


def image_to_png_base64(image: np.ndarray) -> str:
    """Normalize a science-frame array (zscale) and encode as base64 PNG."""
    interval = ZScaleInterval()
    vmin, vmax = interval.get_limits(image)
    clipped = np.clip((image - vmin) / (vmax - vmin + 1e-9), 0, 1)
    # FITS row 0 is the bottom of the sky; PNG row 0 is the top -> flip for display
    img8 = np.flipud((clipped * 255).astype(np.uint8))

    pil_img = Image.fromarray(img8)
    buf = io.BytesIO()
    pil_img.save(buf, format="PNG")
    return base64.b64encode(buf.getvalue()).decode("utf-8")


def png_wcs_dict(wcs, width: int, height: int) -> dict:
    """
    Simple TAN WCS describing the *flipped PNG* sent to the browser (row 0 = top),
    so Aladin can place the cutout on the sky. Fitted from a grid of points so it
    stays valid even when the source WCS has distortion terms.
    """
    xs, ys = np.meshgrid(np.linspace(0, width - 1, 7), np.linspace(0, height - 1, 7))
    xs, ys = xs.ravel(), ys.ravel()
    sky = wcs.pixel_to_world(xs, ys)
    fitted = fit_wcs_from_points((xs, (height - 1) - ys), sky, proj_point="center", projection="TAN")
    header = fitted.to_header()
    return {k: (float(v) if isinstance(v, (int, float)) else str(v)) for k, v in header.items() if k}