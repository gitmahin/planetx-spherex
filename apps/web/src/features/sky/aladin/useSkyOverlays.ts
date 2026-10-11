import { useEffect, useState } from "react";
import type { AladinInstance } from "@/types/aladin";
import type { ChangedPoint, FrameImage, PathPoint } from "../types";
import {
  clearCutout,
  drawChanged,
  drawPath,
  focusOn,
  showCutout,
} from "./overlays";

interface Input {
  cutout?: FrameImage | null;
  changed?: ChangedPoint[];
  path?: PathPoint[];
  focus?: { ra: number; dec: number; fovDeg: number } | null;
}

/** Keeps Aladin in sync with React state. Returns an error string if drawing fails. */
export function useSkyOverlays(aladin: AladinInstance | null, input: Input) {
  const { cutout, changed, path, focus } = input;
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (aladin && focus) focusOn(aladin, focus.ra, focus.dec, focus.fovDeg);
  }, [aladin, focus?.ra, focus?.dec, focus?.fovDeg]);

  useEffect(() => {
    if (!aladin) return;
    try {
      if (cutout) showCutout(aladin, cutout);
      else clearCutout(aladin);
      setError(null);
    } catch (e) {
      setError(
        `Could not draw SPHEREx image in Aladin: ${(e as Error).message}`
      );
    }
  }, [aladin, cutout]);

  useEffect(() => {
    if (aladin) drawChanged(aladin, changed ?? []);
  }, [aladin, changed]);

  useEffect(() => {
    if (aladin) drawPath(aladin, path ?? []);
  }, [aladin, path]);

  return error;
}
