import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
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
      <Navbar />
      <Hero />
      <Featured />
      <Process />
      <Collections />
      <SocialProof />
      <OurPromise />
      <NewsletterCTA />
      <Footer />
    </main>
  );
}
