"""
Talks to IRSA's real TAP service to find SPHEREx exposures covering a given
sky position, and downloads the FITS files.

Schema (confirmed working, as of the SPHEREx data release):
  TAP endpoint: https://irsa.ipac.caltech.edu/TAP
  spherex.artifact  — one row per downloadable file (column: uri)
  spherex.plane     — one row per observation "plane" (footprint poly,
                       time bounds, energy/band info), joined via planeid

SPHEREx has 6 physical detector arrays (D1–D6), each a linear-variable
filter covering a wavelength range — this is where the mission's "102
bands" comes from (many narrow bands per array, by position on the
detector). For frame-to-frame comparison you want the SAME band each
epoch, so this defaults to a single band (D1) unless told otherwise.
"""

import os
import re

import requests
import pyvo

TAP_URL = "https://irsa.ipac.caltech.edu/TAP"

CACHE_DIR = os.environ.get("SPHEREX_CACHE_DIR", "/tmp/spherex_cache")
os.makedirs(CACHE_DIR, exist_ok=True)

_ADQL_SELECT = """
SELECT
    'https://irsa.ipac.caltech.edu/' || a.uri AS download_url,
    p.obs_publisher_did,
    p.time_bounds_lower,
    p.time_bounds_upper,
    p.energy_bandpassname
FROM spherex.artifact a
JOIN spherex.plane p ON a.planeid = p.planeid
"""

_OBS_ID_PATTERN = re.compile(r"\?([^/]+)")


def find_epochs(ra: float, dec: float, band: str = "D1"):
    """
    Query IRSA for every SPHEREx exposure in `band` whose footprint covers
    (ra, dec). Returns a list of dicts sorted oldest -> newest:
        [{"epoch": <label>, "mjd": float, "download_url": str}, ...]
    """
    spatial = f"CONTAINS(POINT('ICRS', {ra}, {dec}), p.poly) = 1"
    band_filter = f" AND p.energy_bandpassname = 'SPHEREx-{band}'" if band else ""

    query = (
        _ADQL_SELECT
        + f"WHERE {spatial}"
        + band_filter
        + " ORDER BY p.time_bounds_lower"
    )

    service = pyvo.dal.TAPService(TAP_URL)
    try:
        results = service.search(query)
    except Exception:
        # fall back to an async job for slower/larger queries
        job = service.submit_job(query)
        job.run()
        job.wait(phases=["COMPLETED", "ERROR", "ABORTED"], timeout=300)
        if job.phase == "ERROR":
            raise RuntimeError(f"IRSA TAP query failed: {job.error}")
        results = job.fetch_result()

    epochs = []
    for row in results:
        mjd = (row["time_bounds_lower"] + row["time_bounds_upper"]) / 2.0
        epochs.append({
            "epoch": f"MJD {mjd:.2f}",   # convert to a calendar date in the frontend if preferred
            "mjd": float(mjd),
            "download_url": str(row["download_url"]),
        })

    epochs.sort(key=lambda e: e["mjd"])
    return epochs


def download_fits(download_url: str) -> str:
    """Download a FITS file to local cache, return local path."""
    local_name = os.path.join(CACHE_DIR, os.path.basename(download_url))
    if os.path.exists(local_name):
        return local_name

    resp = requests.get(download_url, timeout=60)
    resp.raise_for_status()
    with open(local_name, "wb") as f:
        f.write(resp.content)
    return local_name