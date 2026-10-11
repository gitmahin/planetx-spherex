import { useEffect, useState } from "react";
import { Button } from "@repo/ui/components/button";
import { toDataUrl } from "@/lib/image";
import type { ChangedPoint, FrameImage } from "../types";
import { ImageStage } from "./ImageStage";

interface Props {
  a: FrameImage;
  b: FrameImage;
  changed: ChangedPoint[];
  intervalMs?: number;
}

export function BlinkCompare({ a, b, changed, intervalMs = 600 }: Props) {
  const [showB, setShowB] = useState(false);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setShowB((v) => !v), intervalMs);
    return () => clearInterval(id);
  }, [playing, intervalMs]);

  const current = showB ? b : a;

  return (
    <div className="space-y-3">
      <ImageStage width={a.width} height={a.height} changed={changed}>
        <img
          src={toDataUrl(current.image_base64)}
          alt={current.label}
          className="absolute inset-0 h-full w-full [image-rendering:pixelated]"
        />
      </ImageStage>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Showing: {current.label}</span>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setPlaying((p) => !p)}
        >
          {playing ? "Pause" : "Play"}
        </Button>
      </div>
    </div>
  );
}
