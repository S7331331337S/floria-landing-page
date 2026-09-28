/**
 * Botanical cutouts: turns illustrations on a white background into
 * transparent WebP layers the story can float over any scene.
 *
 *   npm run cutouts
 *
 * Drop images (jpg/png/webp, white or near-white background) into
 * assets-src/botanicals/ and they come out in public/story/botanicals/
 * with the same name. The background is found by flooding in from the
 * edges, so pale petals and cream spathes inside the plant are kept, and
 * the grey paper shadow underneath is dropped.
 */
import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";

const SRC = "assets-src/botanicals";
const OUT = "public/story/botanicals";
const MAX = 1600;

// how "plant-like" a pixel is: distance from white, discounted when it's
// colourless (paper, shadow) so grey shadows count as background
function plantness(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const fromWhite = 255 - min;
  const sat = max === 0 ? 0 : (max - min) / max;
  return fromWhite - (1 - Math.min(sat * 5, 1)) * 85;
}

const FLOOD = 30; // below this, connected-to-edge pixels are background
const SOLID = 44; // at or above this, fully opaque
const POCKET = 10; // enclosed pure-white gaps between leaves
const POCKET_MIN_AREA = 350;

async function cutout(file) {
  const { data, info } = await sharp(path.join(SRC, file)).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  const N = W * H;
  const m = new Float32Array(N);
  for (let i = 0; i < N; i++) m[i] = plantness(data[i * 3], data[i * 3 + 1], data[i * 3 + 2]);

  // 1. flood the background in from every edge pixel
  const bg = new Uint8Array(N);
  const stack = [];
  const push = (i) => {
    if (!bg[i] && m[i] < FLOOD) {
      bg[i] = 1;
      stack.push(i);
    }
  };
  for (let x = 0; x < W; x++) { push(x); push((H - 1) * W + x); }
  for (let y = 0; y < H; y++) { push(y * W); push(y * W + W - 1); }
  while (stack.length) {
    const i = stack.pop();
    const x = i % W;
    if (x > 0) push(i - 1);
    if (x < W - 1) push(i + 1);
    if (i >= W) push(i - W);
    if (i < N - W) push(i + W);
  }

  // 2. clear enclosed white pockets between leaves (but not tiny highlights)
  const seen = new Uint8Array(N);
  for (let s = 0; s < N; s++) {
    if (bg[s] || seen[s] || m[s] >= POCKET) continue;
    const comp = [s];
    seen[s] = 1;
    for (let k = 0; k < comp.length; k++) {
      const i = comp[k];
      const x = i % W;
      for (const j of [x > 0 ? i - 1 : -1, x < W - 1 ? i + 1 : -1, i - W, i + W]) {
        if (j >= 0 && j < N && !seen[j] && !bg[j] && m[j] < FLOOD) {
          seen[j] = 1;
          comp.push(j);
        }
      }
    }
    if (comp.length >= POCKET_MIN_AREA) for (const i of comp) bg[i] = 1;
  }

  // 3. alpha: soft ramp only where background meets plant; then remove the
  //    white fringe by un-mixing the paper colour out of edge pixels
  const out = Buffer.alloc(N * 4);
  for (let i = 0; i < N; i++) {
    let a = 1;
    if (bg[i]) a = 0;
    else {
      // an edge pixel touches background: ramp by plantness
      const x = i % W;
      const nearBg = (x > 0 && bg[i - 1]) || (x < W - 1 && bg[i + 1]) || (i >= W && bg[i - W]) || (i < N - W && bg[i + W]);
      if (nearBg) a = Math.min(1, Math.max(0, (m[i] - FLOOD * 0.5) / (SOLID - FLOOD * 0.5)));
    }
    for (let c = 0; c < 3; c++) {
      const v = data[i * 3 + c];
      out[i * 4 + c] = a > 0 && a < 1 ? Math.max(0, Math.min(255, Math.round((v - (1 - a) * 255) / a))) : v;
    }
    out[i * 4 + 3] = Math.round(a * 255);
  }

  const name = path.parse(file).name;
  await sharp(out, { raw: { width: W, height: H, channels: 4 } })
    .trim({ threshold: 1 })
    .resize({ width: MAX, height: MAX, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 88, alphaQuality: 90, effort: 5 })
    .toFile(path.join(OUT, `${name}.webp`));
  console.log("cutout ", `${OUT}/${name}.webp`);
}

await mkdir(OUT, { recursive: true });
let files = [];
try {
  files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
} catch {
  console.log(`(no ${SRC}/ folder)`);
}
for (const f of files) await cutout(f);
