"use client";

import { motion } from "framer-motion";
import { Leaf } from "@phosphor-icons/react";

export function OurPromise() {
    return (
        <section id="journal" className="py-32 md:py-48 bg-gradient-to-b from-[#0a0a0a] to-black relative overflow-hidden">

            {/* Background image covering the section but pushed down to avoid top cropping */}
            <div className="absolute inset-x-0 top-32 md:top-48 bottom-0 z-0 flex items-start justify-center">
                <img
                    src="/d2.webp"
                    alt="Floral workshop background"
                    className="w-[90%] md:w-[70%] max-w-5xl h-auto object-contain opacity-40 mix-blend-screen"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
            </div>

            <div className="w-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-center justify-center text-center relative z-10">

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-12 text-accent-foreground/50"
                >
                    <Leaf weight="duotone" className="w-16 h-16 md:w-20 md:h-20" />
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter max-w-[20ch] leading-tight mb-8"
                >
                    Never a generic arrangement.
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-lg md:text-xl text-muted-foreground w-full max-w-[45ch] leading-relaxed mx-auto text-balance"
                >
                    La Casa Del Amor works exclusively with independent growers within a 50-mile radius, ensuring every stem possesses a wild, architectural intent that mass floristry strips away.
                </motion.p>
            </div>

        </section>
    );
}
