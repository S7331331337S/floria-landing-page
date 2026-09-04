import type { Metadata } from "next";
import { EnvelopeSimple, Phone, MapPin, Clock } from "@phosphor-icons/react/dist/ssr";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeUpStagger, FadeUpItem } from "@/components/ui/motion";
import { EnquiryForm } from "./enquiry-form";
import { FAQS, SITE } from "@/lib/content";

export const metadata: Metadata = {
    title: "Contact",
    description:
        "Enquire about a wedding, installation, subscription or workshop with the La Casa Del Amor studio in downtown Los Angeles.",
    alternates: { canonical: "/contact" },
    openGraph: {
        title: `Contact | ${SITE.name}`,
        description:
            "Start an enquiry with the studio — weddings, installations, subscriptions and workshops.",
        url: `${SITE.url}/contact`,
    },
};

export default function ContactPage() {
    return (
        <main className="min-h-[100dvh] bg-background">
            <PageHero
                eyebrow="Contact"
                title={
                    <>
                        Tell us about<br />
                        <span className="text-white/60 italic font-normal">the room.</span>
                    </>
                }
                lead="The more you can say about the space, the season and the hour, the more useful our first reply will be. We answer everything within two working days."
                image="/hero-accent.webp"
                align="center"
            />

            <section className="py-20 md:py-28 px-4 md:px-8">
                <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

                    {/* Form */}
                    <div className="lg:col-span-7">
                        <EnquiryForm />
                    </div>

                    {/* Studio details */}
                    <aside className="lg:col-span-5 lg:sticky lg:top-32 flex flex-col gap-10">
                        <div>
                            <h2 className="text-2xl font-medium tracking-tight mb-6">The studio</h2>

                            <ul className="flex flex-col gap-5">
                                <li className="flex items-start gap-4">
                                    <EnvelopeSimple weight="duotone" className="w-5 h-5 text-accent dark:text-accent-bright mt-1 shrink-0" />
                                    <a href={`mailto:${SITE.email}`} className="hover:text-accent dark:hover:text-accent-bright transition-colors">
                                        {SITE.email}
                                    </a>
                                </li>
                                <li className="flex items-start gap-4">
                                    <Phone weight="duotone" className="w-5 h-5 text-accent dark:text-accent-bright mt-1 shrink-0" />
                                    <a href={SITE.phoneHref} className="hover:text-accent dark:hover:text-accent-bright transition-colors">
                                        {SITE.phone}
                                    </a>
                                </li>
                                <li className="flex items-start gap-4">
                                    <MapPin weight="duotone" className="w-5 h-5 text-accent dark:text-accent-bright mt-1 shrink-0" />
                                    <span className="leading-relaxed">
                                        {SITE.address.street}
                                        <br />
                                        {SITE.address.city}
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <div className="rounded-[2rem] border border-border p-8">
                            <h3 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-widest mb-6">
                                <Clock weight="duotone" className="w-5 h-5 text-accent dark:text-accent-bright" />
                                Studio hours
                            </h3>
                            <ul className="flex flex-col gap-3">
                                {SITE.hours.map((slot) => (
                                    <li key={slot.days} className="flex items-baseline justify-between gap-4 text-sm">
                                        <span className="text-foreground">{slot.days}</span>
                                        <span className="text-muted-foreground">{slot.time}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="relative overflow-hidden rounded-[2rem] aspect-[4/3]">
                            <img
                                src="/d2.webp"
                                alt="A preserved wreath built at the studio bench"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[inherit] pointer-events-none" />
                        </div>
                    </aside>
                </div>
            </section>

            {/* FAQs */}
            <section className="pb-24 md:pb-32 px-4 md:px-8">
                <div className="w-full max-w-4xl mx-auto">
                    <SectionHeading
                        title="Before you write."
                        lead="The four questions we are asked most often."
                        align="center"
                        className="mb-16"
                    />

                    <FadeUpStagger className="flex flex-col">
                        {FAQS.map((faq) => (
                            <FadeUpItem key={faq.q}>
                                <details className="group border-b border-border py-6">
                                    <summary className="flex items-center justify-between gap-6 cursor-pointer list-none text-lg md:text-xl font-medium tracking-tight marker:hidden">
                                        {faq.q}
                                        <span className="relative w-4 h-4 shrink-0">
                                            <span className="absolute inset-x-0 top-1/2 h-px bg-foreground -translate-y-1/2" />
                                            <span className="absolute inset-y-0 left-1/2 w-px bg-foreground -translate-x-1/2 transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
                                        </span>
                                    </summary>
                                    <p className="text-muted-foreground leading-relaxed mt-4 max-w-[60ch]">{faq.a}</p>
                                </details>
                            </FadeUpItem>
                        ))}
                    </FadeUpStagger>
                </div>
            </section>
        </main>
    );
}
