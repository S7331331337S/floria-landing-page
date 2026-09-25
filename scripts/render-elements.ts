/**
 * Renders the high-resolution design elements for the story site from the
 * same procedural leaf geometry the live scenes use.
 *
 *   npm run elements
 *
 * Output (public/story/elements):
 *   jungle-wide.webp / jungle-tall.webp   layered rainforest backdrops
 *   plate-*.webp                          hand-coloured herbarium plates
 *
 * Everything is seeded, so re-running gives identical images. Change a
 * seed or a palette below to art-direct a new version.
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { growLeaf, rng, type LeafKind } from "../src/components/story/flora/shapes";

const OUT = "public/story/elements";
await mkdir(OUT, { recursive: true });

const f = (n: number) => Math.round(n * 100) / 100;

/** One leaf as SVG markup, drawn at the origin, base at (0,0), tip up. */
function leafSvg(
  kind: LeafKind,
  seed: number,
  id: string,
  paint: { fill: string; vein?: string; veinOpacity?: number; rib?: string; accent?: string; ink?: string; inkWidth?: number },
) {
  const g = growLeaf(kind, seed);
  const [bx, by, bw, bh] = g.bounds;
  const mask = g.cuts.length
    ? `<mask id="${id}m" maskUnits="userSpaceOnUse" x="${f(bx)}" y="${f(by)}" width="${f(bw)}" height="${f(bh)}">
         <rect x="${f(bx)}" y="${f(by)}" width="${f(bw)}" height="${f(bh)}" fill="#fff"/>
         ${g.cuts
           .map((d) =>
             g.cutStroke ? `<path d="${d}" fill="none" stroke="#000" stroke-width="${g.cutStroke}" stroke-linecap="round"/>` : `<path d="${d}" fill="#000"/>`,
           )
           .join("")}
       </mask>`
    : "";
  const ink = paint.ink
    ? g.blades.map((d) => `<path d="${d}" fill="none" stroke="${paint.ink}" stroke-width="${paint.inkWidth ?? 0.35}" stroke-linejoin="round"/>`).join("")
    : "";
  const body = `
    ${g.blades.map((d) => `<path d="${d}" fill="${paint.fill}"/>`).join("")}
    ${paint.vein ? g.veins.map((d) => `<path d="${d}" fill="none" stroke="${paint.vein}" stroke-opacity="${paint.veinOpacity ?? 0.5}" stroke-width="0.45" stroke-linecap="round"/>`).join("") : ""}
    ${paint.accent ? g.accents.map((d) => `<path d="${d}" fill="none" stroke="${paint.accent}" stroke-width="${kind === "anthurium" ? 4.2 : 0.7}" stroke-linecap="round"/>`).join("") : ""}
    ${paint.rib ? g.ribs.map((d) => `<path d="${d}" fill="none" stroke="${paint.rib}" stroke-width="1.2" stroke-linecap="round"/>`).join("") : ""}
    ${ink}`;
  return {
    defs: mask,
    stem: `<path d="${g.stem}" fill="none" stroke="${paint.ink ?? paint.fill}" stroke-width="${paint.ink ? 1.4 : 2.2}" stroke-linecap="round"/>`,
    body: g.cuts.length ? `<g mask="url(#${id}m)">${body}</g>` : body,
    bounds: g.bounds,
    blades: g.blades,
  };
}

// ───────────────────────────────────────────────────── jungle backdrops

