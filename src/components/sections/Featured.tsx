"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { COLLECTION_ITEMS } from "@/lib/content";

// The three signature arrangements, pulled from the shared catalogue.
const BOUQUETS = COLLECTION_ITEMS.filter(
    (item) => item.category === "Arrangements"
).slice(0, 3);

const OFFSETS = ["md:mt-0", "md:mt-24", "md:mt-12"];

export function Featured() {
    return (
        <section id="shop" className="py-24 md:py-32 bg-background relative z-10">
            <div className="w-full max-w-7xl mx-auto px-4 md:px-8">

                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Curated Assemblages.</h2>
                        <p className="text-muted-foreground max-w-[40ch]">
                            Living art pieces designed for atmospheric presence. Not just flowers, but structural botanical statements.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <Link
                            href="/collections"
                            className="group flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-foreground hover:text-accent dark:hover:text-accent-bright transition-colors"
                        >
                            <span>View Complete Archive</span>
                            <div className="p-2 bg-muted rounded-full group-hover:bg-accent group-hover:text-accent-foreground group-hover:-translate-y-1 group-hover:translate-x-1 transition-all">
                                <ArrowUpRight weight="bold" />
                            </div>
                        </Link>
                    </motion.div>
                </div>

                {/* Asymmetric CSS Grid (Not 3 equal columns!) */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
                    {BOUQUETS.map((item, index) => (
                        <motion.div
                            key={item.slug}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: index * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className={`md:col-span-4 group ${OFFSETS[index] ?? ""}`}
                        >
                            <Link href={`/collections#${item.slug}`} className="block">
                                <div className={`w-full relative overflow-hidden rounded-[2rem] mb-6 ${item.aspect}`}>
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />

                                    <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out flex justify-center">
                                        <span className="bg-white/90 backdrop-blur-md text-zinc-900 text-sm font-semibold px-6 py-3 rounded-full shadow-lg">
                                            View details
                                        </span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-start gap-4">
                                    <div>
                                        <h3 className="text-xl font-medium tracking-tight text-foreground group-hover:text-accent dark:hover:text-accent-bright transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground mt-1 max-w-[32ch]">{item.lead}</p>
                                    </div>
                                    <span className="text-lg text-muted-foreground shrink-0">{item.price}</span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
