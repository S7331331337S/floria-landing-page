"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE, MEDIA, SCRUB } from "@/lib/motion";
import { craft } from "@/content/story";
import { Reveal } from "../fx/Reveal";

/*
 * II · HANDS IN THE SOIL
 * The page turns sideways: vertical scroll drives a horizontal walk
 * through the four steps of making a kokedama. Each photo drifts inside
 * its arch as it passes, for a slow dolly feel.
 */
export function Craft() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add({ desktop: MEDIA.desktop, mobile: MEDIA.mobile }, () => {
        const track = q("[data-track]")[0] as HTMLElement;
        const distance = () => track.scrollWidth - window.innerWidth;

        const walk = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: q("[data-track-wrap]")[0],
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: SCRUB,
            invalidateOnRefresh: true,
          },
        });

        q("[data-panel]").forEach((panel) => {
          gsap.fromTo(
            panel.querySelector("[data-panel-img]"),
            { xPercent: -9 },
            {
              xPercent: 9,
              ease: "none",
              scrollTrigger: { trigger: panel, containerAnimation: walk, start: "left right", end: "right left", scrub: true },
            },
          );
          gsap.from(panel.querySelectorAll("[data-panel-text] > *"), {
            y: 50,
            opacity: 0,
            duration: 1.1,
            stagger: 0.09,
            ease: EASE.soft,
            scrollTrigger: { trigger: panel, containerAnimation: walk, start: "left 72%", toggleActions: "play none none reverse" },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="craft" data-chapter="craft" className="relative bg-forest text-cream">
      <div aria-hidden className="moss-texture absolute inset-0 opacity-50" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-night via-forest/60 to-forest" />

      <header className="relative px-6 pb-[6vh] pt-[26vh] md:px-16">
        <Reveal as="p" split="words" className="kicker text-gold">
          {craft.kicker}
        </Reveal>
        <Reveal as="h2" split="chars" className="display mt-6 text-[clamp(3.2rem,10vw,9rem)] text-balance">
          {craft.heading}
        </Reveal>
        <Reveal className="mt-8 max-w-[46ch] text-lg leading-relaxed text-cream/80 md:text-xl">{craft.intro}</Reveal>
      </header>

      <div data-track-wrap className="relative h-[100svh] overflow-hidden motion-reduce:h-auto">
        <div
          data-track
          className="flex h-full w-max items-center gap-[8vw] pl-6 pr-[12vw] md:gap-[6vw] md:pl-16 motion-reduce:w-auto motion-reduce:flex-col motion-reduce:py-16"
        >
          {craft.steps.map((step) => (
            <article
              key={step.n}
              data-panel
              className="relative flex h-[82svh] w-[84vw] shrink-0 flex-col gap-6 md:h-[72vh] md:w-[64vw] md:flex-row md:items-end md:gap-12"
            >
              <div className="arch relative min-h-0 w-full flex-1 overflow-hidden bg-moss md:h-full md:w-[48%] md:flex-none">
                <Image
                  data-panel-img
                  src={step.photo.src}
                  alt={step.photo.alt}
                  fill
                  sizes="(min-width: 768px) 32vw, 84vw"
                  className="scale-[1.22] object-cover"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-night/40 to-transparent" />
              </div>
              <div data-panel-text className="md:flex-1 md:pb-8">
                <span
                  className="display block text-[5.5rem] leading-none text-transparent md:text-[10rem]"
                  style={{ WebkitTextStroke: "1px rgba(233,201,121,0.65)" }}
                >
                  {step.n}
                </span>
                <h3 className="display mt-2 text-5xl md:text-7xl">{step.title}</h3>
                <p className="mt-4 max-w-[34ch] text-base leading-relaxed text-cream/80 md:text-lg">{step.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
