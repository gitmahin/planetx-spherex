/**
 * Every direct call into the Aladin Lite drawing API lives here.
 */
import type { AladinInstance, AladinOverlay } from "@/types/aladin";
import { toDataUrl } from "@/lib/image";
import type { ChangedPoint, FrameImage, PathPoint } from "../types";

const CUTOUT_LAYER = "spherex-cutout";
const CHANGED_COLOR = "#ef4444";
const PATH_COLOR = "#f59e0b";

const overlayCache = new WeakMap<AladinInstance, Map<string, AladinOverlay>>();

function getOverlay(
  aladin: AladinInstance,
  key: string,
  color: string
): AladinOverlay {
  let map = overlayCache.get(aladin);
  if (!map) {
    map = new Map();
    overlayCache.set(aladin, map);
  }
  let overlay = map.get(key);
  if (!overlay) {
    overlay = window.A.graphicOverlay({ color, lineWidth: 2, name: key });
    aladin.addOverlay(overlay);
    map.set(key, overlay);
  }
  return overlay;
}

export function focusOn(
  aladin: AladinInstance,
  ra: number,
  dec: number,
  fovDeg: number
) {
  aladin.gotoRaDec(ra, dec);
  aladin.setFoV(fovDeg);
}

export function showCutout(aladin: AladinInstance, frame: FrameImage) {
  const wcs = { NAXIS1: frame.width, NAXIS2: frame.height, ...frame.wcs };
  const image = window.A.image(toDataUrl(frame.image_base64), {
    name: `SPHEREx ${frame.label}`,
    wcs,
  });
  aladin.setOverlayImageLayer(image, CUTOUT_LAYER);
}

export function clearCutout(aladin: AladinInstance) {
  aladin.removeImageLayer?.(CUTOUT_LAYER);
}

export function drawChanged(aladin: AladinInstance, points: ChangedPoint[]) {
  const overlay = getOverlay(aladin, "changed", CHANGED_COLOR);
  overlay.removeAll();
  points.forEach((p) =>
    overlay.add(
      window.A.circle(p.ra, p.dec, 0.004, {
        color: CHANGED_COLOR,
        lineWidth: 2,
      })
    )
  );
}

export function drawPath(aladin: AladinInstance, path: PathPoint[]) {
  const overlay = getOverlay(aladin, "path", PATH_COLOR);
  overlay.removeAll();
  if (path.length > 1) {
    overlay.add(
      window.A.polyline(
        path.map((p) => [p.ra, p.dec] as [number, number]),
        {
          color: PATH_COLOR,
          lineWidth: 2,
        }
      )
    );
  }
  path.forEach((p) =>
    overlay.add(
      window.A.circle(p.ra, p.dec, 0.002, { color: PATH_COLOR, lineWidth: 2 })
    )
  );
}
