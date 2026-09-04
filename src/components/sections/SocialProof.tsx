"use client";

import { motion } from "framer-motion";
import { Star, Quotes } from "@phosphor-icons/react";

const REVIEWS = [
    {
        text: "La Casa Del Amor totally transformed our gallery space. It didn't look like flowers; it looked like living art.",
        author: "Amara Osei",
        role: "Gallery Director",
        colSpan: "md:col-span-4",
        offset: "md:mt-12",
    },
    {
        text: "Their structural approach to botanicals is unparalleled in the city. Not just a bouquet, an architectural statement.",
        author: "Markus Vance",
        role: "Product Lead, Aethos",
        colSpan: "md:col-span-5",
        offset: "md:-mt-8",
    },
    {
        text: "I've never experienced an installation so deeply attuned to natural workflows. It responds with quiet intelligence.",
        author: "Julian Thorne",
        role: "Founder, Synthetix",
        colSpan: "md:col-span-5 md:col-start-2",
        offset: "md:mt-0",
    },
    {
        text: "Elegant, fluid, and brilliantly executed. It stands out by whispering instead of shouting. A profound paradigm shift.",
        author: "Elena Rostova",
        role: "Tech Curator",
        colSpan: "md:col-span-6 md:col-start-7",
        offset: "md:-mt-24",
    },
    {
        text: "The attention to the smallest interactions makes every room feel rewarding. The performance is staggering, yet serene.",
        author: "David Kim",
        role: "Systems Engineer",
        colSpan: "md:col-span-5 md:col-start-8",
        offset: "md:-mt-12",
        align: "center",
    },
];

export function SocialProof() {
    return (
        <section className="py-32 md:py-48 bg-gradient-to-b from-zinc-950 to-[#0a0a0a] relative overflow-hidden flex flex-col items-center">

            {/* Header / Title */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-24 text-center z-10"
            >
                <h2 className="text-5xl md:text-7xl font-serif italic text-white mb-6">Clarity.</h2>
            </motion.div>

            {/* Scattered Grid */}
            <div className="w-full max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
                    {REVIEWS.map((review, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className={`
                                relative p-8 md:p-10 rounded-3xl bg-zinc-900/30 backdrop-blur-sm 
                                border border-white/5 hover:border-white/10 hover:bg-zinc-900/50 
                                transition-colors group flex flex-col justify-between
                                ${review.colSpan} ${review.offset}
                            `}
                        >
                            {/* Quote Icon Background */}
                            <Quotes weight="fill" className="absolute top-6 left-6 w-12 h-12 text-white/5 group-hover:text-white/10 transition-colors" />

                            <div className={`relative z-10 flex flex-col h-full ${review.align === 'center' ? 'items-center text-center' : ''}`}>
                                {/* Stars */}
                                <div className="flex gap-1 mb-8 text-zinc-400">
                                    {[...Array(5)].map((_, j) => (
                                        <Star key={j} weight="fill" className="w-4 h-4" />
                                    ))}
                                </div>

                                {/* Review Text */}
                                <p className="text-zinc-300 text-lg md:text-xl leading-relaxed mb-12 font-medium">
                                    {review.text}
                                </p>

                                {/* Author */}
                                <div className={`flex items-center mt-auto ${review.align === 'center' ? 'flex-col gap-2' : 'gap-4'}`}>
                                    {/* Placeholder Avatar */}
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 border border-white/10 flex items-center justify-center text-xs font-medium text-white shadow-inner shrink-0">
                                        {review.author.charAt(0)}
                                    </div>
                                    <div className={`flex flex-col ${review.align === 'center' ? 'items-center' : ''}`}>
                                        <span className="text-sm font-semibold text-white">{review.author}</span>
                                        <span className="text-xs text-zinc-500 uppercase tracking-wider mt-0.5">{review.role}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Radial glow for depth */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

        </section>
    );
}
