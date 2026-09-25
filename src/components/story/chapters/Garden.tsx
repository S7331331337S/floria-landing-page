"use client";

import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { MEDIA, SCRUB } from "@/lib/motion";
import { garden } from "@/content/story";
import { Motes } from "../fx/Motes";
import { useParallax } from "../fx/useParallax";

/*
 * VI · THE GARDEN
 * Golden hour. We start close on a single flower bed and pull all the way
 * back to see the whole garden, then flip through a few snapshots.
 */
const SNAPS = [
  { rotate: -4, speed: 0.2, offset: "md:mt-0" },
  { rotate: 3, speed: 0.7, offset: "md:mt-[18vh]" },
  { rotate: -2, speed: 0.4, offset: "md:mt-[6vh]" },
];

export function Garden() {
  const root = useRef<HTMLElement>(null);
  const snaps = useRef<HTMLDivElement>(null);
  useParallax(snaps);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add({ desktop: MEDIA.desktop, mobile: MEDIA.mobile, reduce: MEDIA.reduce }, (ctx) => {
        if ((ctx.conditions as Record<string, boolean>).reduce) {
          gsap.set(q("[data-g]"), { opacity: 1, visibility: "visible" });
          return;
        }
        const chars = SplitText.create(q("[data-garden-heading]"), { type: "chars" }).chars;
        gsap.set(q("[data-garden-heading]"), { visibility: "visible" });

        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: q("[data-garden-stage]")[0],
              start: "top top",
              end: () => `+=${window.innerHeight * 2.4}`,
              pin: true,
              scrub: SCRUB,
            },
          })
          .fromTo(q("[data-aerial]"), { scale: 2.6 }, { scale: 1, duration: 3.2, ease: "power2.inOut" }, 0)
          .fromTo(q("[data-golden]"), { opacity: 0.2 }, { opacity: 1, duration: 3 }, 0)
          .fromTo(q("[data-g-kicker]"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 1.6)
          .fromTo(chars, { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.05, duration: 0.8, ease: "power2.out" }, 1.9)
          .fromTo(q("[data-g-body]"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.5, duration: 0.8 }, 2.8)
          .to({}, { duration: 1 });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="garden" data-chapter="garden" className="relative bg-night text-cream">
      <div data-garden-stage className="relative h-[100svh] overflow-hidden">
        <div data-aerial className="absolute inset-0 origin-[55%_62%]">
          <Image src={garden.aerial.src} alt={garden.aerial.alt} fill sizes="100vw" className="object-cover" />
        </div>
        <div
          data-golden
          aria-hidden
          className="absolute inset-0 mix-blend-soft-light"
          style={{ background: "linear-gradient(170deg, rgba(233,201,121,0.85), rgba(234,160,171,0.45) 55%, rgba(6,17,11,0.4))" }}
        />
        <div aria-hidden className="absolute inset-x-0 top-0 h-[28vh] bg-gradient-to-b from-dusk to-transparent" />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(6,17,11,0.9) 6%, rgba(6,17,11,0.25) 52%, transparent)" }}
        />
        <Motes density={2} color="255,226,160" />

        <div className="absolute inset-x-0 bottom-0 px-6 pb-[10svh] md:px-16 md:pb-[12svh]">
          <p data-g data-g-kicker className="kicker text-gold opacity-0">
            {garden.kicker}
          </p>
          <h2 data-g data-garden-heading className="display invisible mt-5 text-[clamp(3.4rem,11vw,10rem)] italic">
            {garden.heading}
          </h2>
          <div className="mt-6 max-w-[52ch] space-y-3">
            {garden.body.map((line) => (
              <p key={line} data-g data-g-body className="text-lg leading-relaxed text-cream/85 opacity-0 md:text-xl">
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={snaps}
        data-parallax-root
        className="relative mx-auto grid max-w-6xl grid-cols-1 gap-16 px-10 py-[16vh] sm:grid-cols-3 sm:gap-8 md:px-16"
      >
        {garden.snapshots.map((s, i) => (
          <figure
            key={s.src}
            data-speed={SNAPS[i].speed}
            className={`bg-cream p-3 pb-4 text-ink shadow-[0_30px_60px_-25px_rgba(0,0,0,0.7)] ${SNAPS[i].offset}`}
            style={{ rotate: `${SNAPS[i].rotate}deg` } as CSSProperties}
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image src={s.src} alt={s.alt} fill sizes="(min-width: 640px) 30vw, 80vw" className="object-cover" />
            </div>
            <figcaption className="display mt-3 text-center text-2xl italic text-ink/75">{s.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
