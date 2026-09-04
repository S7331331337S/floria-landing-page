import Link from "next/link";
import { SITE, COLLECTION_ITEMS, JOURNAL_POSTS } from "@/lib/content";

const STUDIO_LINKS = [
    { label: "About the studio", href: "/studio" },
    { label: "Sourcing ethos", href: "/studio#ethos" },
    { label: "Weddings & events", href: "/weddings" },
    { label: "Journal", href: "/journal" },
];

export function Footer() {
    const archiveLinks = COLLECTION_ITEMS.slice(0, 3).map((item) => ({
        label: item.title,
        href: `/collections#${item.slug}`,
    }));

    const latestPost = JOURNAL_POSTS[0];

    return (
        <footer className="bg-zinc-950 pt-32 pb-10 px-4 md:px-8 border-t border-white/5 relative overflow-hidden">

            {/* Massive Background Typography */}
            <div className="absolute top-0 left-0 w-full flex justify-center items-start pt-10 overflow-hidden pointer-events-none opacity-[0.02] select-none">
                <span className="text-[22vw] font-bold leading-none tracking-tighter text-white whitespace-nowrap">
                    {SITE.name.toUpperCase()}
                </span>
            </div>

            {/* Creative Glowing Flower Background Element */}
            <div className="absolute -bottom-1/4 -right-20 md:-right-64 w-[500px] md:w-[900px] h-[500px] md:h-[900px] pointer-events-none opacity-20 mix-blend-screen overflow-hidden">
                <img src="/hero-accent.webp" alt="" aria-hidden="true" className="w-full h-full object-contain blur-md rotate-12" />
            </div>

            <div className="w-full max-w-7xl mx-auto flex flex-col relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-32 mt-10">
                    <div className="md:col-span-5 flex flex-col text-zinc-50">
                        <div className="flex flex-col mb-8">
                            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-2">{SITE.name}.</h2>
                            <p className="text-xl md:text-2xl text-accent-bright font-serif italic opacity-90">{SITE.tagline}</p>
                        </div>
                        <p className="text-zinc-400 max-w-[35ch] leading-relaxed text-lg mb-8">
                            An independent floral styling studio for modern, sculptural living. Sourced locally, curated globally.
                        </p>

                        <Link
                            href={`/journal/${latestPost.slug}`}
                            className="group max-w-[38ch] rounded-2xl border border-white/10 p-5 hover:border-white/20 hover:bg-white/[0.03] transition-colors"
                        >
                            <span className="text-[0.7rem] uppercase tracking-widest text-accent-bright font-semibold">
                                Latest from the journal
                            </span>
                            <p className="text-zinc-200 mt-2 leading-snug group-hover:text-white transition-colors">
                                {latestPost.title}
                            </p>
                        </Link>
                    </div>

                    <div className="md:col-span-2 md:col-start-7">
                        <h4 className="text-zinc-50 font-semibold mb-6 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-accent inline-block" /> Archive
                        </h4>
                        <ul className="flex flex-col gap-4 text-zinc-400">
                            {archiveLinks.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="hover:text-white transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link href="/collections" className="hover:text-white transition-colors">
                                    All collections
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="text-zinc-50 font-semibold mb-6 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-accent inline-block" /> Studio
                        </h4>
                        <ul className="flex flex-col gap-4 text-zinc-400">
                            {STUDIO_LINKS.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="hover:text-white transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="text-zinc-50 font-semibold mb-6 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-accent inline-block" /> Contact
                        </h4>
                        <div className="flex flex-col gap-4 text-zinc-400">
                            <a href={`mailto:${SITE.email}`} className="hover:text-white transition-colors">
                                {SITE.email}
                            </a>
                            <a href={SITE.phoneHref} className="hover:text-white transition-colors">
                                {SITE.phone}
                            </a>
                            <p className="leading-relaxed">
                                {SITE.address.street}
                                <br />
                                {SITE.address.city}
                            </p>
                            <Link href="/contact" className="text-white hover:text-accent transition-colors font-medium">
                                Start an enquiry
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-sm text-zinc-500">
                    <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        {SITE.social.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-zinc-300 transition-colors uppercase tracking-widest text-xs font-semibold"
                            >
                                {social.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
