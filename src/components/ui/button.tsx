"use client";

import { motion, useMotionValue, useSpring, type HTMLMotionProps } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "secondary" | "glass" | "ghost";
    magnetic?: boolean;
}

export function Button({
    className,
    variant = "primary",
    magnetic = false,
    children,
    ...props
}: ButtonProps) {
    const ref = useRef<HTMLButtonElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!magnetic || !ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const center = { x: left + width / 2, y: top + height / 2 };
        // Pull towards mouse (max 15px)
        x.set((e.clientX - center.x) * 0.2);
        y.set((e.clientY - center.y) * 0.2);
    };

    const handleMouseLeave = () => {
        if (!magnetic) return;
        x.set(0);
        y.set(0);
    };

    const baseStyles = "relative inline-flex items-center justify-center font-medium overflow-hidden rounded-full transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none";
    const sizeStyles = "px-6 py-3 text-sm tracking-tight";

    const variants = {
        primary: "bg-foreground text-background hover:bg-foreground/90",
        secondary: "bg-accent text-accent-foreground hover:bg-accent/80",
        glass: "bg-white/10 backdrop-blur-md border border-white/20 text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] hover:bg-white/20",
        ghost: "bg-transparent text-foreground hover:bg-black/5 dark:hover:bg-white/10",
    };

    return (
        <motion.button
            ref={ref}
            style={magnetic ? { x: springX, y: springY } : {}}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={cn(baseStyles, sizeStyles, variants[variant], className)}
            {...props}
        >
            {/* Inner subtle text translation effect can go here, but keeping it simple for now */}
            <span className="relative z-10 flex items-center gap-2">
                {children as React.ReactNode}
            </span>
        </motion.button>
    );
}
