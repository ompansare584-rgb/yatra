import { buildPageMarkdown } from "@/lib/markdown";

export const dynamic = "force-static";

// Markdown version of the home page. Also served for `Accept: text/markdown` requests to "/"
// through the rewrite in next.config.mjs.
export function GET() {
  return new Response(buildPageMarkdown(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8", Vary: "Accept" },
  });
}
