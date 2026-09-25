/**
 * The motion dials for the whole story. Tweak here to change the feel
 * everywhere at once.
 */
export const EASE = {
  /** long, luxurious settle: titles, big reveals */
  cinematic: "expo.out",
  /** calm default for text in/out */
  soft: "power3.out",
  /** linear-ish for scroll-scrubbed timelines */
  scrub: "none",
  /** breathing, looping motions */
  drift: "sine.inOut",
} as const;

export const DURATION = {
  text: 1.1,
  intro: 2.4,
} as const;

/** Smoothing applied to scroll-scrubbed timelines (seconds of catch-up). */
export const SCRUB = 1.2;

/** Shared breakpoints for gsap.matchMedia. */
export const MEDIA = {
  desktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
  mobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
  reduce: "(prefers-reduced-motion: reduce)",
} as const;
