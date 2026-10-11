import { useState } from "react";
import { Slider } from "@repo/ui/components/slider";
import { toDataUrl } from "@/lib/image";
import type { ChangedPoint, FrameImage } from "../types";
import { ImageStage } from "./ImageStage";

interface Props {
  a: FrameImage;
  b: FrameImage;
  changed: ChangedPoint[];
}

const imgClass = "absolute inset-0 h-full w-full [image-rendering:pixelated]";

export function CrossfadeCompare({ a, b, changed }: Props) {
  const [mix, setMix] = useState(50);

  return (
    <div className="space-y-3">
      <ImageStage width={a.width} height={a.height} changed={changed}>
        <img
          src={toDataUrl(a.image_base64)}
          alt={a.label}
          className={imgClass}
        />
        <img
          src={toDataUrl(b.image_base64)}
          alt={b.label}
          className={imgClass}
          style={{ opacity: mix / 100 }}
        />
      </ImageStage>
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="w-24 truncate">{a.label}</span>
        <Slider
          value={[mix]}
          onValueChange={(v) => setMix(v[0])}
          min={0}
          max={100}
          step={1}
        />
        <span className="w-24 truncate text-right">{b.label}</span>
      </div>
    </div>
  );
}
