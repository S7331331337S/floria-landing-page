import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

// Brand text face (Direction A, Cold-Press Atelier). Variable font, 100-900.
const sans = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

const OG_IMAGE = {
  url: "https://welcome.lacasadelamor.app/og/og-welcome.jpg",
  width: 1200,
  height: 630,
  alt: "La Casa del Amor: a kokedama held up in Heather's Albany garden, beside the brand seal",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://welcome.lacasadelamor.app"),
  title: {
    default: "La Casa Del Amor | Living art by Heather Close",
    template: "%s | La Casa Del Amor",
  },
  description:
    "Step inside La Casa Del Amor: a greenhouse studio in Albany, New York where Heather Close raises kokedama, plant mounts and exotic houseplant arrangements by hand.",
  keywords: ["La Casa Del Amor", "Heather Close", "kokedama", "houseplants", "Albany", "plant mounts", "staghorn fern", "tillandsia", "garden parties"],
  authors: [{ name: "Heather Close" }],
  creator: "La Casa Del Amor",
  openGraph: {
    type: "website",
    siteName: "La Casa Del Amor",
    title: "La Casa Del Amor | Living art by Heather Close",
    description: "A house of living things. Step inside Heather's greenhouse studio in Albany, New York.",
    url: "https://welcome.lacasadelamor.app",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "La Casa Del Amor | Living art by Heather Close",
    description: "A house of living things. Step inside Heather's greenhouse studio in Albany, New York.",
    images: [OG_IMAGE.url],
  },
};

export const viewport: Viewport = {
  themeColor: "#162016",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable} antialiased`}>
        <noscript>
          <style>{`[data-reveal]{visibility:visible!important}[data-intro],[data-t]{opacity:1!important;visibility:visible!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
