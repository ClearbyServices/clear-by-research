import type { MetadataRoute } from "next";

// Place this file at: app/robots.ts (or src/app/robots.ts)
// Do NOT also keep a file at public/robots.txt - that one overrides this.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/search/", "/*?"],
      },
    ],
    sitemap: "https://www.clearbyresearch.com/sitemap.xml",
  };
}