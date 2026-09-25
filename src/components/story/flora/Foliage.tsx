import type { CSSProperties } from "react";
import { Leaf } from "./Leaf";
import type { LeafKind } from "./shapes";

/**
 * One leaf placed in a scene. Positions are % of the scene box, sizes are
 * vw so the composition scales with the screen.
 */
export type LeafPlacement = {
  kind: LeafKind;
  /** left edge, % of container */
  x: number;
  /** top edge, % of container */
  y: number;
  /** width on desktop, in vw */
  w: number;
  /** width on phones, in vw (defaults to 1.7× the desktop size) */
  wm?: number;
  /** rotation in degrees */
  r?: number;
  seed?: number;
  /** 0 = vivid & close, 1 = dark silhouette far away */
  shade?: number;
  flip?: boolean;
  dew?: number;
  /** depth-of-field blur in px */
  blur?: number;
  /** parallax: + rushes past (near), − lags behind (far). See useParallax */
  speed?: number;
  /** which way the leaf leaves the frame in the hero dolly */
  exit?: "left" | "right" | "up" | "down";
  /** set false to hide on phones */
  mobile?: boolean;
  /** gentle idle sway */
  sway?: boolean;
  z?: number;
};

/**
 * Three nested wrappers per leaf so animations never fight:
 * [data-leaf] scroll / parallax · [data-leaf-inner] intro · inner div rotation + sway.
 */
export function Foliage({ leaves, className = "" }: { leaves: LeafPlacement[]; className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      {leaves.map((l, i) => (
        <div
          key={i}
          data-leaf
          data-exit={l.exit}
          data-speed={l.speed}
          className={`leaf-slot absolute ${l.mobile === false ? "hidden md:block" : ""}`}
          style={
            {
              left: `${l.x}%`,
              top: `${l.y}%`,
              zIndex: l.z,
              "--w": `${l.w}vw`,
              "--wm": `${l.wm ?? l.w * 1.7}vw`,
            } as CSSProperties
          }
        >
          <div data-leaf-inner>
          <div
            className={l.sway ? "leaf-sway" : undefined}
            style={
              {
                rotate: `${l.r ?? 0}deg`,
                filter: l.blur ? `blur(${l.blur}px)` : undefined,
                animationDelay: `${(i % 5) * -1.7}s`,
              } as CSSProperties
            }
          >
            <Leaf kind={l.kind} seed={l.seed ?? i + 1} shade={l.shade} dew={l.dew} flip={l.flip} className="block h-auto w-full" />
          </div>
          </div>
        </div>
      ))}
    </div>
  );
}
