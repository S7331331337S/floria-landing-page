import { useId, useMemo, type CSSProperties } from "react";
import { growLeaf, rng, type LeafKind } from "./shapes";

type Palette = { base: string; tip: string; vein: string; rib: string; accent: string; stem: string };

/** Default colours per species. Override any of them with the `tone` prop. */
export const PALETTES: Record<LeafKind, Palette> = {
  monstera: { base: "#0f3320", tip: "#2f6d3b", vein: "#5f9656", rib: "#77aa62", accent: "#000", stem: "#1b3f25" },
  alocasia: { base: "#0a2016", tip: "#1c4a32", vein: "#d6e8cd", rib: "#e7f1dc", accent: "#000", stem: "#40302a" },
  anthurium: { base: "#8e1a31", tip: "#e2586f", vein: "#f08c9a", rib: "#f6a9b3", accent: "#f3e2ad", stem: "#2c4a2c" },
  banana: { base: "#27521f", tip: "#79a843", vein: "#9ec867", rib: "#c9e090", accent: "#000", stem: "#3e6a2c" },
  calathea: { base: "#122b1c", tip: "#27503a", vein: "#3d6a4c", rib: "#eaa3b4", accent: "#eca8ba", stem: "#5a2231" },
  palm: { base: "#1b4424", tip: "#5f933d", vein: "#86b35a", rib: "#4c6d2f", accent: "#000", stem: "#4c6d2f" },
  fern: { base: "#285626", tip: "#8cba53", vein: "#9cc766", rib: "#3f6b2a", accent: "#000", stem: "#3f6b2a" },
};

const NIGHT = [6, 17, 11];

// Round everything that reaches the DOM so server and browser maths agree.
const round = (n: number) => Math.round(n * 100) / 100;

function mix(hex: string, amount: number) {
  if (amount <= 0) return hex;
  const n = parseInt(hex.slice(1), 16);
  const c = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v, i) => Math.round(v + (NIGHT[i] - v) * amount));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

export type LeafProps = {
  kind: LeafKind;
  seed?: number;
  /** 0 = full colour, 1 = silhouette. Use for depth: far layers are darker. */
  shade?: number;
  /** number of dew drops to scatter on the leaf */
  dew?: number;
  /** curvature of the midrib, negative curls the other way */
  bend?: number;
  flip?: boolean;
  tone?: Partial<Palette>;
  className?: string;
  style?: CSSProperties;
};

export function Leaf({ kind, seed = 1, shade = 0, dew = 0, bend = 0.12, flip, tone, className, style }: LeafProps) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const g = useMemo(() => growLeaf(kind, seed, bend), [kind, seed, bend]);
  const drops = useMemo(() => {
    const rand = rng(seed * 31 + 7);
    return g.dew.slice(0, dew).map((p) => ({ x: round(p[0]), y: round(p[1]), r: round(0.9 + rand() * 1.5) }));
  }, [g, dew, seed]);

  const p = { ...PALETTES[kind], ...tone };
  const c = (k: keyof Palette) => mix(p[k], shade);
  const [bx, by, bw, bh] = g.bounds.map(round);
  const single = g.blades.length === 1;
  const hasMask = g.cuts.length > 0;

  return (
    <svg
      viewBox={`${bx} ${by} ${bw} ${bh}`}
      className={className}
      style={{ ...style, transform: flip ? "scaleX(-1)" : undefined, overflow: "visible" }}
      aria-hidden
      focusable="false"
    >
      <defs>
        <linearGradient id={`${uid}g`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={round(g.tip[0])} y2={round(g.tip[1])}>
          <stop offset="0" stopColor={c("base")} />
          <stop offset="1" stopColor={c("tip")} />
        </linearGradient>
        <radialGradient id={`${uid}s`} cx="32%" cy="28%" r="70%">
          <stop offset="0" stopColor="#fff" stopOpacity={0.2 * (1 - shade)} />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${uid}d`} cx="40%" cy="38%" r="60%">
          <stop offset="0" stopColor="#fff" stopOpacity="0.05" />
          <stop offset="0.72" stopColor="#fff" stopOpacity="0.16" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.6" />
        </radialGradient>
        {hasMask && (
          <mask id={`${uid}m`} maskUnits="userSpaceOnUse" x={bx} y={by} width={bw} height={bh}>
            <rect x={bx} y={by} width={bw} height={bh} fill="#fff" />
            {g.cuts.map((d, i) =>
              g.cutStroke ? (
                <path key={i} d={d} fill="none" stroke="#000" strokeWidth={g.cutStroke} strokeLinecap="round" />
              ) : (
                <path key={i} d={d} fill="#000" />
              ),
            )}
          </mask>
        )}
      </defs>

      <path d={g.stem} fill="none" stroke={c("stem")} strokeWidth={kind === "palm" || kind === "fern" ? 1.8 : 2.4} strokeLinecap="round" />

      <g mask={hasMask ? `url(#${uid}m)` : undefined}>
        {g.blades.map((d, i) => (
          <path key={i} d={d} fill={`url(#${uid}g)`} />
        ))}
        {single && <path d={g.blades[0]} fill={`url(#${uid}s)`} />}
        {g.veins.map((d, i) => (
          <path key={i} d={d} fill="none" stroke={c("vein")} strokeWidth={kind === "alocasia" ? 0.9 : 0.5} strokeOpacity={kind === "alocasia" ? 0.85 : 0.5} strokeLinecap="round" />
        ))}
        {g.accents.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke={c("accent")}
            strokeWidth={kind === "anthurium" ? 4.2 : 0.7}
            strokeOpacity={kind === "anthurium" ? 1 : 0.85}
            strokeLinecap="round"
          />
        ))}
        {g.ribs.map((d, i) => (
          <path key={i} d={d} fill="none" stroke={c("rib")} strokeWidth={single ? 1.4 : 1.7} strokeLinecap="round" />
        ))}
      </g>

      {drops.map((d, i) => (
        <g key={i}>
          <ellipse cx={round(d.x + d.r * 0.35)} cy={round(d.y + d.r * 0.45)} rx={d.r} ry={round(d.r * 0.85)} fill="#000" opacity="0.22" />
          <circle cx={d.x} cy={d.y} r={d.r} fill={`url(#${uid}d)`} />
          <circle cx={round(d.x - d.r * 0.35)} cy={round(d.y - d.r * 0.38)} r={round(d.r * 0.26)} fill="#fff" opacity="0.9" />
        </g>
      ))}
    </svg>
  );
}
