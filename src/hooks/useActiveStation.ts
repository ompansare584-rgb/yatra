"use client";

import { useEffect, useState } from "react";

/**
 * Returns the id of the station section nearest the middle of the screen
 * ("junction" is the opening screen). Uses IntersectionObserver only — no scroll listener.
 */
export function useActiveStation(): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-station]"));
    if (sections.length === 0 || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.getAttribute("data-station"));
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return active;
}