function jungle(W: number, H: number, seed: number) {
  const rand = rng(seed);
  const kinds: LeafKind[] = ["monstera", "banana", "palm", "alocasia", "fern", "calathea", "monstera", "palm"];
  // far → near: hazier, lighter and softer in the distance (aerial perspective)
  const depths = [
    { color: "#3d6242", opacity: 0.5, blur: 14, scale: 0.34, count: 14 },
    { color: "#244a2f", opacity: 0.75, blur: 7, scale: 0.44, count: 12 },
    { color: "#12301f", opacity: 0.92, blur: 2.5, scale: 0.58, count: 9 },
    { color: "#07170e", opacity: 1, blur: 0.5, scale: 0.78, count: 7 },
  ];
  const unit = Math.min(W, H) / 100; // leaf geometry is ~100 units tall
  const cx = W / 2, cy = H * 0.46;
  let defs = "";
  let layers = "";

  depths.forEach((d, di) => {
    let leaves = "";
    for (let i = 0; i < d.count; i++) {
      // anchor on a frame edge, point inward, keep the centre clear for the title
      const edge = Math.floor(rand() * 4);
      const t = rand();
      const [x, y] =
        edge === 0 ? [t * W, -H * 0.05] : edge === 1 ? [W * 1.04, t * H] : edge === 2 ? [t * W, H * 1.05] : [-W * 0.04, t * H];
      const toward = (Math.atan2(cy - y, cx - x) * 180) / Math.PI + 90 + (rand() - 0.5) * 70;
      const s = unit * d.scale * (0.75 + rand() * 0.5) * (edge % 2 ? 1.1 : 1);
      const kind = kinds[Math.floor(rand() * kinds.length)];
      const id = `j${di}_${i}`;
      const leaf = leafSvg(kind, seed * 100 + di * 17 + i, id, { fill: d.color });
      defs += leaf.defs;
      // pull the base back outside the frame so only the outer part of the
      // leaf reaches in: the nearer the layer, the less of it we see
      const reach = s * (kind === "palm" || kind === "fern" || kind === "banana" ? 125 : 105);
      const rad = (toward * Math.PI) / 180;
      const back = reach * (0.3 + di * 0.12);
      const ax = x - Math.sin(rad) * back;
      const ay = y + Math.cos(rad) * back;
      leaves += `<g transform="translate(${f(ax)} ${f(ay)}) rotate(${f(toward)}) scale(${f(s)})">${leaf.stem}${leaf.body}</g>`;
    }
    // filter region pinned to the canvas: leaves hang far off-frame and an
    // unbounded region makes the rasteriser silently drop the whole layer
    defs += `<filter id="b${di}" filterUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}"><feGaussianBlur stdDeviation="${d.blur}"/></filter>`;
    layers += `<g filter="url(#b${di})" opacity="${d.opacity}">${leaves}</g>`;
    // a veil of mist between each depth
    if (di < depths.length - 1)
      layers += `<rect width="${W}" height="${H}" fill="url(#fog)" opacity="${0.35 - di * 0.08}"/>`;
  });

  // floating pollen / bokeh
  let bokeh = "";
  for (let i = 0; i < 70; i++) {
    const r = (0.2 + rand() * 1.2) * unit;
    bokeh += `<circle cx="${f(rand() * W)}" cy="${f(rand() * H)}" r="${f(r)}" fill="${rand() > 0.3 ? "#f3d88f" : "#e9f3d9"}" opacity="${f(0.05 + rand() * 0.22)}"/>`;
  }

  const ray = (x0: number, w: number, o: number) =>
    `<polygon points="${f(x0)},${-H * 0.1} ${f(x0 + w)},${-H * 0.1} ${f(x0 + w + W * 0.35)},${H * 1.1} ${f(x0 + W * 0.28)},${H * 1.1}" fill="url(#ray)" opacity="${o}"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#16301f"/><stop offset="0.55" stop-color="#0b1d13"/><stop offset="1" stop-color="#040b07"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.44" r="0.55">
      <stop offset="0" stop-color="#6f8f55" stop-opacity="0.55"/><stop offset="0.45" stop-color="#2f4d2f" stop-opacity="0.35"/><stop offset="1" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="fog" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#cfe0c4" stop-opacity="0"/><stop offset="0.55" stop-color="#cfe0c4" stop-opacity="0.18"/><stop offset="1" stop-color="#cfe0c4" stop-opacity="0.05"/>
    </linearGradient>
    <linearGradient id="ray" x1="0" y1="0" x2="0.3" y2="1">
      <stop offset="0" stop-color="#f3d88f" stop-opacity="0.55"/><stop offset="1" stop-color="#f3d88f" stop-opacity="0"/>
    </linearGradient>
    <filter id="soft" filterUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}"><feGaussianBlur stdDeviation="${unit * 1.6}"/></filter>
    <filter id="bokehBlur"><feGaussianBlur stdDeviation="${unit * 0.35}"/></filter>
    <radialGradient id="vig" cx="0.5" cy="0.47" r="0.72">
      <stop offset="0.55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#020604" stop-opacity="0.85"/>
    </radialGradient>
    ${defs}
  </defs>
  <rect width="${W}" height="${H}" fill="url(#sky)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <g filter="url(#soft)" style="mix-blend-mode:screen">${ray(W * 0.18, W * 0.05, 0.35)}${ray(W * 0.34, W * 0.03, 0.22)}${ray(W * 0.52, W * 0.06, 0.16)}</g>
  ${layers}
  <g filter="url(#bokehBlur)">${bokeh}</g>
  <rect width="${W}" height="${H}" fill="url(#vig)"/>
</svg>`;
}

