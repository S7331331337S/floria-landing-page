/**
 * Procedural leaf geometry.
 *
 * Every leaf is grown along a "spine" (the midrib) with a width profile.
 * The output is plain SVG path data, so leaves are razor sharp at any size,
 * weigh almost nothing, and can be recoloured from props.
 *
 * Coordinates: the leaf base sits at (0, 0) and the tip grows toward -y.
 */

export type Pt = [number, number];

export type LeafKind =
  | "monstera"
  | "alocasia"
  | "anthurium"
  | "banana"
  | "calathea"
  | "palm"
  | "fern";

/** Deterministic PRNG so server and client render identical leaves. */
export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const r1 = (n: number) => Math.round(n * 10) / 10;

/** Catmull-Rom spline through points, emitted as cubic Béziers. */
export function smooth(pts: Pt[], closed = false): string {
  if (pts.length < 2) return "";
  const n = pts.length;
  const p = (i: number) => (closed ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))]);
  let d = `M${r1(pts[0][0])} ${r1(pts[0][1])}`;
  const segs = closed ? n : n - 1;
  for (let i = 0; i < segs; i++) {
    const p0 = p(i - 1), p1 = p(i), p2 = p(i + 1), p3 = p(i + 2);
    d += `C${r1(p1[0] + (p2[0] - p0[0]) / 6)} ${r1(p1[1] + (p2[1] - p0[1]) / 6)} ${r1(
      p2[0] - (p3[0] - p1[0]) / 6,
    )} ${r1(p2[1] - (p3[1] - p1[1]) / 6)} ${r1(p2[0])} ${r1(p2[1])}`;
  }
  return closed ? d + "Z" : d;
}

export const poly = (pts: Pt[]) =>
  pts.map((p, i) => `${i ? "L" : "M"}${r1(p[0])} ${r1(p[1])}`).join("") + "Z";

// ------------------------------------------------------------------ spine

type Spine = {
  at: (t: number) => Pt;
  normal: (t: number) => Pt;
  length: number;
};

/** A gently curved spine starting at `origin`, heading along `dir`. */
function spine(origin: Pt, dir: Pt, length: number, bend: number): Spine {
  const dl = Math.hypot(dir[0], dir[1]);
  const d: Pt = [dir[0] / dl, dir[1] / dl];
  const perp: Pt = [-d[1], d[0]]; // right-hand side when growing "up"
  return {
    length,
    at: (t) => [
      origin[0] + d[0] * length * t + perp[0] * bend * length * t * t,
      origin[1] + d[1] * length * t + perp[1] * bend * length * t * t,
    ],
    normal: (t) => {
      const tx = d[0] * length + perp[0] * 2 * bend * length * t;
      const ty = d[1] * length + perp[1] * 2 * bend * length * t;
      const l = Math.hypot(tx, ty);
      return [-ty / l, tx / l];
    },
  };
}

const along = (s: Spine, t: number, off: number): Pt => {
  const c = s.at(t);
  const n = s.normal(t);
  return [c[0] + n[0] * off, c[1] + n[1] * off];
};

type Profile = (t: number) => number;

/**
 * Outline of a blade. With `heart > 0` the blade grows lobes below the
 * petiole and closes on a notch, like an alocasia or anthurium.
 */
function blade(s: Spine, w: Profile, opts: { heart?: number; asym?: number; samples?: number } = {}) {
  const { heart = 0, asym = 0, samples = 44 } = opts;
  const w0 = w(0);
  const width = (t: number) => {
    if (t >= 0) return w(t);
    // rounded lobe below the attachment point
    const u = t / -heart;
    return s.length * 0.012 + (w0 - s.length * 0.012) * Math.sqrt(Math.max(0, 1 - u * u));
  };
  const t0 = heart > 0 ? -heart : 0;
  const right: Pt[] = [];
  const left: Pt[] = [];
  for (let i = 0; i <= samples; i++) {
    // cosine spacing packs more samples near the base and tip
    const t = t0 + ((1 - t0) * (1 - Math.cos((Math.PI * i) / samples))) / 2;
    const ww = width(t);
    right.push(along(s, t, ww));
    left.push(along(s, t, -ww * (1 + asym)));
  }
  left.reverse();
  const outline: Pt[] = [...right, ...left.slice(1)];
  if (heart > 0) outline.push(s.at(heart * 0.04)); // the notch
  else outline.pop();
  return { outline, width };
}

// -------------------------------------------------------------- the leaves

export type LeafGeometry = {
  /** filled shapes making up the leaf (a palm is many leaflets) */
  blades: string[];
  /** thin strokes drawn on top: veins, pinstripes */
  veins: string[];
  /** thicker central rib(s) */
  ribs: string[];
  /** areas cut out of the leaf (slits, holes, tears) */
  cuts: string[];
  /** stroke width for cuts (0 = filled cut shapes) */
  cutStroke: number;
  /** decoration shapes painted with the accent colour */
  accents: string[];
  /** stem from off-canvas to the leaf base */
  stem: string;
  /** candidate points for dew drops */
  dew: Pt[];
  /** tip position, used to orient gradients */
  tip: Pt;
  bounds: [number, number, number, number];
};

