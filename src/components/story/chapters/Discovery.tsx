"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { DURATION, EASE, MEDIA, SCRUB } from "@/lib/motion";
import { hero, threshold } from "@/content/story";
import { Foliage, type LeafPlacement } from "../flora/Foliage";
import { Motes } from "../fx/Motes";
import { JunglePlate } from "../fx/JunglePlate";

/*
 * THE DISCOVERY: hero + chapter I in one pinned, scroll-driven shot.
 *
 *   intro ─ the jungle fades up, leaves settle in, the name rises
 *   push  ─ leaves part to the edges, the wreath swells toward the camera
 *   enter ─ we pass through the wreath's heart into the greenhouse photo
 *   greet ─ Heather introduces herself over the photo
 *
 * Leaf layouts below are the art direction. Nudge x / y / w / r to recompose.
 */

// far: dark, soft silhouettes deep in the jungle
const FAR: LeafPlacement[] = [
  { kind: "palm", x: -10, y: 2, w: 34, r: -28, shade: 0.8, blur: 2 },
  { kind: "palm", x: 30, y: -38, w: 30, r: 172, shade: 0.82, blur: 2, mobile: false },
  { kind: "banana", x: 76, y: -8, w: 16, r: 28, shade: 0.78, blur: 2, flip: true },
  { kind: "fern", x: 64, y: 52, w: 20, r: 38, shade: 0.75, blur: 2 },
  { kind: "monstera", x: 6, y: 56, w: 24, r: -38, shade: 0.8, blur: 2 },
  { kind: "alocasia", x: 43, y: 74, w: 14, r: 6, shade: 0.85, blur: 2, mobile: false },
];

// mid: the leaves framing the wreath, with dew
const MID: LeafPlacement[] = [
  { kind: "monstera", x: -13, y: 38, w: 34, wm: 62, r: -52, shade: 0.3, dew: 6, exit: "left", sway: true },
  { kind: "alocasia", x: 79, y: 26, w: 24, wm: 44, r: 50, shade: 0.25, dew: 5, exit: "right", sway: true },
  { kind: "calathea", x: 0, y: -16, w: 18, wm: 30, r: -148, shade: 0.3, exit: "up", sway: true },
  { kind: "anthurium", x: 70, y: 60, w: 20, wm: 36, r: 28, shade: 0.15, dew: 4, exit: "right", sway: true },
  { kind: "banana", x: 90, y: -22, w: 16, r: -158, shade: 0.3, flip: true, exit: "up", mobile: false },
  { kind: "fern", x: 16, y: 68, w: 20, wm: 34, r: -18, shade: 0.25, exit: "down", sway: true },
  { kind: "calathea", x: 58, y: 78, w: 12, r: 12, shade: 0.35, exit: "down", mobile: false },
];

// near: huge, out-of-focus leaves right in front of the lens
const NEAR: LeafPlacement[] = [
  { kind: "monstera", x: -34, y: 48, w: 56, wm: 90, r: -32, blur: 5, dew: 8, exit: "left" },
  { kind: "banana", x: 84, y: 28, w: 34, wm: 55, r: 34, blur: 6, dew: 6, exit: "right" },
  { kind: "palm", x: 64, y: -46, w: 44, r: 200, blur: 4, exit: "right", mobile: false },
  { kind: "alocasia", x: -16, y: -40, w: 34, r: -164, blur: 3, exit: "up", mobile: false },
];

/**
 * Where each leaf flies to when the camera pushes through, in px.
 * Distance grows with the leaf's own size so even long, rotated banana
 * leaves clear the frame completely.
 */
function exitOffset(el: Element | null, strength = 1) {
  const slot = el as HTMLElement | null;
  if (!slot) return { x: 0, y: 0 };
  const reach = Math.max(slot.offsetWidth, slot.offsetHeight);
  const w = window.innerWidth;
  const h = window.innerHeight;
  const dir = slot.dataset.exit;
  const x = dir === "left" ? -(w * 0.45 + reach) : dir === "right" ? w * 0.45 + reach : 0;
  const y = dir === "up" ? -(h * 0.5 + reach) : dir === "down" ? h * 0.5 + reach : 0;
  return { x: x * strength, y: y * strength };
}

