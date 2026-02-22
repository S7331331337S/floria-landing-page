"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";

const BOUQUETS = [
    {
        id: 1,
        title: "Ethereal Greens",
        price: "$120",
        image: "/bouquet-1.webp",
        aspect: "aspect-[3/4]",
        offset: "md:mt-0",
    },
    {
        id: 2,
        title: "Midnight Orchid",
        price: "$185",
        image: "/bouquet-2.webp",
        aspect: "aspect-square",
        offset: "md:mt-24", // Asymmetric offset
    },
    {
        id: 3,
        title: "Blush Peony Structura",
        price: "$95",
        image: "/bouquet-3.webp",
        aspect: "aspect-[4/5]",
        offset: "md:mt-12",
    }
];

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

                    <motion.a
                        href="/shop"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="group flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-foreground hover:text-accent-foreground transition-colors"
                    >
                        <span>View Complete Archive</span>
                        <div className="p-2 bg-muted rounded-full group-hover:bg-accent group-hover:-translate-y-1 group-hover:translate-x-1 transition-all">
                            <ArrowUpRight weight="bold" />
                        </div>
                    </motion.a>
                </div>

                {/* Asymmetric CSS Grid (Not 3 equal columns!) */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
                    {BOUQUETS.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: index * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className={`md:col-span-4 group cursor-pointer ${item.offset}`}
                        >
                            <div className={`w-full relative overflow-hidden rounded-[2rem] mb-6 ${item.aspect}`}>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />

                                {/* Add to cart hover overlay */}
                                <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out flex justify-center">
                                    <span className="bg-white/90 backdrop-blur-md text-zinc-900 text-sm font-semibold px-6 py-3 rounded-full shadow-lg">
                                        Quick Add
                                    </span>
                                </div>
                            </div>

                            <div className="flex justify-between items-start">
                                <h3 className="text-xl font-medium tracking-tight text-foreground group-hover:text-accent-foreground transition-colors">
                                    {item.title}
                                </h3>
                                <span className="text-lg text-muted-foreground">{item.price}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
