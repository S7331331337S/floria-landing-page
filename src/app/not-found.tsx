import { ButtonLink } from "@/components/ui/button-link";
import { NAV_LINKS } from "@/lib/content";
import Link from "next/link";

export default function NotFound() {
    return (
        <main className="relative min-h-[100dvh] bg-black flex items-center justify-center px-4 md:px-8 py-40 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img
                    src="/hero-bg.webp"
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black" />
            </div>

            <div className="relative z-10 w-full max-w-2xl mx-auto text-center">
                <span className="inline-block py-1 px-3 rounded-full border border-white/20 bg-white/10 text-white text-xs font-semibold tracking-widest uppercase mb-8 backdrop-blur-sm">
                    404
                </span>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.95] text-white mb-8 text-balance">
                    This stem<br />
                    <span className="text-white/60 italic font-normal">is out of season.</span>
                </h1>

                <p className="text-lg text-white/70 leading-relaxed max-w-[42ch] mx-auto mb-12">
                    The page you were looking for has been cut, dried or never existed. The archive is still where you left it.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
                    <ButtonLink href="/" variant="light" className="h-14 px-8 text-base">
                        Back to the studio
                    </ButtonLink>
                    <ButtonLink href="/collections" variant="outline" className="h-14 px-8 text-base">
                        Browse collections
                    </ButtonLink>
                </div>

                <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </main>
    );
}
