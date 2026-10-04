import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "La Casa Del Amor",
    short_name: "La Casa",
    description: "Kokedama, mounted plants and exotic houseplant arrangements, handmade in Albany, New York.",
    start_url: "/",
    display: "standalone",
    background_color: "#F3EDE2",
    theme_color: "#2C3E2B",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
