"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { gsap, useGSAP } from "@/lib/gsap";
import { MEDIA } from "@/lib/motion";
import { hero, invitation, site } from "@/content/story";
import { Foliage, type LeafPlacement } from "../flora/Foliage";
import { Motes } from "../fx/Motes";
import { JunglePlate } from "../fx/JunglePlate";
import { Reveal } from "../fx/Reveal";

/*
 * FINALE · STAY A WHILE
 * The jungle closes back in around the wreath, bookending the opening
 * shot, and Heather sends you off to the shop.
 */
const FRAME: LeafPlacement[] = [
  { kind: "monstera", x: -14, y: 42, w: 34, wm: 60, r: -48, shade: 0.2, dew: 6, exit: "left", sway: true },
  { kind: "palm", x: -8, y: -30, w: 32, r: -150, shade: 0.35, exit: "left" },
  { kind: "alocasia", x: 80, y: 30, w: 24, wm: 44, r: 46, shade: 0.2, dew: 4, exit: "right", sway: true },
  { kind: "banana", x: 86, y: -24, w: 16, r: -165, shade: 0.3, flip: true, exit: "right", mobile: false },
  { kind: "anthurium", x: 72, y: 66, w: 18, wm: 34, r: 26, shade: 0.1, dew: 3, exit: "right", sway: true },
  { kind: "fern", x: 10, y: 72, w: 20, wm: 34, r: -12, shade: 0.2, exit: "left", sway: true },
  { kind: "calathea", x: 50, y: 84, w: 12, r: 6, shade: 0.25, exit: "right", mobile: false },
];

export function Invitation() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add({ desktop: MEDIA.desktop, mobile: MEDIA.mobile }, () => {
        // leaves close in from the edges as the finale arrives
        gsap.from(q("[data-leaf]"), {
          x: (_i: number, el: Element) => ((el as HTMLElement).dataset.exit === "left" ? -1 : 1) * window.innerWidth * 0.5,
          scale: 1.3,
          ease: "power2.out",
          stagger: 0.04,
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "top top", scrub: true },
        });
        gsap.fromTo(
          q("[data-wreath]"),
          { rotate: -25, scale: 0.7, opacity: 0 },
          { rotate: 15, scale: 1, opacity: 0.9, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom bottom", scrub: true } },
        );
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="invitation"
      data-chapter="invitation"
      className="relative flex min-h-[125svh] flex-col overflow-hidden bg-night text-cream"
    >
      <JunglePlate className="opacity-80" />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 55% at 50% 45%, rgba(36,71,45,0.3), rgba(6,17,11,0.55) 85%)" }}
      />
      <div aria-hidden className="mist pointer-events-none absolute -inset-[10%] opacity-25" style={{ animation: "drift 24s ease-in-out infinite alternate" }} />

      <div data-wreath className="pointer-events-none absolute inset-0 m-auto h-[min(92vmin,900px)] w-[min(92vmin,900px)] opacity-0">
        <Image src={hero.portal.src} alt="" fill sizes="92vmin" className="object-contain opacity-35" />
      </div>

      <Foliage leaves={FRAME} />
      <Motes density={2.5} />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-[20vh] text-center">
        <Reveal as="p" split="words" className="kicker text-gold">
          {invitation.kicker}
        </Reveal>
        <Reveal as="h2" split="words" className="display mt-6 max-w-5xl text-[clamp(3rem,8vw,7.5rem)] text-balance [text-shadow:0_0_50px_rgba(6,17,11,0.9)]">
          {invitation.heading}
        </Reveal>
        <Reveal className="mt-8 max-w-[44ch] text-lg leading-relaxed text-cream/85 md:text-xl">{invitation.body}</Reveal>
        <Reveal as="p" split="chars" className="display mt-8 text-3xl italic text-gold md:text-4xl">
          {invitation.signature}
        </Reveal>

        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href={site.exploreUrl}
            className="group inline-flex h-14 items-center gap-3 rounded-full border border-cream/30 px-8 text-sm font-medium tracking-wide text-cream backdrop-blur-sm transition duration-500 hover:border-gold hover:text-gold active:scale-[0.98]"
          >
            {invitation.explore}
          </a>
          <a
            href={site.shopUrl}
            className="group inline-flex h-14 items-center gap-3 rounded-full bg-gold px-8 text-sm font-semibold tracking-wide text-night shadow-[0_20px_50px_-15px_rgba(233,201,121,0.6)] transition duration-500 hover:bg-cream active:scale-[0.98]"
          >
            {invitation.shop}
            <ArrowUpRight size={18} weight="bold" className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>

      <footer className="relative z-10 flex flex-col items-center justify-between gap-3 border-t border-cream/10 px-6 py-6 text-xs tracking-wide text-cream/50 md:flex-row md:px-16">
        <span className="display text-base italic text-cream/70">{site.name}</span>
        <span>
          {site.place} · Grown by hand by {site.owner}
        </span>
        <a href={site.instagram} className="transition hover:text-gold">
          Instagram
        </a>
      </footer>
    </section>
  );
}
