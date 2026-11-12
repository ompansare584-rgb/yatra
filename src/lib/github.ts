/**
 * Public GitHub repositories — browser-safe (no secrets, no process.env).
 * Called ONLY after the visitor presses the button in the GitHub Express section.
 * Everything returned by the API is treated as untrusted text: it is validated here
 * and rendered by React as plain text, never as HTML.
 */
export interface Repo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  url: string;
  fork: boolean;
  archived: boolean;
}

export type RepoResult =
  | { status: "ok"; repos: Repo[] }
  | { status: "empty" }
  | { status: "rate-limited"; resetAt?: number }
  | { status: "not-found" }
  | { status: "error" };

/** "https://github.com/someone" -> "someone". Returns null for anything that is not a plain profile URL. */
export function githubUsername(profileUrl: string): string | null {
  try {
    const url = new URL(profileUrl);
    if (url.hostname !== "github.com") return null;
    const first = url.pathname.split("/").filter(Boolean)[0];
    return first && /^[A-Za-z0-9-]{1,39}$/.test(first) ? first : null;
  } catch {
    return null;
  }
}

function text(value: unknown, max: number): string | null {
  return typeof value === "string" && value.trim() ? value.trim().slice(0, max) : null;
}

function parseRepo(item: unknown): Repo[] {
  if (typeof item !== "object" || item === null) return [];
  const r = item as Record<string, unknown>;
  const name = text(r.name, 100);
  const url = text(r.html_url, 300);
  if (typeof r.id !== "number" || !name || !url || !url.startsWith("https://github.com/")) return [];
  return [
    {
      id: r.id,
      name,
      description: text(r.description, 280),
      language: text(r.language, 40),
      url,
      fork: r.fork === true,
      archived: r.archived === true,
    },
  ];
}

export async function fetchPublicRepos(username: string, signal?: AbortSignal): Promise<RepoResult> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated&type=owner`,
      { headers: { Accept: "application/vnd.github+json" }, signal },
    );
    if (res.status === 404) return { status: "not-found" };
    if (res.status === 403 || res.status === 429) {
      const reset = Number(res.headers.get("x-ratelimit-reset"));
      return { status: "rate-limited", resetAt: Number.isFinite(reset) && reset > 0 ? reset * 1000 : undefined };
    }
    if (!res.ok) return { status: "error" };

    const data: unknown = await res.json();
    if (!Array.isArray(data)) return { status: "error" };
    const repos = data.flatMap(parseRepo);
    return repos.length > 0 ? { status: "ok", repos } : { status: "empty" };
  } catch {
    return { status: "error" };
  }
}

/** Splits repos into the ones you chose to feature, the rest, and featured names that no longer exist. */
export function splitRepos(repos: Repo[], featuredNames: readonly string[]) {
  const byName = new Map(repos.map((r) => [r.name.toLowerCase(), r]));
  const featured: Repo[] = [];
  const missing: string[] = [];
  for (const name of featuredNames) {
    const found = byName.get(name.trim().toLowerCase());
    if (found) featured.push(found);
    else if (name.trim()) missing.push(name.trim());
  }
  const featuredIds = new Set(featured.map((r) => r.id));
  return { featured, others: repos.filter((r) => !featuredIds.has(r.id)), missing };
}
