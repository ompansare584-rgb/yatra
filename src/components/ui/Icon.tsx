const ICONS: Record<string, React.ReactNode> = {
  // Technology: code brackets
  Technology: (
    <>
      <path d="m8 7-5 5 5 5" />
      <path d="m16 7 5 5-5 5" />
      <path d="m13.5 5-3 14" />
    </>
  ),
  // Design: sparkle
  Design: <path d="M12 3l2.2 5.3L20 9l-4.3 3.8 1.3 5.7L12 15.6 7 18.5l1.3-5.7L4 9l5.8-.7z" />,
  // Culture: game controller
  Culture: (
    <>
      <rect x="3" y="8" width="18" height="10" rx="5" />
      <path d="M8 11v4M6 13h4" />
      <circle cx="15.5" cy="12" r=".8" />
      <circle cx="17.5" cy="14" r=".8" />
    </>
  ),
  // Personal: music note
  Personal: (
    <>
      <path d="M9 18V6l10-2v12" />
      <circle cx="7" cy="18" r="2.5" />
      <circle cx="17" cy="16" r="2.5" />
    </>
  ),
  // Medal
  Medal: (
    <>
      <circle cx="12" cy="9" r="5" />
      <path d="m9 13-2 8 5-3 5 3-2-8" />
    </>
  ),
};

/** Small line icons for the interest groups. Unknown group names fall back to the code icon. */
export default function Icon({ name, className }: { name: string; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {ICONS[name] ?? ICONS.Technology}
    </svg>
  );
}
