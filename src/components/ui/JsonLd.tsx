import { jsonLdToString } from "@/lib/structured-data";

/** JSON-LD from OUR verified content only (never third-party data); "<" is escaped so it cannot close the tag. */
export default function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdToString(data) }} />;
}
