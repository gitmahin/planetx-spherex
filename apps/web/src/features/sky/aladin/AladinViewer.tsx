import type { ChangedPoint, FrameImage, PathPoint, SkyCoord } from "../types";
import { ErrorAlert } from "../components/ErrorAlert";
import { useAladin } from "./useAladin";
import { useSkyOverlays } from "./useSkyOverlays";

interface Props {
  onPick: (coord: SkyCoord) => void;
  cutout?: FrameImage | null;
  changed?: ChangedPoint[];
  path?: PathPoint[];
  focus?: { ra: number; dec: number; fovDeg: number } | null;
}

export function AladinViewer({ onPick, cutout, changed, path, focus }: Props) {
  const { containerRef, aladin, error } = useAladin({ onPick });
  const overlayError = useSkyOverlays(aladin, { cutout, changed, path, focus });

  return (
    <div className="space-y-2">
      <div
        ref={containerRef}
        className="h-[520px] w-full overflow-hidden rounded-md border"
      />
      {(error || overlayError) && (
        <ErrorAlert message={(error || overlayError)!} />
      )}
    </div>
  );
}
