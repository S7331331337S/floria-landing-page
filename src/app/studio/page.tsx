import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { FadeUpStagger, FadeUpItem } from "@/components/ui/motion";
import { SITE, STUDIO_STATS, STUDIO_TEAM, STUDIO_VALUES } from "@/lib/content";

export const metadata: Metadata = {
    title: "The Studio",
    description:
        "An independent, foam-free floral studio in downtown Los Angeles, sourcing every stem within fifty miles. Our people, our ethos and how we work.",
    alternates: { canonical: "/studio" },
    openGraph: {
        title: `The Studio | ${SITE.name}`,
        description:
            "Independent, foam-free floral design in downtown Los Angeles. Every stem grown within fifty miles.",
        url: `${SITE.url}/studio`,
    },
};

export default function StudioPage() {
    return (
        <main className="min-h-[100dvh] bg-background">
            <PageHero
                eyebrow="The Studio"
                title={
                    <>
                        A workshop,<br />
                        <span className="text-white/60 italic font-normal">not a flower shop.</span>
                    </>
                }
                lead="Founded in 2016 in a former loading bay in the Arts District. Eleven growers, four staff, one cooler and no floral foam."
                image="/d2.webp"
            />

            {/* Stats */}
            <section className="border-b border-border">
                <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {STUDIO_STATS.map((stat) => (
                        <div key={stat.label} className="flex flex-col">
                            <span className="text-4xl md:text-6xl font-bold tracking-tighter mb-2">{stat.value}</span>
                            <span className="text-xs uppercase tracking-widest text-muted-foreground">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Story */}
            <section className="py-24 md:py-32 px-4 md:px-8">
                <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    <div className="lg:col-span-5 lg:sticky lg:top-32">
                        <div className="relative overflow-hidden rounded-[2.5rem] aspect-[4/5]">
                            <img
                                src="/bouquet-1.webp"
                                alt="An arrangement from the studio\u2019s spring archive"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[inherit] pointer-events-none" />
                        </div>
                    </div>

                    <div className="lg:col-span-7 flex flex-col gap-6">
                        <SectionHeading title="Where this came from." className="mb-2" />
                        <p className="text-lg md:text-xl leading-relaxed text-foreground/85">
                            Marisol Vega spent ten years designing public gardens before she ever sold a bouquet. That background is the whole explanation for how this studio works: we think in sightlines, circulation and mass before we think in colour.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            The studio opened in 2016 with one cooler, a borrowed van and a standing order from a hotel lobby that wanted something other than the usual. It has grown into a team of four, a drying loft, and eleven grower relationships that we renegotiate every season.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            We still take a deliberately small number of commissions. Every piece is built by hand in the Arts District, conditioned overnight, and installed by the same people who designed it. Nobody here hands a concept off to a production floor, because there isn&rsquo;t one.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            The constraint we are proudest of is also the most expensive: nothing enters the studio that was not grown within fifty miles. It narrows the palette every single week, and it is the reason our work looks like the place it comes from.
                        </p>
                    </div>
                </div>
            </section>

            {/* Ethos */}
            <section id="ethos" className="py-24 md:py-32 bg-zinc-950 text-white px-4 md:px-8 relative overflow-hidden scroll-mt-24">
                <div className="absolute -top-32 -right-32 w-[50vw] h-[50vw] rounded-full bg-accent/5 blur-[140px] pointer-events-none" />

                <div className="w-full max-w-7xl mx-auto relative z-10">
                    <SectionHeading
                        title="Four rules we do not bend."
                        lead="Everything else about the studio is negotiable. These are the constraints that decide what we can and cannot make."
                        tone="dark"
                        className="mb-16 md:mb-24"
                    />

                    <FadeUpStagger className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 rounded-[2rem] overflow-hidden">
                        {STUDIO_VALUES.map((value, i) => (
                            <FadeUpItem key={value.title}>
                                <div className="bg-zinc-950 p-8 md:p-12 h-full">
                                    <span className="block text-xs font-mono text-accent-bright mb-6">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-4">{value.title}</h3>
                                    <p className="text-zinc-400 leading-relaxed max-w-[42ch]">{value.desc}</p>
                                </div>
                            </FadeUpItem>
                        ))}
                    </FadeUpStagger>
                </div>
            </section>

            {/* Team */}
            <section className="py-24 md:py-32 px-4 md:px-8">
                <div className="w-full max-w-7xl mx-auto">
                    <SectionHeading
                        title="Who builds it."
                        lead="The person who designs your commission is the person who installs it. Three of the four are below."
                        className="mb-16 md:mb-24"
                    />

                    <FadeUpStagger className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        {STUDIO_TEAM.map((person) => (
                            <FadeUpItem key={person.name}>
                                <div className="group h-full rounded-[2rem] border border-border p-8 md:p-10 flex flex-col hover:border-foreground/20 transition-colors duration-500">
                                    <div className="flex items-start justify-between mb-10">
                                        <span className="text-6xl md:text-7xl font-bold tracking-tighter text-accent/25 group-hover:text-accent/40 transition-colors duration-500 leading-none">
                                            {person.name.charAt(0)}
                                        </span>
                                        <span className="text-xs font-mono text-muted-foreground pt-2">
                                            Since {person.since}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-medium tracking-tight">{person.name}</h3>
                                    <p className="text-xs uppercase tracking-widest text-accent dark:text-accent-bright mt-1 mb-4">{person.role}</p>
                                    <p className="text-muted-foreground leading-relaxed text-sm max-w-[38ch]">{person.bio}</p>
                                </div>
                            </FadeUpItem>
                        ))}
                    </FadeUpStagger>
                </div>
            </section>

            {/* CTA */}
            <section className="px-4 md:px-8 pb-24 md:pb-32">
                <div className="w-full max-w-7xl mx-auto rounded-[3rem] bg-muted/60 border border-border px-8 py-16 md:px-16 md:py-24 flex flex-col md:flex-row md:items-end justify-between gap-10">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 max-w-[16ch]">
                            Come and see the bench.
                        </h2>
                        <p className="text-muted-foreground max-w-[44ch] leading-relaxed">
                            Studio visits run Tuesday to Friday by appointment. Bring the floor plan, the date, and a photograph of the room at the hour you will use it.
                        </p>
                    </div>
                    <ButtonLink href="/contact" variant="primary" className="h-14 px-8 text-base shrink-0">
                        Book a visit
                    </ButtonLink>
                </div>
            </section>
        </main>
    );
}
