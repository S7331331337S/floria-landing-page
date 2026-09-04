"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plant, List, X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { label: "Shop", href: "#shop" },
        { label: "Weddings", href: "#weddings" },
        { label: "Process", href: "#process" },
        { label: "Journal", href: "#journal" },
    ];

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 flex justify-center px-4 md:px-8 ${isScrolled ? "py-4" : "py-8"
                    }`}
            >
                <div
                    className={`w-full max-w-7xl flex items-center justify-between rounded-full transition-all duration-500 ${isScrolled ? "bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border border-black/5 dark:border-white/10 px-6 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)]" : "px-2 py-2"
                        }`}
                >
                    {/* Logo (Asymmetric vibe - kept very stark) */}
                    <div className="flex items-center gap-2 group cursor-pointer">
                        <Plant weight="duotone" className="w-8 h-8 text-accent-foreground group-hover:rotate-12 transition-transform duration-500" />
                        <span className="text-xl font-bold tracking-tighter">La Casa Del Amor.</span>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    {/* CTA */}
                    <div className="hidden md:block">
                        <Button variant="primary" magnetic className="rounded-full">
                            Order Custom
                        </Button>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden p-2 text-foreground"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X weight="bold" className="w-6 h-6" /> : <List weight="bold" className="w-6 h-6" />}
                    </button>
                </div>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-background pt-32 px-6 md:hidden"
                    >
                        <div className="flex flex-col gap-6 text-2xl font-medium tracking-tighter">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.label}
                                    href={link.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="hover:text-accent-foreground transition-colors"
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="mt-8"
                            >
                                <Button className="w-full h-14 text-lg">Order Custom</Button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
