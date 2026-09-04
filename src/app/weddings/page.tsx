import type { Metadata } from "next";
import { Check } from "@phosphor-icons/react/dist/ssr";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { FadeUpStagger, FadeUpItem } from "@/components/ui/motion";
import { SITE, WEDDING_PACKAGES, WEDDING_TIMELINE } from "@/lib/content";

export const metadata: Metadata = {
    title: "Weddings & Events",
    description:
        "Sculptural bridal work, ceremony structures and full-venue installations, scoped per room after a site walk. Packages from $1,400.",
    alternates: { canonical: "/weddings" },
    openGraph: {
        title: `Weddings & Events | ${SITE.name}`,
        description:
            "Sculptural bridal work, ceremony structures and full-venue floral installations in Los Angeles.",
        url: `${SITE.url}/weddings`,
    },
};

const GALLERY = [
    { src: "/collection-1.webp", alt: "Ceremony installation", span: "md:col-span-7", aspect: "aspect-[4/3]" },
    { src: "/bouquet-3.webp", alt: "Bridal bouquet detail", span: "md:col-span-5", aspect: "aspect-[4/3]" },
    { src: "/d1.webp", alt: "Table composition", span: "md:col-span-5", aspect: "aspect-[4/3]" },
    { src: "/collection-4.webp", alt: "Suspended structure", span: "md:col-span-7", aspect: "aspect-[4/3]" },
];

export default function WeddingsPage() {
    return (
        <main className="min-h-[100dvh] bg-background">
            <PageHero
                eyebrow="Weddings & Events"
                title={
                    <>
                        One room,<br />
                        <span className="text-white/60 italic font-normal">one commission.</span>
                    </>
                }
                lead="We take a limited number of weddings each season so every one is designed against its own venue, light and hour rather than a house template."
                image="/collection-1.webp"
            >
                <ButtonLink href="/contact" variant="light" className="h-14 px-8 text-base">
                    Check your date
                </ButtonLink>
            </PageHero>

            {/* Packages */}
            <section className="py-24 md:py-32 px-4 md:px-8">
                <div className="w-full max-w-7xl mx-auto">
                    <SectionHeading
                        title="Three scopes."
                        lead="Starting points rather than fixed menus. Every commission is quoted after we have seen the space and understood the season you are marrying into."
                        className="mb-16 md:mb-24"
                    />

                    <FadeUpStagger className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {WEDDING_PACKAGES.map((pkg) => (
                            <FadeUpItem key={pkg.name}>
                                <div
                                    className={`h-full rounded-[2rem] p-8 md:p-10 flex flex-col border transition-colors duration-500 ${"featured" in pkg && pkg.featured
                                        ? "bg-zinc-950 text-white border-transparent"
                                        : "bg-muted/60 border-border hover:border-foreground/20"
                                        }`}
                                >
                                    {"featured" in pkg && pkg.featured && (
                                        <span className="self-start rounded-full bg-accent px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-widest text-accent-foreground mb-6">
                                            Most requested
                                        </span>
                                    )}

                                    <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-2">{pkg.name}</h3>
                                    <p
                                        className={`text-sm mb-6 ${"featured" in pkg && pkg.featured ? "text-zinc-400" : "text-muted-foreground"
                                            }`}
                                    >
                                        {pkg.summary}
                                    </p>

                                    <p className="text-3xl font-bold tracking-tighter mb-8">{pkg.price}</p>

                                    <ul className="flex flex-col gap-4 mb-10">
                                        {pkg.includes.map((line) => (
                                            <li key={line} className="flex items-start gap-3 text-sm leading-relaxed">
                                                <Check
                                                    weight="bold"
                                                    className={`w-4 h-4 mt-1 shrink-0 ${"featured" in pkg && pkg.featured ? "text-accent" : "text-accent"
                                                        }`}
                                                />
                                                <span
                                                    className={
                                                        "featured" in pkg && pkg.featured
                                                            ? "text-zinc-300"
                                                            : "text-muted-foreground"
                                                    }
                                                >
                                                    {line}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                    <ButtonLink
                                        href="/contact"
                                        variant={"featured" in pkg && pkg.featured ? "light" : "primary"}
                                        className="mt-auto w-full h-12"
                                    >
                                        Enquire
                                    </ButtonLink>
                                </div>
                            </FadeUpItem>
                        ))}
                    </FadeUpStagger>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-24 md:py-32 bg-zinc-950 text-white px-4 md:px-8 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-accent/5 blur-[140px] pointer-events-none" />

                <div className="w-full max-w-7xl mx-auto relative z-10">
                    <SectionHeading
                        title="How a commission runs."
                        lead="From first conversation to the strike at midnight, the shape of a year with the studio."
                        tone="dark"
                        className="mb-16 md:mb-24"
                    />

                    <FadeUpStagger className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
                        {WEDDING_TIMELINE.map((step, i) => (
                            <FadeUpItem key={step.title}>
                                <div className="relative pt-8 border-t border-white/10 h-full">
                                    <span className="absolute -top-px left-0 w-12 h-px bg-accent-bright" />
                                    <span className="block text-xs font-mono uppercase tracking-widest text-accent-bright mb-4">
                                        {String(i + 1).padStart(2, "0")} — {step.when}
                                    </span>
                                    <h3 className="text-xl md:text-2xl font-medium tracking-tight mb-3">{step.title}</h3>
                                    <p className="text-zinc-400 leading-relaxed text-sm">{step.desc}</p>
                                </div>
                            </FadeUpItem>
                        ))}
                    </FadeUpStagger>
                </div>
            </section>

            {/* Gallery */}
            <section className="py-24 md:py-32 px-4 md:px-8">
                <div className="w-full max-w-7xl mx-auto">
                    <SectionHeading
                        title="Recent work."
                        lead="A short selection from the last two seasons. Full galleries are shared during consultation."
                        className="mb-16"
                    />

                    <FadeUpStagger className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
                        {GALLERY.map((shot) => (
                            <FadeUpItem key={shot.src} className={shot.span}>
                                <div className={`relative overflow-hidden rounded-[2rem] group ${shot.aspect}`}>
                                    <img
                                        src={shot.src}
                                        alt={shot.alt}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[inherit] pointer-events-none" />
                                </div>
                            </FadeUpItem>
                        ))}
                    </FadeUpStagger>
                </div>
            </section>

            {/* Closing quote */}
            <section className="px-4 md:px-8 pb-24 md:pb-32">
                <div className="w-full max-w-4xl mx-auto text-center">
                    <p className="text-2xl md:text-4xl font-serif italic leading-snug text-balance mb-8">
                        &ldquo;They asked what time our ceremony started before they asked what flowers we liked. That told us everything.&rdquo;
                    </p>
                    <p className="text-sm uppercase tracking-widest text-muted-foreground">
                        Priya & Daniel — Ojai, 2026
                    </p>
                </div>
            </section>
        </main>
    );
}
