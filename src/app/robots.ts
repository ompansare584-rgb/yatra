import type { MetadataRoute } from "next";
import { crawlerPolicy } from "@/content/crawlers";
import { absoluteUrl } from "@/lib/site-url";

/** Built from src/content/crawlers.ts — edit the policy there, not here. */
export default function robots(): MetadataRoute.Robots {
  const groups = Object.values(crawlerPolicy).flatMap((group) => Object.entries(group));

  return {
    rules: [
      ...groups.map(([userAgent, allowed]) => ({
        userAgent,
        ...(allowed ? { allow: "/" } : { disallow: "/" }),
      })),
      { userAgent: "*", allow: "/" },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
