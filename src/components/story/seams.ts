import type { LeafPlacement } from "./flora/Foliage";

/*
 * Leaves that sweep past the camera at the seams between chapters.
 * speed > 0 means they rush past faster than the page; bigger = closer.
 */

// jungle → moss (after the discovery)
export const SEAM_MOSS: LeafPlacement[] = [
  { kind: "monstera", x: -12, y: 10, w: 38, wm: 70, r: -30, speed: 1.4, shade: 0.15, dew: 6 },
  { kind: "banana", x: 70, y: -10, w: 24, wm: 44, r: 38, speed: 2, shade: 0.1, blur: 3 },
  { kind: "fern", x: 40, y: 35, w: 22, r: -8, speed: 1.1, shade: 0.35, mobile: false },
];

// moss → daylight (into living sculptures)
export const SEAM_DAYLIGHT: LeafPlacement[] = [
  { kind: "palm", x: -10, y: 0, w: 44, wm: 80, r: -60, speed: 1.6, shade: 0.1 },
  { kind: "alocasia", x: 72, y: 20, w: 28, wm: 50, r: 30, speed: 2.2, dew: 5 },
  { kind: "calathea", x: 44, y: 40, w: 16, r: 14, speed: 1.2, mobile: false },
];

// daylight → dusk (into the moments)
export const SEAM_DUSK: LeafPlacement[] = [
  { kind: "anthurium", x: -6, y: 20, w: 26, wm: 46, r: -24, speed: 1.8, dew: 4 },
  { kind: "monstera", x: 68, y: 0, w: 36, wm: 64, r: 40, speed: 1.3, shade: 0.25, blur: 2 },
];

// garden → invitation
export const SEAM_NIGHT: LeafPlacement[] = [
  { kind: "banana", x: 4, y: 0, w: 22, wm: 40, r: -35, speed: 1.7, shade: 0.2 },
  { kind: "fern", x: 70, y: 20, w: 26, wm: 46, r: 30, speed: 1.3, shade: 0.3 },
];
