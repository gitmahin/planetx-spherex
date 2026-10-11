import { toImageY } from "@/lib/image";
import type { ChangedPoint } from "../types";

interface Props {
  width: number;
  height: number;
  points: ChangedPoint[];
}

export function ChangeMarkers({ width, height, points }: Props) {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      {points.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={toImageY(p.y, height)}
          r={Math.max(width, height) * 0.03}
          fill="none"
          stroke="#ef4444"
          strokeWidth={Math.max(width, height) * 0.008}
        />
      ))}
    </svg>
  );
}
