"use client";

import { motion, type Variants } from "framer-motion";

export const FADE_UP_ANIMATION_VARIANTS: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
};

export function FadeUpStagger({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
                hidden: {},
                show: {
                    transition: {
                        staggerChildren: 0.15,
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function FadeUpItem({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className={className}>
            {children}
        </motion.div>
    );
}

export function ParallaxImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
    // A simplified parallax class setup (real parallax requires useScroll, 
    // but for reliability we default to a standard clean reveal unless complex GSAP is requested)
    return (
        <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className={`overflow-hidden ${className || ''}`}
        >
            <img src={src} alt={alt} className="w-full h-full object-cover" />
        </motion.div>
    );
}
