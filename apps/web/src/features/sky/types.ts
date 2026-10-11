export interface SkyCoord {
  ra: number;
  dec: number;
}

export type WcsDict = Record<string, number | string>;

export interface Epoch {
  index: number;
  epoch: string;
  mjd: number;
}

export interface SessionInfo {
  session_id: string;
  num_epochs: number;
}

export interface CreateSessionInput extends SkyCoord {
  window_arcmin?: number;
  band?: string;
}

export interface PathPoint {
  epoch: string;
  x: number;
  y: number;
  ra: number;
  dec: number;
}

export interface ChangedPoint {
  x: number;
  y: number;
  ra: number;
  dec: number;
}

/** One cropped SPHEREx epoch: PNG + the WCS that places it on the sky. */
export interface FrameImage {
  label: string;
  image_base64: string;
  width: number;
  height: number;
  wcs: WcsDict;
}

export interface CompareResult {
  epoch_a: FrameImage;
  epoch_b: FrameImage;
  changed_points: ChangedPoint[];
}

export interface TrackFrame {
  session_id: string;
  image_base64: string;
  width: number;
  height: number;
  wcs: WcsDict;
  detected: PathPoint | null;
  path: PathPoint[];
  has_more: boolean;
}

export type EpochSlot = "A" | "B";
