"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "@phosphor-icons/react";

export function NewsletterCTA() {
    return (
        <section className="px-4 md:px-8 py-12 md:py-24 bg-gradient-to-b from-black to-background">
            <div className="w-full max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full rounded-[3rem] p-12 md:p-24 flex flex-col items-center justify-center text-center relative overflow-hidden isolate shadow-2xl"
                >
                    {/* New Custom Background Image */}
                    <img
                        src="/661a0f84-d9cb-4189-9c93-a023dfc18423.webp"
                        alt="Newsletter Background"
                        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
                    />

                    {/* Dark gradient overlay to ensure text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 z-0 pointer-events-none" />

                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6 z-10">
                        Join La Casa Del Amor.
                    </h2>
                    <p className="text-lg text-white/80 max-w-[35ch] mb-12 z-10 text-balance">
                        Recieve first look at our new releases, seasonal offerings, and Garden parties and nothing else.
                    </p>

                    <form className="w-full max-w-md relative z-10 flex flex-col sm:flex-row gap-3">
                        {/* High contrast input: dark translucent back, crisp white text */}
                        <input
                            type="email"
                            placeholder="Enter your email address..."
                            className="flex-1 bg-black/20 backdrop-blur-md border border-white/20 text-white placeholder:text-white/70 rounded-full px-6 py-4 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all h-14"
                            required
                        />
                        <Button variant="primary" className="h-14 px-8 rounded-full sm:w-auto w-full group bg-white text-emerald-950 hover:bg-stone-100 border-0">
                            <span>Subscribe</span>
                            <ArrowRight weight="bold" className="group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </form>

                </motion.div>
            </div>
        </section>
    );
}
