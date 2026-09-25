import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const sans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://lacasadelamor.app"),
  title: {
    default: "La Casa Del Amor | Living art by Heather Close",
    template: "%s | La Casa Del Amor",
  },
  description:
    "Step inside La Casa Del Amor: a greenhouse studio in Albany, New York where Heather Close raises kokedama, rare houseplants and garden-wild arrangements by hand.",
  keywords: ["La Casa Del Amor", "Heather Close", "kokedama", "houseplants", "Albany", "floral design", "garden parties"],
  authors: [{ name: "Heather Close" }],
  creator: "La Casa Del Amor",
  openGraph: {
    type: "website",
    siteName: "La Casa Del Amor",
    title: "La Casa Del Amor | Living art by Heather Close",
    description: "A house of living things. Step inside Heather's greenhouse studio in Albany, New York.",
    url: "http://lacasadelamor.app",
    images: [{ url: "http://lacasadelamor.app/story/exterior.webp", width: 1875, height: 1406, alt: "The La Casa Del Amor greenhouse" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "La Casa Del Amor | Living art by Heather Close",
    description: "A house of living things. Step inside Heather's greenhouse studio in Albany, New York.",
    images: ["http://lacasadelamor.app/story/exterior.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#06110b",
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
