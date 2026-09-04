"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const BENTOS = [
    {
        id: 1,
        title: "The Wedding Archive",
        href: "/weddings",
        desc: "Sculptural centerpieces and avant-garde bridal arrangements.",
        colSpan: "md:col-span-8",
        image: "/collection-1.webp",
    },
    {
        id: 2,
        title: "Weekly Studio Subs",
        href: "/collections#weekly-studio-subscription",
        desc: "Seasonal rotations delivered.",
        colSpan: "md:col-span-4",
        image: "/collection-2.webp",
    },
    {
        id: 3,
        title: "Dried & Preserved",
        href: "/collections#dried-and-preserved",
        desc: "Eternal structures.",
        colSpan: "md:col-span-4",
        image: "/collection-3.webp",
    },
    {
        id: 4,
        title: "Corporate Installs",
        href: "/collections#corporate-installations",
        desc: "Atmospheric lobbying.",
        colSpan: "md:col-span-4",
        image: "/collection-4.webp",
    },
    {
        id: 5,
        title: "Workshops",
        href: "/collections#structure-workshops",
        desc: "Master the structure of nature.",
        colSpan: "md:col-span-4",
        image: "/collection-5.webp",
    }
];

export function Collections() {
    return (
        <section id="collections" className="py-24 md:py-32 bg-background relative">
            <div className="w-full max-w-7xl mx-auto px-4 md:px-8">

                <div className="mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">The Archives.</h2>
                    <p className="text-muted-foreground max-w-[40ch] mb-8">
                        Explore our categorical studies in floral architecture.
                    </p>
                    <Link
                        href="/collections"
                        className="text-sm font-semibold uppercase tracking-widest text-accent dark:text-accent-bright hover:text-foreground transition-colors"
                    >
                        Browse all collections
                    </Link>
                </div>

                {/* Bento Grid layout */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-[300px] md:auto-rows-[400px]">
                    {BENTOS.map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className={`relative overflow-hidden rounded-[2.5rem] group ${item.colSpan}`}
                        >
                            <Link href={item.href} className="block w-full h-full">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[inherit] pointer-events-none" />

                            <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full flex flex-col justify-end">
                                <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">{item.title}</h3>
                                <p className="text-zinc-300 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 translate-y-4 group-hover:translate-y-0 ease-out">{item.desc}</p>
                            </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
