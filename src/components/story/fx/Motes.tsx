"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** particles per 100k px² of canvas */
  density?: number;
  color?: string;
  className?: string;
};

/**
 * Floating pollen and dew-light drifting upward. A tiny canvas loop that
 * pauses whenever it is off screen or the visitor prefers reduced motion.
 */
export function Motes({ density = 3, color = "233,201,121", className = "" }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    type P = { x: number; y: number; r: number; vx: number; vy: number; a: number; ph: number };
    let parts: P[] = [];
    let w = 0, h = 0, raf = 0, visible = false;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(((w * h) / 100000) * density);
      parts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.6 + Math.random() * 2.2,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -0.08 - Math.random() * 0.25,
        a: 0.25 + Math.random() * 0.6,
        ph: Math.random() * Math.PI * 2,
      }));
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        if (!reduce) {
          p.x += p.vx + Math.sin(t / 2400 + p.ph) * 0.15;
          p.y += p.vy;
          if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        }
        const flicker = 0.6 + 0.4 * Math.sin(t / 900 + p.ph);
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        g.addColorStop(0, `rgba(${color},${p.a * flicker})`);
        g.addColorStop(1, `rgba(${color},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fill();
      }
      if (visible && !reduce) raf = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(draw);
    });
    const ro = new ResizeObserver(() => { resize(); draw(performance.now()); });
    resize();
    io.observe(canvas);
    ro.observe(canvas);
    return () => { io.disconnect(); ro.disconnect(); cancelAnimationFrame(raf); };
  }, [density, color]);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
