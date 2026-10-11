export const toDataUrl = (base64Png: string) =>
  `data:image/png;base64,${base64Png}`;

/**
 * Backend centroids use array rows (row 0 = bottom of the sky) but the PNG is
 * flipped for display (row 0 = top), so markers need their y flipped too.
 */
export const toImageY = (y: number, height: number) => height - 1 - y;
