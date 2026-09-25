import { SmoothScroll } from "@/components/story/fx/SmoothScroll";
import { Grain } from "@/components/story/fx/Grain";
import { StoryNav } from "@/components/story/StoryNav";
import { Canopy } from "@/components/story/flora/Canopy";
import { SEAM_DAYLIGHT, SEAM_DUSK, SEAM_MOSS, SEAM_NIGHT } from "@/components/story/seams";
import { Discovery } from "@/components/story/chapters/Discovery";
import { Craft } from "@/components/story/chapters/Craft";
import { Sculptures } from "@/components/story/chapters/Sculptures";
import { Studio } from "@/components/story/chapters/Studio";
import { Moments } from "@/components/story/chapters/Moments";
import { Garden } from "@/components/story/chapters/Garden";
import { Invitation } from "@/components/story/chapters/Invitation";
import { getCollection } from "@/lib/collection";

// re-check Shopify for new pieces every 5 minutes
export const revalidate = 300;

/**
 * The journey, top to bottom. Reorder chapters here; each one is
 * self-contained in components/story/chapters.
 */
export default async function Home() {
  const pieces = await getCollection();

  return (
    <SmoothScroll>
      <main className="relative">
        <Discovery />
        <Canopy leaves={SEAM_MOSS} />
        <Craft />
        <Canopy leaves={SEAM_DAYLIGHT} />
        <Sculptures pieces={pieces} />
        <Studio />
        <Canopy leaves={SEAM_DUSK} />
        <Moments />
        <Garden />
        <Canopy leaves={SEAM_NIGHT} />
        <Invitation />
      </main>
      <StoryNav />
      <Grain />
    </SmoothScroll>
  );
}
