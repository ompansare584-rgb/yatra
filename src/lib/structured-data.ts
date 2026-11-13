import { siteConfig } from "@/content/site";
import { has, publishedAchievements, safeHttpUrl } from "./content";
import { absoluteUrl } from "./site-url";

/**
 * JSON-LD generated from the same content config as everything else.
 * Nothing here is invented: no jobTitle, no employer, no credentials.
 */
export function buildJsonLd() {
  const siteUrl = absoluteUrl("/");
  const personId = `${siteUrl}#person`;
  const websiteId = `${siteUrl}#website`;

  const sameAs = [siteConfig.links.github, siteConfig.links.linkedin]
    .map((u) => safeHttpUrl(u))
    .filter((u): u is string => Boolean(u));

  const awards = publishedAchievements().map((a) => a.title);

  const person: Record<string, unknown> = {
    "@type": "Person",
    "@id": personId,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteUrl,
    sameAs,
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: siteConfig.institution,
    },
    homeLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.city,
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
    },
  };

  if (has(siteConfig.portraitUrl)) person.image = absoluteUrl(siteConfig.portraitUrl);
  if (awards.length > 0) person.award = awards;
  if (siteConfig.seo.includeInterestsAsKnowsAbout && siteConfig.interests.length > 0) {
    person.knowsAbout = siteConfig.interests.map((i) => i.title);
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      person,
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: `Yatra — ${siteConfig.name}`,
        description: siteConfig.description,
        inLanguage: "en",
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}#profilepage`,
        url: siteUrl,
        name: `${siteConfig.name} — ${siteConfig.role}`,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
      },
    ],
  };
}

/** Serialises JSON-LD safely for a <script> tag (escapes `<` so it can never close the tag). */
export function jsonLdToString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** BreadcrumbList for inner pages, e.g. Home > About. */
export function buildBreadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
