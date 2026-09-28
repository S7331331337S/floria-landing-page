/**
 * Hand-painted leaf pieces (public/story/leaves), usable anywhere a vector
 * leaf is: set `img: "heart-01"` on a LeafPlacement instead of `kind`.
 * Regenerate with `npm run leaves` and update this list when adding more.
 */
export const PAINTED = {
  "heart-01": { src: "/story/leaves/heart-01.webp", w: 267, h: 304 },
  "heart-02": { src: "/story/leaves/heart-02.webp", w: 303, h: 330 },
  "heart-03": { src: "/story/leaves/heart-03.webp", w: 254, h: 297 },
  "heart-04": { src: "/story/leaves/heart-04.webp", w: 314, h: 285 },
  "heart-05": { src: "/story/leaves/heart-05.webp", w: 163, h: 217 },
  "heart-06": { src: "/story/leaves/heart-06.webp", w: 142, h: 170 },
  "heart-07": { src: "/story/leaves/heart-07.webp", w: 256, h: 292 },
  "heart-08": { src: "/story/leaves/heart-08.webp", w: 98, h: 159 },
  "heart-09": { src: "/story/leaves/heart-09.webp", w: 108, h: 207 },
  "lance-01": { src: "/story/leaves/lance-01.webp", w: 187, h: 390 },
  "lance-02": { src: "/story/leaves/lance-02.webp", w: 254, h: 109 },
  "lance-03": { src: "/story/leaves/lance-03.webp", w: 179, h: 303 },
  "lance-04": { src: "/story/leaves/lance-04.webp", w: 228, h: 165 },
  "lance-05": { src: "/story/leaves/lance-05.webp", w: 232, h: 434 },
  "lance-06": { src: "/story/leaves/lance-06.webp", w: 149, h: 103 },
  "lance-07": { src: "/story/leaves/lance-07.webp", w: 136, h: 204 },
  "lance-08": { src: "/story/leaves/lance-08.webp", w: 184, h: 136 },
  "lance-09": { src: "/story/leaves/lance-09.webp", w: 123, h: 263 },
  "lance-10": { src: "/story/leaves/lance-10.webp", w: 130, h: 225 },
  "lance-11": { src: "/story/leaves/lance-11.webp", w: 114, h: 199 },
  "lance-12": { src: "/story/leaves/lance-12.webp", w: 95, h: 444 },
  "lance-13": { src: "/story/leaves/lance-13.webp", w: 176, h: 342 },
  "lance-14": { src: "/story/leaves/lance-14.webp", w: 217, h: 319 },
  "lance-15": { src: "/story/leaves/lance-15.webp", w: 108, h: 122 },
  "lance-16": { src: "/story/leaves/lance-16.webp", w: 49, h: 271 },
  "lance-17": { src: "/story/leaves/lance-17.webp", w: 61, h: 407 },
  "lance-18": { src: "/story/leaves/lance-18.webp", w: 183, h: 171 },
  "lance-19": { src: "/story/leaves/lance-19.webp", w: 56, h: 133 },
} as const;

export type PaintedLeaf = keyof typeof PAINTED;
