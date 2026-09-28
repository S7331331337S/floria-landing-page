/**
 * Painted leaf pieces: cleans already-transparent leaf cutouts and exports
 * them as WebP layers for the scenes.
 *
 *   npm run leaves
 *
 * Put transparent PNGs in assets-src/leaves/ (heart-01.png, lance-03.png…).
 * Each one comes out in public/story/leaves/ with its white matting fringe
 * removed and empty borders trimmed. The printed list of names and sizes
 * is what to paste into scenes (see `img` in flora/Foliage.tsx).
 */
import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";

const SRC = "assets-src/leaves";
const OUT = "public/story/leaves";
const MAX = 720;

async function clean(file) {
  const { data, info } = await sharp(path.join(SRC, file)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  const a = (x, y) => (x < 0 || y < 0 || x >= W || y >= H ? 0 : data[(y * W + x) * 4 + 3]);

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 4;
      if (!data[i + 3]) continue;
      const r = data[i], g = data[i + 1], b = data[i + 2];
      const min = Math.min(r, g, b);
      const max = Math.max(r, g, b);
      const pale = min > 185 && max - min < 40; // leftover paper white
      const edge = !a(x - 1, y) || !a(x + 1, y) || !a(x, y - 1) || !a(x, y + 1);
      if (pale) data[i + 3] = 0;
      // soften the hard cut edge a touch so leaves sit in the scene
      else if (edge) data[i + 3] = Math.round(data[i + 3] * 0.6);
    }
  }

  const name = path.parse(file).name;
  const out = await sharp(data, { raw: { width: W, height: H, channels: 4 } })
    .trim({ threshold: 1 })
    .resize({ width: MAX, height: MAX, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 88, alphaQuality: 92, effort: 5 })
    .toFile(path.join(OUT, `${name}.webp`));
  console.log(`${name.padEnd(10)} ${out.width}x${out.height}`);
}

await mkdir(OUT, { recursive: true });
const files = (await readdir(SRC)).filter((f) => /\.(png|webp)$/i.test(f)).sort();
for (const f of files) await clean(f);
