"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Plant, List, X } from "@phosphor-icons/react";
import { NAV_LINKS, SITE } from "@/lib/content";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll behind the mobile sheet.
    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileMenuOpen]);

    const isActive = (href: string) =>
        pathname === href || pathname.startsWith(`${href}/`);

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
                    className={`w-full max-w-7xl flex items-center justify-between rounded-full transition-all duration-500 ${isScrolled
                        ? "bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border border-black/5 dark:border-white/10 px-6 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                        : "px-2 py-2"
                        }`}
                >
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group shrink-0">
                        <Plant
                            weight="duotone"
                            className={`w-8 h-8 transition-all duration-500 group-hover:rotate-12 ${isScrolled ? "text-accent dark:text-accent-bright" : "text-white"
                                }`}
                        />
                        <span
                            className={`text-xl font-bold tracking-tighter transition-colors duration-500 ${isScrolled ? "text-foreground" : "text-white"
                                }`}
                        >
                            {SITE.name}.
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                aria-current={isActive(link.href) ? "page" : undefined}
                                className={`relative text-sm font-medium transition-colors ${isScrolled
                                    ? isActive(link.href)
                                        ? "text-foreground"
                                        : "text-muted-foreground hover:text-foreground"
                                    : isActive(link.href)
                                        ? "text-white"
                                        : "text-white/70 hover:text-white"
                                    }`}
                            >
                                {link.label}
                                {isActive(link.href) && (
                                    <motion.span
                                        layoutId="nav-active"
                                        className={`absolute -bottom-1.5 left-0 right-0 h-px ${isScrolled ? "bg-accent" : "bg-white"
                                            }`}
                                    />
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* CTA */}
                    <Link
                        href="/contact"
                        className={`hidden md:inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium tracking-tight transition-all hover:scale-[1.03] active:scale-[0.97] ${isScrolled
                            ? "bg-foreground text-background hover:bg-foreground/90"
                            : "bg-white text-zinc-900 hover:bg-white/90"
                            }`}
                    >
                        Enquire
                    </Link>

                    {/* Mobile Toggle */}
                    <button
                        type="button"
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={mobileMenuOpen}
                        className={`md:hidden p-2 transition-colors ${mobileMenuOpen || isScrolled ? "text-foreground" : "text-white"
                            }`}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? (
                            <X weight="bold" className="w-6 h-6" />
                        ) : (
                            <List weight="bold" className="w-6 h-6" />
                        )}
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
                        className="fixed inset-0 z-40 bg-background pt-32 px-6 md:hidden overflow-y-auto"
                    >
                        <div className="flex flex-col gap-6 text-2xl font-medium tracking-tighter">
                            {NAV_LINKS.map((link, i) => (
                                <motion.div
                                    key={link.label}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.08 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`transition-colors ${isActive(link.href) ? "text-accent dark:text-accent-bright" : "hover:text-accent dark:hover:text-accent-bright"
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="mt-8 flex flex-col gap-6"
                            >
                                <Link
                                    href="/contact"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="w-full h-14 inline-flex items-center justify-center rounded-full bg-foreground text-background text-lg font-medium"
                                >
                                    Enquire
                                </Link>
                                <a
                                    href={`mailto:${SITE.email}`}
                                    className="text-base text-muted-foreground"
                                >
                                    {SITE.email}
                                </a>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
