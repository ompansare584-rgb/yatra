"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import s from "./SiteHeader.module.scss";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/github", label: "GitHub" },
  { href: "/contact", label: "Contact" },
];

/** Sticky top bar. On small screens the links fold into a menu button (works with a keyboard, closes on Escape). */
export default function SiteHeader() {
  const pathname = usePathname();
  // The menu is "open for" one path; navigating to another page closes it without an effect.
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenFor(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={s.header}>
      <div className={clsx("container", s.bar)}>
        <Link href="/" className={s.brand} aria-label="Yatra, Om Pansare — home">
          <svg className={s.mark} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
            <circle cx="32" cy="40" r="15" fill="#F59E1B" />
            <path d="M18 12 L32 32 L46 12" fill="none" stroke="#FFF3DC" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M32 32 V54" fill="none" stroke="#FFF3DC" strokeWidth="6" strokeLinecap="round" />
          </svg>
          <span>Yatra</span>
          <span lang="mr" className={s.brandMr}>
            यात्रा
          </span>
        </Link>

        <button
          type="button"
          className={s.toggle}
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpenFor(open ? null : pathname)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true" focusable="false">
            {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>

        <nav aria-label="Main">
          <ul id="site-menu" className={clsx(s.menu, open && s.open)}>
            {LINKS.map((link) => {
              const current = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link href={link.href} className={clsx(s.link, current && s.current)} aria-current={current ? "page" : undefined}>
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
