import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { ButtonLink } from "@/components/ui/button-link";
import { CollectionsGrid } from "./collections-grid";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
    title: "Collections",
    description:
        "The full archive of arrangements, subscriptions, preserved work, installations and workshops from the La Casa Del Amor studio.",
    alternates: { canonical: "/collections" },
    openGraph: {
        title: `Collections | ${SITE.name}`,
        description:
            "Arrangements, subscriptions, preserved work, installations and workshops — the complete studio archive.",
        url: `${SITE.url}/collections`,
    },
};

export default function CollectionsPage() {
    return (
        <main className="min-h-[100dvh] bg-background">
            <PageHero
                eyebrow="The Archive"
                title={
                    <>
                        Every study<br />
                        <span className="text-white/60 italic font-normal">in the catalogue.</span>
                    </>
                }
                lead="Eight ongoing bodies of work, from a single table arrangement to a maintained lobby installation. Everything is built to order, so the list moves with the season."
                image="/collection-1.webp"
            />

            <section className="py-20 md:py-28 px-4 md:px-8">
                <div className="w-full max-w-7xl mx-auto">
                    <CollectionsGrid />
                </div>
            </section>

            <section className="px-4 md:px-8 pb-24 md:pb-32">
                <div className="w-full max-w-7xl mx-auto rounded-[3rem] bg-zinc-950 text-white px-8 py-16 md:px-16 md:py-24 flex flex-col md:flex-row md:items-end justify-between gap-10">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 max-w-[18ch]">
                            Nothing here is quite it?
                        </h2>
                        <p className="text-zinc-400 max-w-[44ch] leading-relaxed">
                            Roughly half our work never appears in the archive. Tell us the room, the season and the occasion, and we will design against those instead.
                        </p>
                    </div>
                    <ButtonLink href="/contact" variant="light" className="h-14 px-8 text-base shrink-0">
                        Commission something
                    </ButtonLink>
                </div>
            </section>
        </main>
    );
}
