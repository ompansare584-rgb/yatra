/**
 * ============================================================================
 *  YATRA — YOUR CONTENT LIVES HERE
 * ============================================================================
 *  Edit this file to change what the website says. You should not need to touch
 *  any component for ordinary updates.
 *
 *  OPTIONAL fields (safe to leave as "" or []):
 *    resumeUrl, portraitUrl, lookingFor, projects, tools, interests,
 *    achievements (and each achievement's date / description / proofUrl),
 *    featuredRepositories, contact.formspreeUrl
 *
 *  Rules this site follows:
 *    - Empty fields never render. Nothing fake is shown to fill space.
 *    - Projects only appear when `published: true`.
 *    - Tools only appear when `reviewed: true`.
 *    - Achievements only appear when `published: true`.
 * ============================================================================
 */
import type { SiteConfig } from "./types";

export const siteConfig: SiteConfig = {
  name: "Om Pansare",

  role: "First-year Computer Science Engineering student",

  institution: "Vishwakarma Institute of Technology",
  institutionShort: "VIT Pune",
  program: "B.Tech",
  field: "Computer Science Engineering",

  city: "Pune",
  location: "Pune, Maharashtra, India",
  academicYear: "2026–27",

  description:
    "A curious engineering student interested in software, AI, and thoughtful digital experiences.",

  // --- Hero (the first screen) -------------------------------------------------
  heroLead: "First-year Computer Science Engineering student at VIT Pune.",
  heroIntro:
    "Interested in technology, software, AI, and building thoughtful digital experiences.",
  heroSupporting:
    "I learn by building — and I would rather let the work speak than announce it.",

  // --- Station 01: The Origin --------------------------------------------------
  about: [
    "I am a first-year B.Tech student in Computer Science Engineering at Vishwakarma Institute of Technology (VIT Pune), based in Pune, Maharashtra.",
    "I am curious about how technology works, and I like using that understanding to build useful things. I learn best by building, and I believe the work itself should speak louder than any announcement.",
    "I am at the beginning of my engineering journey — learning, exploring, and working towards something meaningful. This site will grow as the work does.",
  ],

  // --- About page: "How I work" -----------------------------------------------
  // icon: "Compass" | "Build" | "Pulse" | "Technology" | "Design" | "Culture" | "Personal"
  approach: [
    {
      icon: "Compass",
      title: "Curious about how things work",
      text: "I like understanding how technology works before I use it to build something useful.",
    },
    {
      icon: "Build",
      title: "Learning by building",
      text: "I would rather learn by making things than by making claims about them.",
    },
    {
      icon: "Pulse",
      title: "Let the work speak",
      text: "I prefer understated confidence. The work should speak louder than any announcement.",
    },
  ],

  // --- Station 06: The Next Stop ----------------------------------------------
  closingMessage:
    "The journey is ongoing. There is always another idea to explore, another problem to understand, and something new to build.",

  links: {
    github: "https://github.com/ompansare584-rgb",
    linkedin: "https://www.linkedin.com/in/om-pansare-934bb2301",
  },

  // --- Optional ------------------------------------------------------------------
  resumeUrl: "", // add when your resume is ready
  portraitUrl: "/images/om-portrait-640.webp",
  lookingFor: "", // e.g. "Open to learning-focused internships" — only when you decide

  // --- Station 04: Project Log -------------------------------------------------
  // Add a project only when it is genuinely showcase-ready. Example shape:
  //
  // {
  //   slug: "my-project",
  //   title: "My Project",
  //   summary: "One sentence about what it is.",
  //   problem: "The problem it addresses.",
  //   contribution: "What I personally built or decided.",
  //   technologies: ["..."],
  //   implementation: "How it works, briefly.",
  //   status: "In progress",
  //   links: [{ label: "Source code", url: "https://github.com/..." }],
  //   published: true,
  // }
  projects: [],

  // --- Station 03: The Workshop ------------------------------------------------
  // Only tools you genuinely use or are learning. Example shape:
  //   { name: "Python", status: "learning", reviewed: true }
  // status: "learning" | "exploring" | "used-in-project"
  tools: [],

  // --- Station 02: Interests & Ideas -------------------------------------------
  interests: [
    {
      title: "Software & emerging technology",
      description:
        "Understanding how software works, and paying attention to where technology is heading.",
      group: "Technology",
    },
    {
      title: "AI & digital innovation",
      description:
        "Curious about how artificial intelligence is changing what software can do.",
      group: "Technology",
    },
    {
      title: "Creative interfaces & design",
      description:
        "Thoughtful visual design, and the places where design and engineering meet.",
      group: "Design",
    },
    {
      title: "Gaming & digital culture",
      description: "Gaming, and the wider culture that grows around technology.",
      group: "Culture",
    },
    {
      title: "Beyond the screen",
      description: "Indian classical music, and playing the flute as a hobby.",
      group: "Personal",
    },
  ],

  // --- Milestones (shown inside Station 01) ------------------------------------
  achievements: [
    {
      title: "3rd Place — Geek Fiesta Ideathon",
      date: "",
      description: "",
      proofUrl: "",
      published: true,
    },
  ],

  // --- Station 05: GitHub Express ----------------------------------------------
  // Repository NAMES you have reviewed and want to feature, e.g. ["my-repo"].
  // When empty, visitors can still load a plain, clearly-labelled list of public repositories.
  featuredRepositories: [],

  contact: {
    formspreeUrl: "",
  },

  seo: {
    includeInterestsAsKnowsAbout: false,
  },
};
