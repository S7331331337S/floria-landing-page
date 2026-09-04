import type { MetadataRoute } from "next";
import { JOURNAL_POSTS, SITE } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = ["", "/collections", "/weddings", "/studio", "/journal", "/contact"].map(
        (route) => ({
            url: `${SITE.url}${route}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: route === "" ? 1 : 0.8,
        })
    );

    const posts = JOURNAL_POSTS.map((post) => ({
        url: `${SITE.url}/journal/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "yearly" as const,
        priority: 0.6,
    }));

    return [...routes, ...posts];
}
