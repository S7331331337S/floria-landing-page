import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { PageHero } from "@/components/ui/page-hero";
import { FadeUpStagger, FadeUpItem } from "@/components/ui/motion";
import { JOURNAL_POSTS, SITE } from "@/lib/content";

export const metadata: Metadata = {
    title: "Journal",
    description:
        "Essays on structural floristry, local sourcing and designing for the hour a room is actually used, from the La Casa Del Amor studio.",
    alternates: { canonical: "/journal" },
    openGraph: {
        title: `Journal | ${SITE.name}`,
        description:
            "Essays on structural floristry, local sourcing and spatial design from the studio.",
        url: `${SITE.url}/journal`,
    },
};

export default function JournalPage() {
    const [featured, ...rest] = JOURNAL_POSTS;

    return (
        <main className="min-h-[100dvh] bg-background">
            <PageHero
                eyebrow="Journal"
                title={
                    <>
                        Notes from<br />
                        <span className="text-white/60 italic font-normal">the bench.</span>
                    </>
                }
                lead="Occasional writing on method, sourcing and the reasoning behind the way we cut. Published when there is something worth saying, which is not often."
                image="/bouquet-2.webp"
            />

            {/* Featured essay */}
            <section className="py-20 md:py-28 px-4 md:px-8">
                <div className="w-full max-w-7xl mx-auto">
                    <Link href={`/journal/${featured.slug}`} className="group block">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                            <div className="lg:col-span-7 relative overflow-hidden rounded-[2.5rem] aspect-[16/10]">
                                <img
                                    src={featured.image}
                                    alt={featured.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[inherit] pointer-events-none" />
                            </div>

                            <div className="lg:col-span-5">
                                <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground mb-6">
                                    <span className="text-accent dark:text-accent-bright font-semibold">{featured.category}</span>
                                    <span className="w-8 h-px bg-border" />
                                    <span>{featured.readingTime} read</span>
                                </div>

                                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6 text-balance group-hover:text-accent dark:hover:text-accent-bright transition-colors">
                                    {featured.title}
                                </h2>
                                <p className="text-muted-foreground leading-relaxed text-lg mb-8 max-w-[46ch]">
                                    {featured.excerpt}
                                </p>

                                <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest">
                                    Read the essay
                                    <span className="p-2 bg-muted rounded-full group-hover:bg-accent group-hover:text-accent-foreground group-hover:-translate-y-1 group-hover:translate-x-1 transition-all">
                                        <ArrowUpRight weight="bold" />
                                    </span>
                                </span>
                            </div>
                        </div>
                    </Link>
                </div>
            </section>

            {/* Archive list */}
            <section className="pb-24 md:pb-32 px-4 md:px-8">
                <div className="w-full max-w-7xl mx-auto">
                    <h2 className="text-xs uppercase tracking-widest text-muted-foreground border-t border-border pt-8 mb-4">
                        Earlier writing
                    </h2>

                    <FadeUpStagger className="flex flex-col">
                        {rest.map((post) => (
                            <FadeUpItem key={post.slug}>
                                <Link
                                    href={`/journal/${post.slug}`}
                                    className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center py-8 border-b border-border"
                                >
                                    <div className="md:col-span-3 relative overflow-hidden rounded-2xl aspect-[3/2]">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>

                                    <div className="md:col-span-7">
                                        <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground mb-3">
                                            <span className="text-accent dark:text-accent-bright font-semibold">{post.category}</span>
                                            <span>{post.displayDate}</span>
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-3 group-hover:text-accent dark:hover:text-accent-bright transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="text-muted-foreground leading-relaxed max-w-[52ch]">{post.excerpt}</p>
                                    </div>

                                    <div className="md:col-span-2 flex md:justify-end">
                                        <span className="text-sm text-muted-foreground">{post.readingTime}</span>
                                    </div>
                                </Link>
                            </FadeUpItem>
                        ))}
                    </FadeUpStagger>
                </div>
            </section>
        </main>
    );
}
