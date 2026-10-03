/**
 * Contact channels, social profiles and the newsletter endpoint for the footer.
 * Mirrors lib/site.ts in the shop (S7331331337S/casa-amor), so keep the two in step.
 */

/**
 * The only public studio address. A catch-all on lacasadelamor.app forwards to
 * Heather's private inbox; never put that private address in this (public) repo.
 */
export const CONTACT_EMAIL = "hello@lacasadelamor.app";
export const PHONE_TEL = "+15183311423";
export const PHONE_DISPLAY = "(518) 331-1423";
export const CONTACT_PAGE = "https://www.lacasadelamor.app/contact";

/**
 * Newsletter signups post to the shop's endpoint, which creates a Shopify customer
 * (acceptsMarketing: true) in the store Heather sells from. This project's own
 * Shopify env vars point at a different store, so it doesn't call Shopify itself.
 */
export const NEWSLETTER_ENDPOINT =
  process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT || "https://www.lacasadelamor.app/api/newsletter";

export type SocialPlatform = "instagram" | "facebook" | "tiktok" | "pinterest";
export type SocialProfile = { platform: SocialPlatform; label: string; url: string };

/**
 * Profiles confirmed as Heather's. These are the only ones the footer renders.
 * As of Oct 3, 2026 none are verified. The old footer link went to instagram.com's home page.
 */
export const VERIFIED_SOCIAL_PROFILES: SocialProfile[] = [];

/**
 * TODO(heather): UNVERIFIED. These are never rendered. Confirm each handle with Heather,
 * then move it to VERIFIED_SOCIAL_PROFILES.
 * - instagram.com/lacasadelamor and /lacasadelamor_ belong to a retreat in Peru (lacasadelamor.ca). Do NOT use them.
 * - instagram.com/lacasadelamor2020 and facebook.com/543567292666098 belong to a flower shop in Peru. Do NOT use them.
 */
export const UNVERIFIED_SOCIAL_HANDLES_TODO: Record<SocialPlatform, string | null> = {
  instagram: null,
  facebook: null,
  tiktok: null,
  pinterest: null,
};
