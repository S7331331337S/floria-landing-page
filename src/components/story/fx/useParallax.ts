"use client";

import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Gives every `[data-speed]` element inside `scope` its own scroll speed.
 * speed 0 = moves with the page, positive = rushes past faster (close to
 * the camera), negative = lags behind (far away).
 * Progress is measured against the closest `[data-parallax-root]`.
 */
export function useParallax(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-speed]", scope.current).forEach((el) => {
          const speed = parseFloat(el.dataset.speed || "0");
          const trigger = (el.closest("[data-parallax-root]") as HTMLElement) ?? el;
          gsap.fromTo(
            el,
            { y: () => speed * window.innerHeight * 0.5 },
            {
              y: () => -speed * window.innerHeight * 0.5,
              ease: "none",
              scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true },
            },
          );
        });
      });
    },
    { scope },
  );
}
