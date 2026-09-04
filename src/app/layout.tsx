import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lacasadelamor.com"),
  title: {
    default: "La Casa Del Amor | Floral Design & Arrangements",
    template: "%s | La Casa Del Amor",
  },
  description:
    "La Casa Del Amor creates exquisite floral arrangements, wedding flowers, and modern botanical designs for unforgettable moments.",
  keywords: [
    "La Casa Del Amor",
    "floral design",
    "flower arrangements",
    "wedding flowers",
    "botanical design",
  ],
  authors: [{ name: "La Casa Del Amor" }],
  creator: "La Casa Del Amor",
  openGraph: {
    type: "website",
    siteName: "La Casa Del Amor",
    title: "La Casa Del Amor | Floral Design & Arrangements",
    description:
      "Exquisite floral arrangements and modern botanical designs for unforgettable moments.",
    url: "https://lacasadelamor.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "La Casa Del Amor | Floral Design & Arrangements",
    description:
      "Exquisite floral arrangements and modern botanical designs for unforgettable moments.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground font-sans selection:bg-emerald-200 selection:text-emerald-950 overflow-x-hidden`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