export function Discovery() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add({ desktop: MEDIA.desktop, mobile: MEDIA.mobile, reduce: MEDIA.reduce }, (ctx) => {
        const { desktop, reduce } = ctx.conditions as Record<string, boolean>;
        const portal = q("[data-portal]")[0] as HTMLElement;
        const window_ = q("[data-window]")[0] as HTMLElement;

        if (reduce) {
          // Calm version: land straight on Heather's greeting.
          gsap.set(q("[data-intro]"), { opacity: 1 });
          gsap.set(window_, { clipPath: "none", opacity: 1 });
          gsap.set(q("[data-portal-wrap], [data-title], [data-cue], [data-layer=near], [data-layer=mid]"), { autoAlpha: 0 });
          gsap.set(q("[data-shade]"), { opacity: 1 });
          gsap.set(q("[data-t]"), { opacity: 1, visibility: "visible" });
          return;
        }

        const chars = SplitText.create(q("[data-title-line]"), { type: "chars" }).chars;
        const words = SplitText.create(q("[data-t-heading]"), { type: "words", mask: "words" }).words;
        gsap.set(q("[data-t-heading]"), { visibility: "visible" });

        // ── intro: plays once on load ─────────────────────────────────
        const intro = gsap.timeline({ defaults: { ease: EASE.cinematic } });
        intro
          .from(q("[data-layer=sky]"), { opacity: 0, duration: 2.4, ease: "power1.out" })
          .from(q("[data-layer=far] [data-leaf-inner]"), { opacity: 0, scale: 1.12, duration: 3, stagger: 0.08 }, 0)
          .from(
            q("[data-layer=mid] [data-leaf-inner], [data-layer=near] [data-leaf-inner]"),
            {
              x: (_i: number, el: Element) => exitOffset(el.closest("[data-leaf]"), 0.22).x,
              y: (_i: number, el: Element) => exitOffset(el.closest("[data-leaf]"), 0.22).y,
              opacity: 0,
              duration: DURATION.intro,
              stagger: 0.06,
            },
            0.15,
          )
          .fromTo(q("[data-portal-wrap]"), { opacity: 0, scale: 0.7 }, { opacity: 0.55, scale: 0.86, duration: 3.2 }, 0.5)
          .from(chars, { yPercent: 105, opacity: 0, duration: 1.7, stagger: 0.045 }, 0.9)
          .to(q("[data-intro]"), { opacity: 1, duration: 1.4, stagger: 0.18, ease: "power2.out" }, 1.7);

        // ── the scroll shot ───────────────────────────────────────────
        const holeStart = () => portal.offsetWidth * 0.24;
        const holeEnd = () => Math.hypot(window.innerWidth, window.innerHeight) / 2 + 40;

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${window.innerHeight * (desktop ? 3.6 : 3)}`,
            pin: true,
            scrub: SCRUB,
            invalidateOnRefresh: true,
          },
        });

        tl.to(q("[data-cue]"), { opacity: 0, duration: 0.4 }, 0)
          // the name drifts up and away
          .to(q("[data-title-line]"), { yPercent: -45, opacity: 0, stagger: 0.25, duration: 1.6, ease: "power1.in" }, 0)
          .to(q("[data-intro]"), { opacity: 0, duration: 0.9 }, 0)
          // the wreath comes into focus
          .to(q("[data-portal-wrap]"), { opacity: 1, scale: 1, duration: 2 }, 0)
          .fromTo(window_, { opacity: 0 }, { opacity: 1, duration: 1.4 }, 0.6)
          // leaves part like curtains
          .to(q("[data-layer=far]"), { scale: 1.3, duration: 6 }, 0)
          .to(
            q("[data-layer=near] [data-leaf]"),
            {
              x: (_i: number, el: Element) => exitOffset(el, 1.1).x,
              y: (_i: number, el: Element) => exitOffset(el, 1.1).y,
              scale: 1.15,
              duration: 3,
              ease: "power1.in",
            },
            0,
          )
          .to(
            q("[data-layer=mid] [data-leaf]"),
            {
              x: (_i: number, el: Element) => exitOffset(el).x,
              y: (_i: number, el: Element) => exitOffset(el).y,
              scale: 1.1,
              duration: 3.6,
              stagger: 0.06,
              ease: "power1.in",
            },
            0.8,
          )
          // push through the heart of the wreath
          .fromTo(portal, { scale: 1 }, { scale: 9, duration: 4, ease: "power2.in" }, 2)
          .fromTo(
            window_,
            { clipPath: () => `circle(${holeStart()}px at 50% 50%)` },
            { clipPath: () => `circle(${holeEnd()}px at 50% 50%)`, duration: 4, ease: "power2.in" },
            2,
          )
          .fromTo(q("[data-photo]"), { scale: 1.5 }, { scale: 1.1, duration: 4, ease: "power1.out" }, 2)
          .to(q("[data-portal-wrap]"), { opacity: 0, duration: 0.8 }, 5.2)
          .fromTo(q("[data-aside]"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 4.3)
          .to(q("[data-aside]"), { opacity: 0, y: -30, duration: 0.7 }, 6)
          // Heather says hello
          .to(q("[data-shade]"), { opacity: 1, duration: 1.2 }, 6.1)
          .to(q("[data-photo]"), { scale: 1, duration: 4 }, 6)
          .fromTo(q("[data-t-kicker]"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 6.6)
          .fromTo(words, { yPercent: 110 }, { yPercent: 0, stagger: 0.07, duration: 0.9, ease: "power2.out" }, 6.8)
          .fromTo(q("[data-t-body]"), { opacity: 0, y: 28 }, { opacity: 1, y: 0, stagger: 0.55, duration: 0.8 }, 7.6)
          .to({}, { duration: 1 });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="discovery"
      data-chapter="discovery"
      className="relative h-[100svh] w-full overflow-hidden bg-night"
      aria-label="Welcome to La Casa Del Amor"
    >
      {/* sky: layered glow and light shafts */}
      <div
        data-layer="sky"
        className="absolute inset-0 bg-night"
      >
        <JunglePlate priority />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 60% 55% at 50% 45%, rgba(36,71,45,0.35), transparent 75%)" }}
        />
        <div
          className="absolute inset-0 opacity-70 mix-blend-screen"
          style={{
            background:
              "linear-gradient(112deg, transparent 28%, rgba(233,201,121,0.10) 38%, transparent 46%), linear-gradient(104deg, transparent 52%, rgba(233,201,121,0.07) 58%, transparent 63%)",
          }}
        />
      </div>

      <div data-layer="far" className="absolute inset-0">
        <Foliage leaves={FAR} />
      </div>

      <div
        aria-hidden
        className="mist pointer-events-none absolute -inset-[10%] opacity-30"
        style={{ animation: "drift 22s ease-in-out infinite alternate" }}
      />

      {/* the world behind the wreath */}
      <div data-window className="absolute inset-0 opacity-0" style={{ clipPath: "circle(0px at 50% 50%)" }}>
        <Image
          data-photo
          src={hero.reveal.src}
          alt={hero.reveal.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          data-shade
          className="absolute inset-0 opacity-0"
          style={{ background: "linear-gradient(to top, rgba(6,17,11,0.92) 8%, rgba(6,17,11,0.45) 45%, rgba(6,17,11,0.15))" }}
        />
      </div>

      {/* the wreath portal */}
      <div
        data-portal-wrap
        className="pointer-events-none absolute inset-0 m-auto h-[min(80vmin,780px)] w-[min(80vmin,780px)] opacity-0"
      >
        <div data-portal className="h-full w-full">
          <Image src={hero.portal.src} alt={hero.portal.alt} fill priority sizes="80vmin" className="object-contain" />
        </div>
      </div>

      <div data-layer="mid" className="absolute inset-0">
        <Foliage leaves={MID} />
      </div>

      {/* the name */}
      <div data-title className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <p data-intro className="kicker mb-6 text-gold opacity-0">
          {hero.eyebrow}
        </p>
        <h1 className="display text-[clamp(4rem,14vw,13rem)] text-cream [text-shadow:0_0_60px_rgba(6,17,11,0.9)]">
          <span data-title-line className="block">
            {hero.title[0]}
          </span>
          <span data-title-line className="block italic font-light text-gold/95">
            {hero.title[1]}
          </span>
        </h1>
        <p data-intro className="display mt-6 text-xl italic text-cream/80 opacity-0 md:text-3xl">
          {hero.whisper}
        </p>
      </div>

      <p
        data-aside
        className="display pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 px-6 text-center text-4xl italic text-cream opacity-0 [text-shadow:0_2px_40px_rgba(6,17,11,0.8)] md:text-6xl"
      >
        {hero.aside}
      </p>

      {/* chapter I: Heather's hello */}
      <div className="absolute inset-x-0 bottom-0 px-6 pb-[11svh] md:px-16 md:pb-[13svh]">
        <div className="max-w-3xl">
          <p data-t data-t-kicker className="kicker mb-5 text-gold opacity-0">
            {threshold.kicker}
          </p>
          <h2 data-t data-t-heading className="display invisible mb-7 text-[clamp(2.6rem,7vw,6rem)] text-cream text-balance">
            {threshold.heading}
          </h2>
          <div className="space-y-4">
            {threshold.body.map((line) => (
              <p key={line} data-t data-t-body className="max-w-[54ch] text-lg leading-relaxed text-cream/85 opacity-0 md:text-xl">
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div data-layer="near" className="absolute inset-0">
        <Foliage leaves={NEAR} />
      </div>

      <Motes density={2.5} />

      <div data-cue data-intro className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 opacity-0">
        <span className="kicker text-[0.62rem] text-cream/70">{hero.cue}</span>
        <span className="block h-10 w-px bg-gradient-to-b from-gold to-transparent" style={{ animation: "cue 2.4s ease-in-out infinite" }} />
      </div>

      {/* lens vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, transparent 50%, rgba(6,17,11,0.85) 100%)" }}
      />
    </section>
  );
}
