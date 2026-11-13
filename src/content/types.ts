/**
 * Types for the content configuration (src/content/site.ts).
 * You normally never need to edit this file — it only describes the *shape* of your content.
 */

export type ToolStatus = "learning" | "exploring" | "used-in-project";

export interface Tool {
  name: string;
  status: ToolStatus;
  /** Optional short note, e.g. "Used for my first-semester assignment". */
  note?: string;
  /** Set to true ONLY after you have checked this entry is honest. Unreviewed tools are never shown. */
  reviewed: boolean;
}

export interface Interest {
  title: string;
  description: string;
  /** A short label shown on the card, e.g. "Technology". */
  group: string;
}

export type ProjectStatus = "In progress" | "Prototype" | "Completed" | "Archived";

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectScreenshot {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Project {
  slug: string;
  title: string;
  /** One sentence explaining the project. */
  summary: string;
  /** The problem it addresses. */
  problem: string;
  /** What YOU actually did. Be specific and honest. */
  contribution: string;
  technologies: string[];
  implementation: string;
  status: ProjectStatus;
  /** Demo, source code or documentation links. */
  links: ProjectLink[];
  screenshots?: ProjectScreenshot[];
  /** Only projects with published: true are shown anywhere (page, llms.txt, facts.json). */
  published: boolean;
}

export interface Achievement {
  title: string;
  /** Optional. Leave "" if unknown — it will simply not be shown. */
  date: string;
  /** Optional. Leave "" if there is nothing verified to add. */
  description: string;
  /** Optional link to a certificate or announcement. Leave "" if none. */
  proofUrl: string;
  published: boolean;
}

export interface SiteConfig {
  name: string;
  role: string;
  institution: string;
  institutionShort: string;
  program: string;
  field: string;
  city: string;
  location: string;
  academicYear: string;
  description: string;

  /** Hero text */
  heroLead: string;
  heroIntro: string;
  heroSupporting: string;

  /** Paragraphs shown in Station 01 — The Origin */
  about: string[];

  /** "How I work" cards on the About page. Keep them to things that are genuinely true of you. */
  approach: Array<{ title: string; text: string; icon: string }>;

  /** Closing message in Station 06 */
  closingMessage: string;

  links: {
    github: string;
    linkedin: string;
  };

  /** Optional. "" hides the resume link everywhere. */
  resumeUrl: string;
  /** Optional. "" hides the portrait everywhere. Path inside /public, e.g. "/images/om-portrait-640.webp". */
  portraitUrl: string;
  /** Optional. "" hides the "looking for" line. */
  lookingFor: string;

  projects: Project[];
  tools: Tool[];
  interests: Interest[];
  achievements: Achievement[];

  /** Names of GitHub repositories you have reviewed and want to feature, e.g. ["my-repo"]. */
  featuredRepositories: string[];

  contact: {
    /** Optional. Prefer setting NEXT_PUBLIC_FORMSPREE_URL in the environment instead. */
    formspreeUrl: string;
  };

  seo: {
    /**
     * Adds your interests to the structured data as `knowsAbout`. Off by default because
     * interests are not the same as demonstrated expertise.
     */
    includeInterestsAsKnowsAbout: boolean;
  };
}
