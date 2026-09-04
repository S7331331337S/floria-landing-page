"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COLLECTION_CATEGORIES, COLLECTION_ITEMS } from "@/lib/content";
import type { CollectionCategory } from "@/lib/content";

type Filter = CollectionCategory | "All";

const FILTERS: Filter[] = ["All", ...COLLECTION_CATEGORIES];

export function CollectionsGrid() {
    const [active, setActive] = useState<Filter>("All");

    const items =
        active === "All"
            ? COLLECTION_ITEMS
            : COLLECTION_ITEMS.filter((item) => item.category === active);

    return (
        <div>
            {/* Filters */}
            <div className="flex flex-wrap gap-2 md:gap-3 mb-12 md:mb-16">
                {FILTERS.map((filter) => {
                    const isActive = filter === active;
                    return (
                        <button
                            key={filter}
                            type="button"
                            onClick={() => setActive(filter)}
                            aria-pressed={isActive}
                            className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 ${isActive
                                ? "bg-foreground text-background border-foreground"
                                : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                                }`}
                        >
                            {filter}
                        </button>
                    );
                })}
            </div>

            {/* Results */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-x-8 md:gap-y-16">
                <AnimatePresence mode="popLayout">
                    {items.map((item, index) => (
                        <motion.article
                            key={item.slug}
                            id={item.slug}
                            layout
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            // Exit skips the entry stagger so filtering feels immediate.
                            exit={{ opacity: 0, y: -10, transition: { duration: 0.18, delay: 0 } }}
                            transition={{
                                duration: 0.5,
                                delay: Math.min(index * 0.06, 0.3),
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className={`group scroll-mt-32 ${index % 3 === 1 ? "md:col-span-5" : "md:col-span-7"
                                }`}
                        >
                            <div className="relative overflow-hidden rounded-[2rem] mb-6 aspect-[4/3]">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[inherit] pointer-events-none" />
                                <span className="absolute top-5 left-5 rounded-full bg-white/85 backdrop-blur-md px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-zinc-900">
                                    {item.category}
                                </span>
                            </div>

                            <div className="flex items-start justify-between gap-6 mb-3">
                                <h3 className="text-2xl md:text-3xl font-medium tracking-tight">{item.title}</h3>
                                <span className="text-lg text-muted-foreground shrink-0 pt-1">{item.price}</span>
                            </div>

                            <p className="text-foreground/80 mb-3 text-lg leading-snug max-w-[42ch]">{item.lead}</p>
                            <p className="text-muted-foreground leading-relaxed max-w-[52ch] mb-6">{item.description}</p>

                            <ul className="flex flex-wrap gap-2">
                                {item.stems.map((stem) => (
                                    <li
                                        key={stem}
                                        className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
                                    >
                                        {stem}
                                    </li>
                                ))}
                            </ul>
                        </motion.article>
                    ))}
                </AnimatePresence>
            </motion.div>

            {items.length === 0 && (
                <p className="text-muted-foreground py-16">
                    Nothing in this category right now — the season moves faster than the catalogue.
                </p>
            )}
        </div>
    );
}
