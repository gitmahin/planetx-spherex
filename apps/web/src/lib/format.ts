export const formatDeg = (v: number, digits = 4) => `${v.toFixed(digits)}°`;
export const formatRaDec = (ra: number, dec: number) =>
  `RA ${formatDeg(ra)}  Dec ${formatDeg(dec)}`;
