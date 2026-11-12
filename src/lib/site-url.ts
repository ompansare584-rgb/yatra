import "server-only";

/**
 * Server-only. The final site origin used for canonical URLs, sitemap, Open Graph and JSON-LD.
 * This file must never be imported from a client component (the "server-only" import
 * makes the build fail if that happens by mistake).
 */
const FALLBACK = "http://localhost:3000";

export function getSiteUrl(): string {
  const raw =
    process.env.SITE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : FALLBACK);

  try {
    return new URL(raw).origin;
  } catch {
    return FALLBACK;
  }
}

export function absoluteUrl(path = "/"): string {
  return new URL(path, getSiteUrl()).toString();
}
