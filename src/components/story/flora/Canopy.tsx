"use client";

import { useRef } from "react";
import { Foliage, type LeafPlacement } from "./Foliage";
import { useParallax } from "../fx/useParallax";

/**
 * A band of leaves straddling the seam between two chapters. The leaves
 * move faster than the page, so they sweep past the camera like brushing
 * through foliage, hiding the cut from one world into the next.
 */
export function Canopy({ leaves, className = "" }: { leaves: LeafPlacement[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useParallax(ref);
  return (
    <div ref={ref} data-parallax-root className={`pointer-events-none relative z-30 h-0 ${className}`}>
      <div className="absolute inset-x-0 -top-[45vh] h-[90vh]">
        <Foliage leaves={leaves} />
      </div>
    </div>
  );
}
