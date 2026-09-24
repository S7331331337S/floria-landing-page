"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

type Props = {
  text: string;
  className?: string;
  /** element that drives the progress; defaults to the closest <section> */
  start?: string;
  end?: string;
};

/** Each word glows from a whisper to full ink as you scroll through. */
export function ScrubWords({ text, className, start = "top 70%", end = "bottom 30%" }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const trigger = (el.closest("[data-scrub-root]") as HTMLElement) ?? el;
        const split = SplitText.create(el, { type: "words" });
        gsap.fromTo(
          split.words,
          { opacity: 0.14 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.12,
            scrollTrigger: { trigger, start, end, scrub: true },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <p ref={ref} className={className}>
      {text}
    </p>
  );
}
