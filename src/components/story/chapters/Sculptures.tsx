"use client";

import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import { sculptures } from "@/content/story";
import type { CollectionPiece } from "@/lib/collection";
import { ScrubWords } from "../fx/ScrubWords";
import { useParallax } from "../fx/useParallax";
import { Foliage, type LeafPlacement } from "../flora/Foliage";

/*
 * III · LIVING SCULPTURES
 * Daylight. Heather's statement stays centred while the plants float past
 * at different depths. Each word lights up as you scroll.
 */

// where each plant floats: % of the (tall) section, width in vw, parallax speed
const FLOAT = [
  { x: 5, y: 6, w: 20, wm: 36, speed: 0.5, shape: "arch" },
  { x: 74, y: 14, w: 17, wm: 32, speed: 1.1, shape: "round" },
  { x: 9, y: 44, w: 15, wm: 28, speed: 0.25, shape: "round" },
  { x: 71, y: 52, w: 22, wm: 38, speed: 0.8, shape: "arch" },
  { x: 36, y: 78, w: 18, wm: 34, speed: 1.3, shape: "arch" },
];

// herbarium plates sit further back: slower, softer, slightly turned
const PLATE_SLOTS = [
  { x: 82, y: 1, w: 13, wm: 26, speed: -0.2, r: 4 },
  { x: 3, y: 27, w: 12, wm: 24, speed: -0.35, r: -5 },
  { x: 84, y: 62, w: 12, wm: 24, speed: -0.15, r: 3 },
  { x: 24, y: 88, w: 12, wm: 24, speed: -0.3, r: -4 },
];

const LEAVES: LeafPlacement[] = [
  { kind: "fern", x: -6, y: 20, w: 18, r: 40, speed: 1.6, dew: 3, mobile: false },
  { kind: "calathea", x: 88, y: 36, w: 14, r: -30, speed: 1.9, dew: 4 },
  { kind: "monstera", x: 84, y: 76, w: 20, r: -20, speed: 1.4, dew: 5, mobile: false },
  { kind: "anthurium", x: 2, y: 70, w: 13, r: 24, speed: 2.1, dew: 3 },
];

export function Sculptures({ pieces = sculptures.plants }: { pieces?: CollectionPiece[] }) {
  const root = useRef<HTMLElement>(null);
  useParallax(root);

  return (
    <section
      ref={root}
      id="sculptures"
      data-chapter="sculptures"
      data-scrub-root
      data-parallax-root
      className="paper-texture relative h-[280vh] overflow-x-clip text-ink"
    >
      {/* dusk-to-daylight blend from the moss chapter above */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-[45vh] bg-gradient-to-b from-forest via-forest/40 to-transparent" />

      <div className="sticky top-0 z-10 flex h-[100svh] items-center justify-center px-6">
        <div className="max-w-5xl text-center">
          <p className="kicker mb-8 text-fern">{sculptures.kicker}</p>
          <ScrubWords
            text={sculptures.statement}
            start="top top"
            end="bottom bottom"
            className="display text-[clamp(2.1rem,5.4vw,5.2rem)] leading-[1.04] text-balance"
          />
        </div>
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        {sculptures.herbarium.map((plate, i) => {
          const p = PLATE_SLOTS[i % PLATE_SLOTS.length];
          return (
            <figure
              key={plate.src}
              data-speed={p.speed}
              className="leaf-slot absolute opacity-75"
              style={{ left: `${p.x}%`, top: `${p.y}%`, "--w": `${p.w}vw`, "--wm": `${p.wm}vw` } as CSSProperties}
            >
              <div style={{ rotate: `${p.r}deg` }} className="shadow-[0_24px_50px_-24px_rgba(60,45,20,0.45)]">
                <Image src={plate.src} alt="" width={1800} height={2400} sizes="(min-width: 768px) 16vw, 30vw" className="h-auto w-full" />
              </div>
              <figcaption className="display mt-2 text-center text-sm italic tracking-wide text-ink/50">{plate.caption}</figcaption>
            </figure>
          );
        })}
      </div>

      <div className="pointer-events-none absolute inset-0 z-20">
        {pieces.map((plant, i) => {
          const f = FLOAT[i % FLOAT.length];
          return (
            <figure
              key={plant.src}
              data-speed={f.speed}
              className="leaf-slot pointer-events-auto absolute"
              style={{ left: `${f.x}%`, top: `${f.y}%`, "--w": `${f.w}vw`, "--wm": `${f.wm}vw` } as CSSProperties}
            >
              <div
                className={`group relative overflow-hidden shadow-[0_30px_60px_-20px_rgba(23,32,26,0.45)] ${
                  f.shape === "arch" ? "arch aspect-[3/4]" : "aspect-square rounded-full"
                }`}
              >
                <Image
                  src={plant.src}
                  alt={plant.alt}
                  fill
                  sizes="(min-width: 768px) 22vw, 38vw"
                  className="object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-110"
                />
              </div>
              <figcaption className="display mt-3 text-center text-lg italic text-ink/70 md:text-xl">
                {plant.href ? (
                  <a href={plant.href} className="transition hover:text-fern">
                    {plant.name}
                  </a>
                ) : (
                  plant.name
                )}
              </figcaption>
            </figure>
          );
        })}
      </div>

      <div className="absolute inset-0 z-30">
        <Foliage leaves={LEAVES} />
      </div>
    </section>
  );
}
