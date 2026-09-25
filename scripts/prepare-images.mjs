/**
 * Image pipeline for the La Casa Del Amor story site.
 *
 *   npm run images
 *
 * 1. Every photo dropped into `assets-src/` is resized (max 2400px) and
 *    converted to WebP in `public/story/`. Keep the same file name to swap
 *    a photo in place, e.g. replace `assets-src/interior.jpg` and re-run.
 * 2. Generates the organic textures (moss, mist, bark light) used as
 *    layered backdrops. They are procedural, so they are crisp at any size.
 */
import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";

const SRC = "assets-src";
const OUT = "public/story";
const MAX = 2400;

await mkdir(OUT, { recursive: true });

// ---------------------------------------------------------------- photos
let files = [];
try {
  files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f));
} catch {
  console.log(`(no ${SRC}/ folder, skipping photos)`);
}

for (const file of files) {
  const name = path.parse(file).name;
  await sharp(path.join(SRC, file))
    .rotate()
    .resize({ width: MAX, height: MAX, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 80, effort: 5 })
    .toFile(path.join(OUT, `${name}.webp`));
  console.log("photo  ", `${OUT}/${name}.webp`);
}

// -------------------------------------------------------------- textures
const textures = {
  // Deep, cushiony moss: two turbulence octaves tinted into greens.
  moss: `
    <svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1600">
      <filter id="m" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="3" seed="7" result="clumps"/>
        <feTurbulence type="fractalNoise" baseFrequency="0.22" numOctaves="3" seed="3" result="fine"/>
        <feComposite in="clumps" in2="fine" operator="arithmetic" k1="1.1" k2="0.25" k3="0.25" k4="-0.05" result="n"/>
        <feComponentTransfer in="n" result="c">
          <feFuncR type="gamma" amplitude="0.30" exponent="2.2" offset="0.01"/>
          <feFuncG type="gamma" amplitude="0.75" exponent="1.9" offset="0.04"/>
          <feFuncB type="gamma" amplitude="0.22" exponent="2.2" offset="0.02"/>
          <feFuncA type="linear" slope="0" intercept="1"/>
        </feComponentTransfer>
      </filter>
      <rect width="100%" height="100%" filter="url(#m)"/>
    </svg>`,
  // Soft drifting fog, white on transparent — used with mix-blend screen.
  mist: `
    <svg xmlns="http://www.w3.org/2000/svg" width="2000" height="1000">
      <filter id="f" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.0022 0.006" numOctaves="4" seed="12"/>
        <feColorMatrix type="matrix" values="
          0 0 0 0 1
          0 0 0 0 1
          0 0 0 0 0.96
          1.4 0 0 0 -0.55"/>
      </filter>
      <rect width="100%" height="100%" filter="url(#f)"/>
    </svg>`,
  // Warm paper for the daylight chapters.
  paper: `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200">
      <filter id="p" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" seed="4"/>
        <feColorMatrix type="matrix" values="
          0 0 0 0 0.96
          0 0 0 0 0.94
          0 0 0 0 0.89
          0 0 0 -0.9 1"/>
      </filter>
      <rect width="100%" height="100%" fill="#f4efe3"/>
      <rect width="100%" height="100%" filter="url(#p)" opacity="0.55"/>
    </svg>`,
};

for (const [name, svg] of Object.entries(textures)) {
  await sharp(Buffer.from(svg)).webp({ quality: 78 }).toFile(path.join(OUT, `${name}.webp`));
  console.log("texture", `${OUT}/${name}.webp`);
}
