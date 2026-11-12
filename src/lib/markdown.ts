import { siteConfig as c } from "@/content/site";
import { stations } from "@/content/stations";
import {
  has,
  publishedAchievements,
  publishedProjects,
  reviewedTools,
  safeHttpUrl,
  toolStatusLabel,
} from "./content";
import { absoluteUrl } from "./site-url";

/**
 * Everything the AI-readable files say is generated here from the same content config
 * as the web page. Server-only (it uses the site URL).
 */

const STATUS = `${c.role} (${c.program} ${c.field}) at ${c.institution} (${c.institutionShort}), ${c.location}. Academic year ${c.academicYear}. No internship or professional employment experience.`;

export function buildFacts() {
  const resume = safeHttpUrl(c.resumeUrl);
  return {
    name: c.name,
    description: c.description,
    currentStatus: STATUS,
    institution: c.institution,
    location: c.location,
    academicYear: c.academicYear,
    links: { website: absoluteUrl("/"), github: c.links.github, linkedin: c.links.linkedin },
    resume: resume ?? "Not available yet.",
    interests: c.interests.map((i) => i.title),
    interestsNote: "Interests are areas of curiosity, not demonstrated skills.",
    tools: reviewedTools().map((t) => ({ name: t.name, status: toolStatusLabel[t.status] })),
    projects: publishedProjects().map((p) => ({
      title: p.title,
      summary: p.summary,
      status: p.status,
      links: p.links.map((l) => ({ label: l.label, url: l.url })),
    })),
    projectsNote:
      publishedProjects().length === 0
        ? "No showcase-ready projects are published yet. The project log will grow as work is built and documented."
        : undefined,
    achievements: publishedAchievements().map((a) => ({
      title: a.title,
      ...(has(a.date) ? { date: a.date } : {}),
      ...(has(a.description) ? { description: a.description } : {}),
    })),
    contact: "Via LinkedIn or GitHub. No public email address is listed.",
  };
}

export function buildPageMarkdown(): string {
  const out: string[] = [];
  out.push(`# ${c.name}`, "", `> ${c.description}`, "", STATUS, "");

  out.push(`## ${stations[0].name}`, "", ...c.about.flatMap((p) => [p, ""]));

  const achievements = publishedAchievements();
  if (achievements.length > 0) {
    out.push("### Milestones", "");
    for (const a of achievements) {
      out.push(`- ${a.title}${has(a.date) ? ` (${a.date})` : ""}${has(a.description) ? ` — ${a.description}` : ""}`);
    }
    out.push("");
  }

  out.push(`## ${stations[1].name}`, "", "Areas of curiosity. These are interests, not demonstrated skills.", "");
  for (const i of c.interests) out.push(`- **${i.title}** — ${i.description}`);
  out.push("");

  out.push(`## ${stations[2].name}`, "");
  const tools = reviewedTools();
  if (tools.length === 0) out.push("No tools are listed yet.", "");
  else {
    for (const t of tools) out.push(`- ${t.name} — ${toolStatusLabel[t.status]}${has(t.note) ? ` (${t.note})` : ""}`);
    out.push("");
  }

  out.push(`## ${stations[3].name}`, "");
  const projects = publishedProjects();
  if (projects.length === 0) {
    out.push("No showcase-ready projects are published yet. This log will grow as meaningful work is built and documented.", "");
  } else {
    for (const p of projects) {
      out.push(`### ${p.title}`, "", p.summary, "");
      out.push(`- Status: ${p.status}`, `- Problem: ${p.problem}`, `- My contribution: ${p.contribution}`);
      out.push(`- Technologies: ${p.technologies.join(", ")}`, `- Implementation: ${p.implementation}`);
      for (const l of p.links) if (safeHttpUrl(l.url)) out.push(`- [${l.label}](${l.url})`);
      out.push("");
    }
  }

  out.push(`## ${stations[4].name}`, "", `Public code: ${c.links.github}`, "");
  out.push(`## ${stations[5].name}`, "", c.closingMessage, "");
  out.push(`- GitHub: ${c.links.github}`, `- LinkedIn: ${c.links.linkedin}`);
  const resume = safeHttpUrl(c.resumeUrl);
  out.push(resume ? `- Resume: ${resume}` : "- Resume: not available yet", "");
  return out.join("\n");
}

export function buildLlmsTxt(): string {
  return [
    `# ${c.name}`,
    "",
    `> ${c.description}`,
    "",
    STATUS,
    "",
    "This is a personal portfolio called Yatra. It describes interests and learning honestly; it does not claim professional experience.",
    "",
    "## Pages",
    "",
    `- [Portfolio home](${absoluteUrl("/")}): the full journey, human-readable`,
    `- [Markdown version](${absoluteUrl("/md")}): the same content as plain Markdown`,
    `- [Facts](${absoluteUrl("/facts.json")}): structured facts as JSON`,
    "",
    "## Optional",
    "",
    `- [Full text](${absoluteUrl("/llms-full.txt")}): complete content in one file`,
    `- [GitHub](${c.links.github}): public repositories`,
    `- [LinkedIn](${c.links.linkedin}): professional profile`,
    "",
  ].join("\n");
}

export function buildLlmsFull(): string {
  return [
    buildLlmsTxt().trimEnd(),
    "",
    "---",
    "",
    buildPageMarkdown(),
    "Note: llms.txt and robots.txt are requests and conventions, not guarantees of indexing or inclusion in any answer.",
    "",
  ].join("\n");
}
