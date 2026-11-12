import { buildFacts } from "@/lib/markdown";

export const dynamic = "force-static";

export function GET() {
  return Response.json(buildFacts());
}
