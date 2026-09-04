"use client";

import { motion } from "framer-motion";

interface PageHeroProps {
    eyebrow: string;
    title: React.ReactNode;
    lead?: string;
    image?: string;
    align?: "left" | "center";
    children?: React.ReactNode;
}

/**
 * Dark banner used at the top of every interior route.
 * Keeps the fixed navbar legible on pages that would otherwise open on a light background.
 */
export function PageHero({
    eyebrow,
    title,
    lead,
    image = "/hero-bg.webp",
    align = "left",
    children,
}: PageHeroProps) {
    const centered = align === "center";

    return (
        <section className="relative w-full bg-black pt-40 pb-20 md:pt-56 md:pb-28 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img
                    src={image}
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-cover opacity-25"
                />
                <div
                    className={`absolute inset-0 ${centered
                        ? "bg-gradient-to-b from-black/80 via-black/60 to-black/80"
                        : "bg-gradient-to-r from-black via-black/80 to-black/30"
                        }`}
                />
                <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className={`flex flex-col ${centered ? "items-center text-center mx-auto" : "items-start"}`}
                >
                    <span className="inline-block py-1 px-3 rounded-full border border-white/20 bg-white/10 text-white text-xs font-semibold tracking-widest uppercase mb-6 backdrop-blur-sm">
                        {eyebrow}
                    </span>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.95] text-white text-balance max-w-[16ch]">
                        {title}
                    </h1>

                    {lead && (
                        <p className="text-lg text-white/70 leading-relaxed max-w-[46ch] mt-8 text-balance">
                            {lead}
                        </p>
                    )}

                    {children && <div className="mt-10">{children}</div>}
                </motion.div>
            </div>
        </section>
    );
}
