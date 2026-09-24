"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { DURATION, EASE } from "@/lib/motion";

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** how the text is broken up before it rises in */
  split?: "lines" | "words" | "chars";
  delay?: number;
  stagger?: number;
  /** keep it on screen once revealed instead of easing out again */
  once?: boolean;
  /** ScrollTrigger start, e.g. "top 85%" */
  start?: string;
};

/**
 * Text that rises out of a mask when it scrolls into view and sinks back
 * out when it leaves. Re-splits itself on resize and after fonts load.
 */
export function Reveal({
  as: Tag = "p",
  children,
  className,
  split = "lines",
  delay = 0,
  stagger,
  once = false,
  start = "top 86%",
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(el, { visibility: "visible" });
      });
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        SplitText.create(el, {
          type: split === "chars" ? "words,chars" : split,
          mask: split,
          autoSplit: true,
          onSplit(self) {
            gsap.set(el, { visibility: "visible" });
            const targets = split === "chars" ? self.chars : split === "words" ? self.words : self.lines;
            return gsap.fromTo(
              targets,
              { yPercent: 118, rotate: split === "lines" ? 0 : 4 },
              {
                yPercent: 0,
                rotate: 0,
                duration: DURATION.text,
                ease: EASE.cinematic,
                delay,
                stagger: stagger ?? (split === "chars" ? 0.028 : split === "words" ? 0.05 : 0.11),
                scrollTrigger: {
                  trigger: el,
                  start,
                  end: "bottom 10%",
                  toggleActions: once ? "play none none none" : "play reverse play reverse",
                },
              },
            );
          },
        });
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className} data-reveal>
      {children}
    </Tag>
  );
}
