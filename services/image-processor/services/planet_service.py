import uuid
from dataclasses import dataclass, field

import numpy as np

from libs import spherex_client
from libs import detection


@dataclass
class TrackingSession:
    ra: float
    dec: float
    window_arcmin: float
    epochs: list                       # [{"epoch", "mjd", "download_url"}]
    cursor: int = 0
    path: list = field(default_factory=list)
    prev_xy: np.ndarray | None = None


class PlanetService:
    def __init__(self, repository):
        self.repository = repository
        self.sessions: dict[str, TrackingSession] = {} 

    def start_tracking(self, ra: float, dec: float, window_arcmin: float = 10.0, band: str = "D1"):
        epochs = spherex_client.find_epochs(ra, dec, band=band)
        if not epochs:
            raise ValueError("No SPHEREx exposures found at this position")
        session_id = str(uuid.uuid4())
        self.sessions[session_id] = TrackingSession(ra, dec, window_arcmin, epochs)
        return {"session_id": session_id, "num_epochs": len(epochs)}

    def list_epochs(self, session_id: str):
        s = self._get(session_id)
        return [{"index": i, "epoch": e["epoch"], "mjd": e["mjd"]} for i, e in enumerate(s.epochs)]

    def next_frame(self, session_id: str):
        s = self._get(session_id)
        if s.cursor >= len(s.epochs):
            raise IndexError("No more frames")

        image, wcs, xy, label = self._render(s, s.cursor)
        moving = detection.find_moving_source(s.prev_xy, xy)

        detected = None
        if moving is not None:
            ra_deg, dec_deg = wcs.pixel_to_world_values(moving[0], moving[1])
            detected = {
                "epoch": label,
                "x": float(moving[0]), "y": float(moving[1]),
                "ra": float(ra_deg), "dec": float(dec_deg),
            }
            s.path.append(detected)

        s.prev_xy = xy
        s.cursor += 1
        return {
            "session_id": session_id,
            "image_base64": detection.image_to_png_base64(image),
            "width": image.shape[1],
            "height": image.shape[0],
            "wcs": detection.png_wcs_dict(wcs, image.shape[1], image.shape[0]),
            "detected": detected,
            "path": s.path,
            "has_more": s.cursor < len(s.epochs),
        }

    def get_path(self, session_id: str):
        return self._get(session_id).path

    def compare_epochs(self, session_id: str, index_a: int, index_b: int):
        s = self._get(session_id)
        img_a, wcs_a, xy_a, label_a = self._render(s, index_a)
        img_b, wcs_b, xy_b, label_b = self._render(s, index_b)

        changed = []
        remaining = xy_b.copy()
        while len(remaining) and len(changed) < 5:
            pt = detection.find_moving_source(xy_a, remaining)
            if pt is None:
                break
            ra_deg, dec_deg = wcs_b.pixel_to_world_values(pt[0], pt[1])
            changed.append({"x": float(pt[0]), "y": float(pt[1]),
                            "ra": float(ra_deg), "dec": float(dec_deg)})
            remaining = remaining[~np.all(np.isclose(remaining, pt), axis=1)]

        return {
            "epoch_a": {"label": label_a, "image_base64": detection.image_to_png_base64(img_a),
                        "width": img_a.shape[1], "height": img_a.shape[0],
                        "wcs": detection.png_wcs_dict(wcs_a, img_a.shape[1], img_a.shape[0])},
            "epoch_b": {"label": label_b, "image_base64": detection.image_to_png_base64(img_b),
                        "width": img_b.shape[1], "height": img_b.shape[0],
                        "wcs": detection.png_wcs_dict(wcs_b, img_b.shape[1], img_b.shape[0])},
            "changed_points": changed,
        }

    def _get(self, session_id: str) -> TrackingSession:
        s = self.sessions.get(session_id)
        if s is None:
            raise LookupError("Unknown session")
        return s

    def _render(self, s: TrackingSession, index: int):
        if index < 0 or index >= len(s.epochs):
            raise IndexError("Epoch index out of range")
        e = s.epochs[index]
        path = spherex_client.download_fits(e["download_url"])
        image, wcs = detection.load_and_crop(path, s.ra, s.dec, s.window_arcmin)
        return image, wcs, detection.detect_sources(image), e["epoch"]