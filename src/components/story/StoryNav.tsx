"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { chapters, site } from "@/content/story";
import { scrollToTarget } from "./fx/SmoothScroll";

/**
 * Minimal floating header, a chapter rail on desktop, and a thin progress
 * line on phones. Rendered after the chapters so its triggers measure the
 * page once every pinned scene has claimed its scroll length.
 */
export function StoryNav() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string>(chapters[0].id);

  useGSAP(
    () => {
      chapters.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;
        // a pinned section's scroll length lives on its pin-spacer
        const target = el.parentElement?.classList.contains("pin-spacer") ? el.parentElement : el;
        ScrollTrigger.create({
          trigger: target,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => self.isActive && setActive(id),
        });
      });

      gsap.to("[data-progress]", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: document.documentElement, start: 0, end: "max", scrub: 0.3 },
      });

      // fade the fixed bars themselves: transforming their wrapper would un-fix them
      gsap.from(root.current?.querySelectorAll("header, nav") ?? [], { opacity: 0, duration: 1.4, delay: 2.2, ease: "power3.out" });
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 mix-blend-difference md:px-10 md:py-6">
        <button
          type="button"
          onClick={() => scrollToTarget(0)}
          className="display text-xl italic text-white md:text-2xl"
          aria-label="Back to the beginning"
        >
          {site.name}
        </button>
        <a
          href={site.shopUrl}
          className="kicker rounded-full border border-white/50 px-4 py-2 text-[0.65rem] text-white transition hover:bg-white hover:text-black"
        >
          Shop
        </a>
      </header>

      <div className="fixed inset-x-0 top-0 z-50 h-[2px] md:hidden">
        <div data-progress className="h-full origin-left scale-x-0 bg-gold" />
      </div>

      <nav aria-label="Chapters" className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 mix-blend-difference md:block">
        <ul className="flex flex-col items-end gap-4">
          {chapters.map(({ id, label }) => {
            const on = id === active;
            return (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => scrollToTarget(`#${id}`)}
                  className="group flex items-center gap-3 text-white"
                  aria-current={on ? "step" : undefined}
                >
                  <span
                    className={`kicker text-[0.6rem] transition-all duration-500 ${
                      on ? "opacity-90" : "translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-60"
                    }`}
                  >
                    {label}
                  </span>
                  <span className={`block h-px bg-white transition-all duration-500 ${on ? "w-10" : "w-4 opacity-50 group-hover:w-6"}`} />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
