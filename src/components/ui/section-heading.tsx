"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
    title: string;
    lead?: string;
    align?: "left" | "center";
    tone?: "light" | "dark";
    className?: string;
}

/** Shared section header so type scale and rhythm stay identical across routes. */
export function SectionHeading({
    title,
    lead,
    align = "left",
    tone = "light",
    className,
}: SectionHeadingProps) {
    const centered = align === "center";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`flex flex-col ${centered ? "items-center text-center mx-auto" : "items-start"} ${className ?? ""}`}
        >
            <h2
                className={`text-4xl md:text-5xl font-bold tracking-tight mb-4 ${tone === "dark" ? "text-white" : "text-foreground"
                    }`}
            >
                {title}
            </h2>
            {lead && (
                <p
                    className={`max-w-[46ch] leading-relaxed ${tone === "dark" ? "text-zinc-400" : "text-muted-foreground"
                        }`}
                >
                    {lead}
                </p>
            )}
        </motion.div>
    );
}
