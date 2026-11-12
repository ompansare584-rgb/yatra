import { siteConfig } from "@/content/site";
import type { Achievement, Project, Tool, ToolStatus } from "@/content/types";

/** True when a value is a non-empty string. Used so empty config fields never render. */
export function has(value: string | null | undefined): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/** Only allows http(s) links so a typo in the config can never become a `javascript:` link. */
export function safeHttpUrl(value: string | null | undefined): string | undefined {
  if (!has(value)) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

export function publishedProjects(): Project[] {
  return siteConfig.projects.filter((p) => p.published);
}

export function reviewedTools(): Tool[] {
  return siteConfig.tools.filter((t) => t.reviewed && has(t.name));
}

export function publishedAchievements(): Achievement[] {
  return siteConfig.achievements.filter((a) => a.published && has(a.title));
}

export const toolStatusLabel: Record<ToolStatus, string> = {
  learning: "Currently learning",
  exploring: "Exploring",
  "used-in-project": "Used in a project",
};

export const toolStatusOrder: ToolStatus[] = ["used-in-project", "learning", "exploring"];