function bounds(pts: Pt[]): [number, number, number, number] {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const [x, y] of pts) {
    if (x < x0) x0 = x;
    if (y < y0) y0 = y;
    if (x > x1) x1 = x;
    if (y > y1) y1 = y;
  }
  const pad = 3;
  return [x0 - pad, y0 - pad, x1 - x0 + pad * 2, y1 - y0 + pad * 2];
}

function dewPoints(s: Spine, width: (t: number) => number, rand: () => number, count: number): Pt[] {
  const out: Pt[] = [];
  for (let i = 0; i < count; i++) {
    const t = 0.15 + rand() * 0.65;
    const side = rand() * 1.5 - 0.75;
    out.push(along(s, t, width(t) * side));
  }
  return out;
}

const L = 100;

export function growLeaf(kind: LeafKind, seed = 1, bend = 0.12, stemLength = 0.3): LeafGeometry {
  const rand = rng(seed * 9973 + kind.length);
  const jitter = (a: number) => (rand() - 0.5) * a;
  const s = spine([0, 0], [0, -1], L, bend + jitter(0.06));
  const g: LeafGeometry = {
    blades: [], veins: [], ribs: [], cuts: [], cutStroke: 0, accents: [], stem: "", dew: [], tip: s.at(1), bounds: [0, 0, 0, 0],
  };
  const all: Pt[] = [];
  const stemEnd: Pt = [jitter(4), L * stemLength];
  g.stem = smooth([stemEnd, [stemEnd[0] * 0.4, stemEnd[1] * 0.5], [0, 0]]);
  all.push(stemEnd);

  const lateral = (t: number, side: 1 | -1, reach: number, width: Profile, rise = 0.07) => {
    const pts: Pt[] = [];
    for (let k = 0; k <= 6; k++) {
      const u = k / 6;
      const tt = t + rise * Math.sin((u * Math.PI) / 2);
      pts.push(along(s, tt, side * width(tt) * reach * u));
    }
    return smooth(pts);
  };

  switch (kind) {
    case "monstera": {
      const W = 46;
      const prof: Profile = (t) => W * Math.pow(Math.sin((Math.PI * (t + 0.32)) / 1.32), 0.85);
      const { outline, width } = blade(s, prof, { heart: 0.16, asym: jitter(0.12) });
      g.blades.push(smooth(outline, true));
      all.push(...outline);
      g.ribs.push(smooth([0, 0.3, 0.6, 0.9, 0.99].map((t) => s.at(t))));
      const slits = 6 + Math.floor(rand() * 2);
      for (const side of [1, -1] as const) {
        for (let k = 0; k < slits; k++) {
          const t = 0.1 + (k / slits) * 0.8 + jitter(0.03);
          const inner = 0.3 + rand() * 0.18;
          const a = along(s, t - 0.02, side * width(t) * inner);
          const b = along(s, t + 0.07, side * width(t + 0.07) * 1.25);
          const nA = s.normal(t);
          const wA = 0.6, wB = 2.4 + rand() * 1.8;
          g.cuts.push(
            poly([
              [a[0] - nA[1] * wA, a[1] + nA[0] * wA],
              [b[0] - nA[1] * wB, b[1] + nA[0] * wB],
              [b[0] + nA[1] * wB, b[1] - nA[0] * wB],
              [a[0] + nA[1] * wA, a[1] - nA[0] * wA],
            ]),
          );
          if (k > 0 && k < slits - 1 && rand() > 0.35) {
            const h = along(s, t - 0.045, side * width(t) * (0.2 + rand() * 0.08));
            g.cuts.push(
              `M${r1(h[0])} ${r1(h[1] - 2.6)}a1.5 2.6 0 1 0 0.01 0Z`,
            );
          }
          g.veins.push(lateral(t + 0.035, side, 0.95, width, 0.06));
        }
      }
      g.dew = dewPoints(s, width, rand, 10);
      break;
    }
    case "alocasia":
    case "anthurium": {
      const alo = kind === "alocasia";
      const W = alo ? 34 : 40;
      const prof: Profile = alo
        ? (t) => W * Math.pow(Math.sin((Math.PI * (t + 0.18)) / 1.18), 1.35)
        : (t) => W * Math.pow(Math.sin((Math.PI * (t + 0.28)) / 1.28), 1.1);
      const { outline, width } = blade(s, prof, { heart: alo ? 0.3 : 0.2, asym: jitter(0.08) });
      g.blades.push(smooth(outline, true));
      all.push(...outline);
      g.ribs.push(smooth([0, 0.3, 0.6, 0.9, 0.995].map((t) => s.at(t))));
      const n = alo ? 5 : 7;
      for (const side of [1, -1] as const) {
        for (let k = 0; k < n; k++) {
          const t = 0.06 + (k / n) * 0.72;
          g.veins.push(lateral(t, side, 0.88, width, alo ? 0.16 : 0.2));
        }
        // basal veins into the lobes
        g.veins.push(smooth([s.at(0), along(s, -0.1, side * width(-0.1) * 0.5), along(s, -0.22, side * width(-0.2) * 0.7)]));
      }
      if (!alo) {
        // the spadix: a cream finger rising from the heart
        const base = s.at(0.02);
        const tipS: Pt = [base[0] + 12 + jitter(4), base[1] - 30];
        g.accents.push(smooth([base, [base[0] + 5, base[1] - 14], tipS]));
        all.push(tipS);
      }
      g.dew = dewPoints(s, width, rand, 8);
      break;
    }
    case "banana": {
      const s2 = spine([0, 0], [0, -1], L * 1.25, bend * 0.6);
      const W = 21;
      const prof: Profile = (t) => W * Math.sqrt(Math.max(0, 1 - Math.pow(2 * t - 1, 6))) * (1 - 0.22 * t);
      const { outline, width } = blade(s2, prof, { asym: jitter(0.1), samples: 60 });
      g.blades.push(smooth(outline, true));
      all.push(...outline);
      g.ribs.push(smooth([0, 0.5, 0.97].map((t) => s2.at(t))));
      for (let k = 0; k < 34; k++) {
        const t = 0.04 + (k / 34) * 0.92;
        for (const side of [1, -1] as const) {
          g.veins.push(smooth([along(s2, t, side * 1.2), along(s2, t + 0.025, side * width(t) * 0.98)]));
        }
      }
      const tears = 5 + Math.floor(rand() * 4);
      g.cutStroke = 0.9;
      for (let k = 0; k < tears; k++) {
        const t = 0.15 + rand() * 0.75;
        const side = rand() > 0.5 ? 1 : -1;
        const depth = 0.25 + rand() * 0.7;
        g.cuts.push(smooth([along(s2, t + 0.02, side * width(t) * 1.3), along(s2, t, side * width(t) * (1 - depth))]));
      }
      g.dew = dewPoints(s2, width, rand, 9);
      g.tip = s2.at(1);
      break;
    }
    case "calathea": {
      const W = 25;
      const prof: Profile = (t) => W * Math.pow(Math.sin(Math.PI * t), 0.82);
      const { outline, width } = blade(s, prof, { asym: jitter(0.1) });
      g.blades.push(smooth(outline, true));
      all.push(...outline);
      g.ribs.push(smooth([0, 0.5, 0.97].map((t) => s.at(t))));
      // pink pinstripes in pairs, like a Calathea ornata
      for (const side of [1, -1] as const) {
        for (let k = 0; k < 11; k++) {
          const t = 0.1 + k * 0.072;
          for (const o of [0, 0.014]) {
            g.accents.push(smooth([along(s, t + o, side * width(t) * 0.12), along(s, t + o + 0.05, side * width(t + 0.05) * 0.66)]));
          }
          g.veins.push(lateral(t + 0.035, side, 0.92, width, 0.06));
        }
      }
      g.dew = dewPoints(s, width, rand, 7);
      break;
    }
    case "palm":
    case "fern": {
      const fern = kind === "fern";
      const s2 = spine([0, 0], [0, -1], L * 1.3, bend + 0.18);
      g.ribs.push(smooth([0, 0.25, 0.5, 0.75, 1].map((t) => s2.at(t))));
      const count = fern ? 17 : 26;
      for (let i = 0; i < count; i++) {
        const t = 0.05 + (i / count) * 0.93;
        const base = s2.at(t);
        const taper = fern ? Math.sin(Math.PI * (0.15 + t * 0.85)) : 1 - 0.62 * t;
        const len = (fern ? 30 : 44) * taper * (0.9 + rand() * 0.2);
        const wid = fern ? 3.4 * taper + 0.8 : 3.2;
        for (const side of [1, -1] as const) {
          const n = s2.normal(t);
          const angle = (fern ? 1.05 : 0.8) + jitter(0.12);
          const tangent: Pt = [n[1] * -1, n[0]];
          // rotate the leaflet away from the rachis, toward the tip
          const dir: Pt = [
            side * n[0] * Math.sin(angle) + tangent[0] * -Math.cos(angle),
            side * n[1] * Math.sin(angle) + tangent[1] * -Math.cos(angle),
          ];
          const ls = spine(base, dir, len, side * (fern ? 0.05 : 0.18));
          const prof: Profile = fern
            ? (u) => wid * Math.pow(Math.sin(Math.PI * u), 0.7) * (0.72 + 0.28 * Math.abs(Math.cos(7 * Math.PI * u)))
            : (u) => wid * Math.pow(Math.sin(Math.PI * u), 0.6);
          const { outline } = blade(ls, prof, { samples: fern ? 40 : 16 });
          g.blades.push(smooth(outline, true));
          all.push(...outline);
          if (!fern) g.veins.push(smooth([ls.at(0), ls.at(0.5), ls.at(0.95)]));
          if (rand() > 0.82) g.dew.push(ls.at(0.4 + rand() * 0.3));
        }
      }
      g.tip = s2.at(1);
      break;
    }
  }

  g.bounds = bounds(all);
  return g;
}
