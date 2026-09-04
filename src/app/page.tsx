import { Hero } from "@/components/sections/Hero";
import { Featured } from "@/components/sections/Featured";
import { Process } from "@/components/sections/Process";
import { Collections } from "@/components/sections/Collections";
import { SocialProof } from "@/components/sections/SocialProof";
import { OurPromise } from "@/components/sections/OurPromise";
import { NewsletterCTA } from "@/components/sections/NewsletterCTA";

export default function Home() {
  return (
    <main className="min-h-[100dvh] relative bg-background">
      <Hero />
      <Featured />
      <Process />
      <Collections />
      <SocialProof />
      <OurPromise />
      <NewsletterCTA />
    </main>
  );
}
