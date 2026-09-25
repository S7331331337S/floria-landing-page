import { sculptures, site } from "@/content/story";

/**
 * The plants shown floating through "Living Sculptures".
 *
 * When the Shopify Storefront credentials are set (the same two variables the
 * shop uses), this pulls Heather's newest products automatically, so a new
 * collection appears here as soon as she publishes it in Shopify. Without
 * them, or if Shopify is unreachable, it falls back to the photos in
 * src/content/story.ts.
 *
 *   SHOPIFY_STORE_DOMAIN              e.g. la-casa-del-amor.myshopify.com
 *   SHOPIFY_STOREFRONT_ACCESS_TOKEN   Storefront API token
 */
export type CollectionPiece = { src: string; alt: string; name: string; href?: string };

const MAX = 5;

export async function getCollection(): Promise<CollectionPiece[]> {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  if (!domain || !token) return sculptures.plants;

  try {
    const res = await fetch(`https://${domain}/api/2026-04/graphql.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Shopify-Storefront-Access-Token": token },
      body: JSON.stringify({
        query: `{ products(first: ${MAX}, sortKey: CREATED_AT, reverse: true) {
          nodes { handle title featuredImage { url altText } } } }`,
      }),
      next: { revalidate: 300 },
    });
    const json = await res.json();
    const nodes: Array<{ handle: string; title: string; featuredImage: { url: string; altText: string | null } | null }> =
      json?.data?.products?.nodes ?? [];
    const shop = new URL(site.shopUrl);
    const pieces = nodes
      .filter((n) => n.featuredImage?.url)
      .map((n) => ({
        src: n.featuredImage!.url,
        alt: n.featuredImage!.altText || n.title,
        name: n.title,
        href: `${shop.origin}/products/${n.handle}`,
      }));
    // top up with local photos if the store has only a few products
    return pieces.length >= MAX ? pieces : [...pieces, ...sculptures.plants].slice(0, MAX);
  } catch {
    return sculptures.plants;
  }
}
