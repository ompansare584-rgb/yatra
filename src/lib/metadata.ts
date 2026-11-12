import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { getSiteUrl } from "./site-url";

export const siteTitle = `${siteConfig.name} — ${siteConfig.role}`;

export function buildMetadata(): Metadata {
  return {
    metadataBase: new URL(getSiteUrl()),
    title: { default: siteTitle, template: `%s · ${siteConfig.name}` },
    description: siteConfig.description,
    applicationName: "Yatra",
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    alternates: {
      canonical: "/",
      // Adds <link rel="alternate" type="text/markdown" href="/md"> for AI readers.
      types: { "text/markdown": "/md" },
    },
    openGraph: {
      type: "website",
      url: "/",
      siteName: `Yatra — ${siteConfig.name}`,
      title: siteTitle,
      description: siteConfig.description,
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: siteConfig.description,
    },
    robots: { index: true, follow: true },
  };
}
