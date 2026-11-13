import type { MetadataRoute } from "next";
import { publishedProjects } from "@/lib/content";
import { absoluteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/about", "/projects", "/github", "/contact", ...publishedProjects().map((p) => `/projects/${p.slug}`)];
  return paths.map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));
}
