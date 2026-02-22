"use client";

import { motion } from "framer-motion";

const STEPS = [
    {
        num: "01",
        title: "Consultation & Vision",
        desc: "We explore your aesthetic, the spatial architecture, and the invisible emotional tone you wish to set.",
    },
    {
        num: "02",
        title: "Botanical Sourcing",
        desc: "Procuring rare, seasonal stems from strictly local growers and specialized independent farms.",
    },
    {
        num: "03",
        title: "Structural Design",
        desc: "Applying Ikebana principles and modern proportions to build a living sculpture that breathes.",
    }
];

export function Process() {
    return (
        <section id="process" className="py-24 md:py-40 bg-zinc-950 text-zinc-50 relative overflow-x-clip z-20">
            {/* Decorative dark background element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

            {/* d1 image far left - completely un-cropped and pinned to the left edge of the screen */}
            <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -left-10 md:-left-32 -top-10 md:-top-32 w-[80%] md:w-[55vw] max-w-[1000px] z-0 pointer-events-none"
                style={{
                    WebkitMaskImage: 'radial-gradient(circle at center left, black 30%, transparent 100%)',
                    maskImage: 'radial-gradient(circle at center left, black 30%, transparent 100%)'
                }}
            >
                <img
                    src="/d1.webp"
                    alt="Process Flowers"
                    className="w-full h-auto object-contain object-left mix-blend-lighten opacity-90"
                />
            </motion.div>

            <div className="w-full max-w-7xl mx-auto px-4 md:px-8 relative z-10">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                    {/* Left Column: sticky header */}
                    <div className="lg:sticky lg:top-40 self-start h-fit relative">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 relative z-10 drop-shadow-2xl shadow-black"
                        >
                            The Architecture<br />of Nature.
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-zinc-400 text-lg max-w-[40ch]"
                        >
                            Our process is a deliberate rejection of mass-market floristry. Every commission is treated as a site-specific installation.
                        </motion.p>
                    </div>

                    {/* Right Column: Zig-Zag / Vertical Staggered List */}
                    <div className="flex flex-col gap-12 md:gap-24">
                        {STEPS.map((step, index) => (
                            <motion.div
                                key={step.num}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-20%" }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className={`relative pl-8 md:pl-16 border-l border-white/10 ${index % 2 !== 0 ? 'md:ml-24' : ''}`}
                            >
                                {/* Number indicator */}
                                <div className="absolute top-0 -left-[18px] md:-left-[24px]">
                                    <div className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-xs md:text-sm font-mono text-zinc-400">
                                        {step.num}
                                    </div>
                                </div>

                                <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-4 text-white">
                                    {step.title}
                                </h3>
                                <p className="text-zinc-400 leading-relaxed max-w-[45ch]">
                                    {step.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