// ────────────────────────────────────────────────────── herbarium plates

type Plate = { name: string; kind: LeafKind; seed: number; wash: [string, string]; companion: LeafKind; accent?: string };

const PLATES: Plate[] = [
  { name: "anthurium", kind: "anthurium", seed: 4, wash: ["#b8475a", "#e3a1a6"], companion: "fern", accent: "#e8cf8a" },
  { name: "alocasia", kind: "alocasia", seed: 7, wash: ["#29432f", "#6f8c62"], companion: "calathea" },
  { name: "monstera", kind: "monstera", seed: 3, wash: ["#2f5433", "#86a26a"], companion: "palm" },
  { name: "calathea", kind: "calathea", seed: 9, wash: ["#2c4632", "#7a9468"], companion: "fern", accent: "#d98e9f" },
  { name: "banana", kind: "banana", seed: 5, wash: ["#4d6b35", "#b3c27f"], companion: "anthurium" },
  { name: "fern", kind: "fern", seed: 11, wash: ["#48653a", "#a9bd7c"], companion: "alocasia" },
];

function plate(p: Plate) {
  const W = 1800, H = 2400;
  const INK = "#2d2a21";
  const id = `p_${p.name}`;
  const hero = leafSvg(p.kind, p.seed, id, {
    fill: `url(#${id}wash)`,
    vein: p.kind === "alocasia" ? "#e9ecd6" : INK,
    veinOpacity: p.kind === "alocasia" ? 0.95 : 0.55,
    rib: p.kind === "alocasia" ? "#e9ecd6" : INK,
    accent: p.accent,
    ink: INK,
    inkWidth: 0.32,
  });
  const comp = leafSvg(p.companion, p.seed + 20, id + "c", {
    fill: "#8f9c78",
    vein: INK,
    veinOpacity: 0.35,
    ink: INK,
    inkWidth: 0.4,
  });
  const [bx, by, bw, bh] = hero.bounds;
  const scale = Math.min((W * 0.62) / bw, (H * 0.66) / bh);
  const hx = W / 2 - (bx + bw / 2) * scale;
  const hy = H * 0.47 - (by + bh / 2) * scale;
  // engraved cross-hatching on the shadow side, clipped to the blade
  const clip = `<clipPath id="${id}clip">${hero.blades.map((d) => `<path d="${d}"/>`).join("")}</clipPath>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <filter id="paper" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" seed="${p.seed}"/>
      <feColorMatrix values="0 0 0 0 0.42  0 0 0 0 0.35  0 0 0 0 0.24  0 0 0 -1.1 0.62"/>
    </filter>
    <filter id="foxing" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.0035" numOctaves="4" seed="${p.seed + 3}"/>
      <feColorMatrix values="0 0 0 0 0.55  0 0 0 0 0.40  0 0 0 0 0.22  1.8 0 0 0 -1.05"/>
    </filter>
    <filter id="${id}wc" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" seed="${p.seed}" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="${f(5 / scale * 10)}" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <linearGradient id="${id}wash" gradientUnits="userSpaceOnUse" x1="${f(bx)}" y1="${f(by + bh)}" x2="${f(bx + bw)}" y2="${f(by)}">
      <stop offset="0" stop-color="${p.wash[0]}"/><stop offset="1" stop-color="${p.wash[1]}"/>
    </linearGradient>
    <pattern id="${id}hatch" patternUnits="userSpaceOnUse" width="1.1" height="1.1" patternTransform="rotate(38)">
      <line x1="0" y1="0" x2="0" y2="1.1" stroke="${INK}" stroke-width="0.14" stroke-opacity="0.55"/>
    </pattern>
    <radialGradient id="vig" cx="0.5" cy="0.5" r="0.75">
      <stop offset="0.6" stop-color="#6b5534" stop-opacity="0"/><stop offset="1" stop-color="#6b5534" stop-opacity="0.28"/>
    </radialGradient>
    ${clip}${hero.defs}${comp.defs}
  </defs>
  <rect width="${W}" height="${H}" fill="#efe5cf"/>
  <rect width="${W}" height="${H}" filter="url(#foxing)" opacity="0.5"/>
  <rect width="${W}" height="${H}" filter="url(#paper)"/>
  <rect width="${W}" height="${H}" fill="url(#vig)"/>

  <rect x="110" y="110" width="${W - 220}" height="${H - 220}" fill="none" stroke="${INK}" stroke-width="3" opacity="0.8"/>
  <rect x="132" y="132" width="${W - 264}" height="${H - 264}" fill="none" stroke="${INK}" stroke-width="1" opacity="0.6"/>

  <!-- companion sprig, tucked behind -->
  <g transform="translate(${W * 0.72} ${H * 0.86}) rotate(-28) scale(${f(scale * 0.42)})" opacity="0.75">${comp.stem}${comp.body}</g>

  <!-- the specimen -->
  <g transform="translate(${f(hx)} ${f(hy)}) scale(${f(scale)})">
    <g filter="url(#${id}wc)" opacity="0.93">${hero.stem}${hero.body}</g>
    <g clip-path="url(#${id}clip)"><rect x="${f(bx)}" y="${f(by)}" width="${f(bw * 0.42)}" height="${f(bh)}" fill="url(#${id}hatch)"/></g>
  </g>

  <!-- detail roundel, like a botanist's magnified study -->
  <g transform="translate(${W * 0.2} ${H * 0.82})">
    <circle r="150" fill="#efe5cf" stroke="${INK}" stroke-width="2"/>
    <g transform="rotate(-20) scale(${f(scale * 0.2)}) translate(0 45)">${hero.body}</g>
  </g>
  <line x1="${W / 2 - 180}" y1="${H - 250}" x2="${W / 2 + 180}" y2="${H - 250}" stroke="${INK}" stroke-width="1.5" opacity="0.6"/>
</svg>`;
}

// ──────────────────────────────────────────────────────────────── render

const render = async (svg: string, file: string, quality = 82) => {
  if (process.env.DUMP) (await import("node:fs")).writeFileSync(`${process.env.DUMP}/${file}.svg`, svg);
  await sharp(Buffer.from(svg), { limitInputPixels: false }).webp({ quality, effort: 5 }).toFile(`${OUT}/${file}`);
  console.log("element", `${OUT}/${file}`);
};

await render(jungle(3200, 1800, 21), "jungle-wide.webp", 80);
await render(jungle(1200, 2133, 34), "jungle-tall.webp", 80);
if (!process.env.DUMP) for (const p of PLATES) await render(plate(p), `plate-${p.name}.webp`, 84);
