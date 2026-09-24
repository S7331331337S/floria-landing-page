"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { MEDIA, SCRUB } from "@/lib/motion";
import { moments } from "@/content/story";
import { Reveal } from "../fx/Reveal";

/*
 * V · FLOWERS FOR THE MOMENTS
 * Evening light. Three arrangements rise as a stack and fan out like a
 * hand of cards while two cut-out bouquets drift in from the dark.
 */
const FAN = [
  { x: -1, r: -11, y: 50 },
  { x: 0, r: 0, y: 0 },
  { x: 1, r: 11, y: 50 },
];

export function Moments() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add({ desktop: MEDIA.desktop, mobile: MEDIA.mobile, reduce: MEDIA.reduce }, (ctx) => {
        const { desktop, reduce } = ctx.conditions as Record<string, boolean>;
        const spread = () => window.innerWidth * (desktop ? 0.25 : 0.22);
        const cards = q("[data-card]");

        if (reduce) {
          gsap.set(cards, { x: (i: number) => FAN[i].x * spread(), y: (i: number) => FAN[i].y, rotate: (i: number) => FAN[i].r });
          gsap.set(q("[data-cutout]"), { opacity: 1 });
          return;
        }

        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: q("[data-fan-stage]")[0],
              start: "top top",
              end: () => `+=${window.innerHeight * 1.8}`,
              pin: true,
              scrub: SCRUB,
              invalidateOnRefresh: true,
            },
          })
          .fromTo(cards, { y: () => window.innerHeight * 0.7, rotate: 0, scale: 0.86 }, { y: 0, scale: 0.92, duration: 1.2, stagger: 0.12, ease: "power2.out" }, 0)
          .to(
            cards,
            {
              x: (i: number) => FAN[i].x * spread(),
              y: (i: number) => FAN[i].y,
              rotate: (i: number) => FAN[i].r,
              scale: 1,
              duration: 1.6,
              ease: "power2.inOut",
            },
            1.4,
          )
          .fromTo(q("[data-cutout=left]"), { xPercent: -60, rotate: -18, opacity: 0 }, { xPercent: 0, rotate: -6, opacity: 1, duration: 2.2, ease: "power2.out" }, 0.8)
          .fromTo(q("[data-cutout=right]"), { xPercent: 60, rotate: 18, opacity: 0 }, { xPercent: 0, rotate: 5, opacity: 1, duration: 2.2, ease: "power2.out" }, 1)
          .fromTo(q("[data-moments-body]"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 2.6)
          .to({}, { duration: 0.8 });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="moments" data-chapter="moments" className="relative bg-dusk text-cream">
      {/* the studio's dark floor melts into the evening */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-[30vh] bg-gradient-to-b from-night to-transparent" />

      <header className="relative mx-auto max-w-6xl px-6 pb-[4vh] pt-[24vh] text-center md:px-16">
        <Reveal as="p" split="words" className="kicker text-blush">
          {moments.kicker}
        </Reveal>
        <Reveal as="h2" split="words" className="display mt-6 text-[clamp(2.6rem,6.6vw,6.4rem)] text-balance">
          {moments.heading}
        </Reveal>
      </header>

      <div data-fan-stage className="relative h-[100svh] overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(234,160,171,0.14), transparent 70%)" }}
        />

        <div data-cutout="left" className="pointer-events-none absolute -left-[16vw] top-[6%] w-[70vw] opacity-0 md:-left-[6vw] md:w-[42vw]">
          <Image src={moments.cutouts[0].src} alt="" width={2816} height={1536} sizes="(min-width: 768px) 42vw, 70vw" className="h-auto w-full" />
        </div>
        <div data-cutout="right" className="pointer-events-none absolute -right-[18vw] bottom-[4%] w-[74vw] opacity-0 md:-right-[6vw] md:w-[44vw]">
          <Image src={moments.cutouts[1].src} alt="" width={2816} height={1536} sizes="(min-width: 768px) 44vw, 74vw" className="h-auto w-full" />
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          {moments.bouquets.map((b, i) => (
            <div
              key={b.src}
              data-card
              className="arch absolute aspect-[2/3] w-[52vw] overflow-hidden border border-cream/10 shadow-[0_50px_90px_-30px_rgba(0,0,0,0.8)] md:w-[22vw]"
              style={{ zIndex: i === 1 ? 3 : 2 }}
            >
              <Image src={b.src} alt={b.alt} fill sizes="(min-width: 768px) 22vw, 52vw" className="object-cover" />
            </div>
          ))}
        </div>

        <p
          data-moments-body
          className="display absolute inset-x-6 bottom-[7svh] mx-auto max-w-xl text-center text-[clamp(1.4rem,2.4vw,2.1rem)] italic leading-snug text-cream/90 opacity-0 motion-reduce:opacity-100"
        >
          {moments.body}
        </p>
      </div>
    </section>
  );
}
