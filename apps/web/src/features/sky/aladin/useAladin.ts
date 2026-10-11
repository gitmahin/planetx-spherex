import { useEffect, useRef, useState } from "react";
import type { AladinInstance } from "@/types/aladin";
import { BASE_SURVEY } from "@/lib/config";
import type { SkyCoord } from "../types";
import { loadAladin } from "./loadAladin";

const CLICK_TOLERANCE_PX = 5;
const normalizeRa = (ra: number) => ((ra % 360) + 360) % 360;

interface Options {
  onPick?: (coord: SkyCoord) => void;
}

/** Creates the Aladin instance and turns clicks (not drag) into sky picks. */
export function useAladin({ onPick }: Options) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [aladin, setAladin] = useState<AladinInstance | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onPickRef = useRef(onPick);
  onPickRef.current = onPick;

  useEffect(() => {
    let disposed = false;
    let detach = () => {};

    loadAladin()
      .then(() => {
        const el = containerRef.current;
        if (disposed || !el) return;
        el.innerHTML = ""; // StrictMode double-mount safety

        const instance = window.A.aladin(el, {
          survey: BASE_SURVEY,
          fov: 60,
          projection: "AIT",
          cooFrame: "equatorial",
          showReticle: false,
        });

        let down: { x: number; y: number } | null = null;
        const onDown = (e: PointerEvent) => {
          down = { x: e.clientX, y: e.clientY };
        };
        const onUp = (e: PointerEvent) => {
          if (!down) return;
          const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y);
          down = null;
          if (moved > CLICK_TOLERANCE_PX) return; // it was a drag/pan
          const rect = el.getBoundingClientRect();
          const world = instance.pix2world(
            e.clientX - rect.left,
            e.clientY - rect.top
          );
          if (world)
            onPickRef.current?.({ ra: normalizeRa(world[0]), dec: world[1] });
        };

        el.addEventListener("pointerdown", onDown);
        el.addEventListener("pointerup", onUp);
        detach = () => {
          el.removeEventListener("pointerdown", onDown);
          el.removeEventListener("pointerup", onUp);
        };
        setAladin(instance);
      })
      .catch((e: Error) => !disposed && setError(e.message));

    return () => {
      disposed = true;
      detach();
    };
  }, []);

  return { containerRef, aladin, error };
}
