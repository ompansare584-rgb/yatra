import { safeHttpUrl } from "@/lib/content";

interface Props {
  href: string;
  className?: string;
  children: React.ReactNode;
}

/** A link that opens in a new tab. Renders NOTHING when the URL is empty or unsafe — never an empty link. */
export default function ExternalLink({ href, className, children }: Props) {
  const safe = safeHttpUrl(href);
  if (!safe) return null;
  return (
    <a href={safe} className={className} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
