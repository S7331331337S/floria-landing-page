import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { JOURNAL_POSTS, SITE, getJournalPost } from "@/lib/content";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
    return JOURNAL_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = getJournalPost(slug);

    if (!post) {
        return { title: "Essay not found" };
    }

    return {
        title: post.title,
        description: post.excerpt,
        alternates: { canonical: `/journal/${post.slug}` },
        openGraph: {
            type: "article",
            title: `${post.title} | ${SITE.name}`,
            description: post.excerpt,
            url: `${SITE.url}/journal/${post.slug}`,
            publishedTime: post.date,
        },
    };
}

export default async function JournalPostPage({ params }: PageProps) {
    const { slug } = await params;
    const post = getJournalPost(slug);

    if (!post) {
        notFound();
    }

    const index = JOURNAL_POSTS.findIndex((p) => p.slug === post.slug);
    const previous = JOURNAL_POSTS[index - 1];
    const next = JOURNAL_POSTS[index + 1];

    return (
        <main className="min-h-[100dvh] bg-background">
            {/* Article header over a dark banner, so the fixed navbar stays legible */}
            <header className="relative bg-black pt-40 pb-20 md:pt-56 md:pb-28 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src={post.image} alt="" aria-hidden="true" className="w-full h-full object-cover opacity-25" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-black/90" />
                    <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
                </div>

                <div className="relative z-10 w-full max-w-3xl mx-auto px-4 md:px-8 text-center">
                    <div className="flex items-center justify-center gap-3 text-xs uppercase tracking-widest text-white/60 mb-8">
                        <span className="text-accent-bright font-semibold">{post.category}</span>
                        <span className="w-8 h-px bg-white/20" />
                        <span>{post.displayDate}</span>
                        <span className="w-8 h-px bg-white/20" />
                        <span>{post.readingTime} read</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[1.02] text-white text-balance">
                        {post.title}
                    </h1>
                </div>
            </header>

            {/* Body */}
            <article className="px-4 md:px-8 py-20 md:py-28">
                <div className="w-full max-w-2xl mx-auto">
                    <p className="text-xl md:text-2xl leading-relaxed text-foreground/85 mb-12 font-serif italic text-balance">
                        {post.excerpt}
                    </p>

                    <div className="flex flex-col gap-7">
                        {post.body.map((paragraph, i) => (
                            <p key={i} className="text-lg leading-[1.75] text-foreground/80">
                                {paragraph}
                            </p>
                        ))}
                    </div>

                    <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                        <p className="text-sm text-muted-foreground max-w-[38ch]">
                            Written by the {SITE.name} studio in downtown Los Angeles.
                        </p>
                        <Link
                            href="/contact"
                            className="text-sm font-semibold uppercase tracking-widest text-accent dark:text-accent-bright hover:text-foreground transition-colors shrink-0"
                        >
                            Start an enquiry
                        </Link>
                    </div>
                </div>
            </article>

            {/* Prev / next */}
            <nav className="px-4 md:px-8 pb-24 md:pb-32" aria-label="More essays">
                <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {previous ? (
                        <Link
                            href={`/journal/${previous.slug}`}
                            className="group rounded-[2rem] border border-border p-8 hover:border-foreground/25 transition-colors"
                        >
                            <span className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground mb-4">
                                <ArrowLeft weight="bold" className="w-3 h-3" /> Newer
                            </span>
                            <p className="text-xl font-medium tracking-tight group-hover:text-accent dark:hover:text-accent-bright transition-colors">
                                {previous.title}
                            </p>
                        </Link>
                    ) : (
                        <span aria-hidden="true" className="hidden md:block" />
                    )}

                    {next && (
                        <Link
                            href={`/journal/${next.slug}`}
                            className="group rounded-[2rem] border border-border p-8 hover:border-foreground/25 transition-colors md:text-right"
                        >
                            <span className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground mb-4 md:justify-end">
                                Older <ArrowRight weight="bold" className="w-3 h-3" />
                            </span>
                            <p className="text-xl font-medium tracking-tight group-hover:text-accent dark:hover:text-accent-bright transition-colors">
                                {next.title}
                            </p>
                        </Link>
                    )}
                </div>

                <div className="w-full max-w-5xl mx-auto mt-10 text-center">
                    <Link
                        href="/journal"
                        className="text-sm font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                    >
                        All essays
                    </Link>
                </div>
            </nav>
        </main>
    );
}
