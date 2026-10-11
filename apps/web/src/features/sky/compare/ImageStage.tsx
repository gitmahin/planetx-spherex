import type { ReactNode } from "react";
import type { ChangedPoint } from "../types";
import { ChangeMarkers } from "./ChangeMarkers";

interface Props {
  width: number;
  height: number;
  changed: ChangedPoint[];
  children: ReactNode; // the stacked img layers
}

/** Fixed-aspect box that stacks images and draws change markers on top. */
export function ImageStage({ width, height, changed, children }: Props) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-md border bg-black"
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {children}
      <ChangeMarkers width={width} height={height} points={changed} />
    </div>
  );
}
