export interface AladinOverlay {
  add(shape: unknown): void;
  removeAll(): void;
}

export interface AladinInstance {
  pix2world(x: number, y: number): [number, number] | null;
  gotoRaDec(ra: number, dec: number): void;
  setFoV(deg: number): void;
  addOverlay(overlay: AladinOverlay): void;
  setOverlayImageLayer(image: unknown, layerName?: string): void;
  removeImageLayer?(layerName: string): void;
}

export interface AladinStatic {
  init: Promise<void>;
  aladin(el: HTMLElement, options: Record<string, unknown>): AladinInstance;
  graphicOverlay(options: Record<string, unknown>): AladinOverlay;
  circle(
    ra: number,
    dec: number,
    radiusDeg: number,
    options?: Record<string, unknown>
  ): unknown;
  polyline(
    points: [number, number][],
    options?: Record<string, unknown>
  ): unknown;
  image(url: string, options?: Record<string, unknown>): unknown;
}

declare global {
  interface Window {
    A: AladinStatic;
  }
}
