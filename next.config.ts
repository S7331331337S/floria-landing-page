import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // product photos from Heather's Shopify store (see src/lib/collection.ts)
    remotePatterns: [{ protocol: "https", hostname: "cdn.shopify.com" }],
  },
};

export default nextConfig;
