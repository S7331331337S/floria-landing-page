"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero() {
    return (
        <section className="relative min-h-[100dvh] w-full flex items-center pt-24 pb-12 bg-black z-20">

            {/* Full width dark background image (this needs its own overflow hidden so it stays put) */}
            <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                <img
                    src="/hero-bg.webp"
                    alt="Dark botanical background"
                    className="w-full h-full object-cover opacity-30"
                />
                {/* Darker gradient overlay to ensure text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />

                {/* Bottom gradient fade into the next section's background */}
                <div className="absolute bottom-0 inset-x-0 h-32 md:h-48 bg-gradient-to-t from-background to-transparent pointer-events-none" />
            </div>

            {/* Right Aligned Transparent Accent Image, pushed down so it clears navbar and overlaps to section 2 */}
            <div className="absolute top-24 md:top-32 right-0 h-[100dvh] w-[90vw] md:w-[60vw] flex items-center justify-end pointer-events-none z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotate: -85 }}
                    animate={{ opacity: 1, scale: 1.1, rotate: -90 }}
                    whileHover={{ scale: 1.15, rotate: -92, filter: "brightness(0.9) contrast(1.1)" }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                    className="relative h-[120vh] aspect-square origin-center translate-x-1/4 pointer-events-auto cursor-pointer"
                >
                    <img
                        src="/hero-accent.webp"
                        alt="Floating structural flora"
                        className="w-full h-full object-contain drop-shadow-2xl brightness-75 transition-all duration-700 hover:brightness-90"
                    />
                </motion.div>
            </div>

            <div className="relative w-full max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center z-20 pointer-events-none">

                {/* Text Content - Left Aligned */}
                <div className="md:col-span-7 flex flex-col items-start pointer-events-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full border border-white/20 bg-white/10 text-white text-xs font-semibold tracking-widest uppercase mb-6 backdrop-blur-sm">
                            Living Compositions
                        </span>

                        {/* Text forced to white for dark background visibility */}
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] text-white mb-8 text-balance">
                            Botanic<br />
                            <span className="text-white/70 italic font-normal">Architecture.</span>
                        </h1>
                        <p className="text-lg text-white/80 leading-relaxed max-w-[40ch] mb-10 text-balance">
                            We design spaces and moments using rare, sculptural flora. Rejecting the generic bouquet for atmospheric living sculptures.
                        </p>

                        <div className="flex flex-wrap items-center gap-4">
                            <Button variant="primary" magnetic className="h-14 px-8 text-base bg-white text-black hover:bg-white/90">
                                View Collections
                            </Button>
                            <Button variant="ghost" magnetic className="h-14 px-8 text-base text-white hover:bg-white/10">
                                Our Manifesto
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
