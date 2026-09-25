"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { EASE, MEDIA, SCRUB } from "@/lib/motion";
import { studio } from "@/content/story";

/*
 * IV · THE STUDIO
 * A doorway-shaped window opens until the studio fills the screen, then
 * Heather's words settle over it with a close-up of the plant wall.
 */
const ARCH = {
  desktop: "inset(12% 9% 12% 53% round 999px 999px 18px 18px)",
  mobile: "inset(44% 8% 6% 8% round 999px 999px 18px 18px)",
  open: "inset(0% 0% 0% 0% round 0px 0px 0px 0px)",
};

export function Studio() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add({ desktop: MEDIA.desktop, mobile: MEDIA.mobile, reduce: MEDIA.reduce }, (ctx) => {
        const { desktop, reduce } = ctx.conditions as Record<string, boolean>;
        if (reduce) {
          gsap.set(q("[data-arch]"), { clipPath: ARCH.open });
          gsap.set(q("[data-copy-a]"), { autoAlpha: 0 });
          gsap.set(q("[data-shade], [data-copy-b], [data-inset]"), { opacity: 1 });
          return;
        }

        const words = SplitText.create(q("[data-studio-heading]"), { type: "words", mask: "words" }).words;
        gsap.from(words, {
          yPercent: 110,
          duration: 1.2,
          stagger: 0.06,
          ease: EASE.cinematic,
          scrollTrigger: { trigger: root.current, start: "top 65%", toggleActions: "play none none reverse" },
        });

        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: () => `+=${window.innerHeight * 2.2}`,
              pin: true,
              scrub: SCRUB,
            },
          })
          .fromTo(q("[data-arch]"), { clipPath: desktop ? ARCH.desktop : ARCH.mobile }, { clipPath: ARCH.open, duration: 3, ease: "power2.inOut" }, 0.4)
          .fromTo(q("[data-studio-img]"), { scale: 1.3 }, { scale: 1, duration: 3.4, ease: "power1.out" }, 0.4)
          .to(q("[data-copy-a]"), { opacity: 0, y: -50, duration: 1 }, 1.3)
          .to(q("[data-shade]"), { opacity: 1, duration: 1 }, 2.6)
          .fromTo(q("[data-copy-b]"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }, 3)
          .fromTo(q("[data-inset]"), { opacity: 0, y: 160, rotate: 6 }, { opacity: 1, y: 0, rotate: -3, duration: 1.3, ease: "power2.out" }, 3.2)
          .to({}, { duration: 1 });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="studio" data-chapter="studio" className="paper-texture relative h-[100svh] overflow-hidden text-ink">
      <div data-copy-a className="absolute inset-x-6 top-[13svh] z-10 md:inset-x-auto md:left-16 md:top-1/2 md:max-w-[40vw] md:-translate-y-1/2">
        <p className="kicker text-fern">{studio.kicker}</p>
        <h2 data-studio-heading className="display mt-5 text-[clamp(2.8rem,6.4vw,6rem)] text-balance">
          {studio.heading}
        </h2>
      </div>

      <div data-arch className="absolute inset-0" style={{ clipPath: ARCH.desktop }}>
        <Image data-studio-img src={studio.photo.src} alt={studio.photo.alt} fill sizes="100vw" className="object-cover" />
        <div
          data-shade
          className="absolute inset-0 opacity-0"
          style={{ background: "linear-gradient(to top, rgba(6,17,11,0.9) 5%, rgba(6,17,11,0.35) 50%, rgba(6,17,11,0.05))" }}
        />
      </div>

      <div data-copy-b className="absolute inset-x-6 bottom-[9svh] z-10 max-w-2xl text-cream opacity-0 md:left-16 md:right-auto">
        <p className="display text-[clamp(1.5rem,2.6vw,2.4rem)] italic leading-snug text-pretty">{studio.body}</p>
      </div>

      <div
        data-inset
        className="arch absolute right-6 top-[10svh] z-20 aspect-[3/4] w-[34vw] overflow-hidden opacity-0 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] md:right-[7vw] md:top-auto md:bottom-[10svh] md:w-[17vw]"
      >
        <Image src={studio.inset.src} alt={studio.inset.alt} fill sizes="(min-width: 768px) 17vw, 34vw" className="object-cover" />
      </div>
    </section>
  );
}
