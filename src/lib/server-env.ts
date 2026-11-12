import "server-only";
import { siteConfig } from "@/content/site";
import { has } from "./content";

/**
 * Server-only. Resolves the Formspree endpoint and passes it to the contact section as a prop,
 * so no browser-imported file ever reads `process.env`.
 * Returns "" (form hidden) unless the value is a genuine Formspree URL.
 */
export function getFormspreeUrl(): string {
  const candidate = has(siteConfig.contact.formspreeUrl)
    ? siteConfig.contact.formspreeUrl
    : (process.env.NEXT_PUBLIC_FORMSPREE_URL ?? "");

  try {
    const url = new URL(candidate.trim());
    return url.protocol === "https:" && url.hostname === "formspree.io" && url.pathname.startsWith("/f/")
      ? url.toString()
      : "";
  } catch {
    return "";
  }
}
