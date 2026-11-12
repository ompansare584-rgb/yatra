/**
 * The six stations of the journey. Used by the departure board, the route rail,
 * the section headings and the Markdown/AI files, so names stay consistent everywhere.
 */
export interface Station {
  id: string;
  platform: string;
  /** Title-case name used in headings. */
  name: string;
  /** Upper-case text shown on the departure board. */
  destination: string;
  /** Short board remark. */
  remark: string;
}

export const stations: readonly Station[] = [
  { id: "origin", platform: "01", name: "The Origin", destination: "THE ORIGIN", remark: "WHO I AM" },
  { id: "interests", platform: "02", name: "Interests & Ideas", destination: "INTERESTS & IDEAS", remark: "WHAT I AM CURIOUS ABOUT" },
  { id: "workshop", platform: "03", name: "The Workshop", destination: "THE WORKSHOP", remark: "TOOLS & LEARNING" },
  { id: "project-log", platform: "04", name: "Project Log", destination: "PROJECT LOG", remark: "WORK, DOCUMENTED" },
  { id: "github-express", platform: "05", name: "GitHub Express", destination: "GITHUB EXPRESS", remark: "PUBLIC CODE" },
  { id: "next-stop", platform: "06", name: "The Next Stop", destination: "THE NEXT STOP", remark: "SAY HELLO" },
];
