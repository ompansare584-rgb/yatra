"use client";

import { useEffect } from "react";
import { shouldSimplifyMotion } from "@/lib/capabilities";
import { loadGsap } from "@/lib/gsap";

/**
 * Gentle section reveals. Anything marked data-reveal fades up once as it enters the screen.
 * Elements are only hidden AFTER this script has loaded, so with JavaScript off, reduced motion,
 * or a failed download, all content is simply visible.
 */
export default function Reveals() {
  useEffect(() => {
    if (shouldSimplifyMotion()) return;

    let cancelled = false;
    let revert: (() => void) | undefined;

    loadGsap()
      .then(({ gsap, ScrollTrigger }) => {
        if (cancelled) return;
        const ctx = gsap.context(() => {
          const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
          if (items.length === 0) return;
          gsap.set(items, { opacity: 0, y: 16 });
          ScrollTrigger.batch(items, {
            start: "top 94%",
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power2.out",
                stagger: 0.08,
                overwrite: true,
                clearProps: "transform",
              }),
          });
        });
        revert = () => ctx.revert();
      })
      .catch(() => {
        // GSAP failed to load: nothing was hidden, so nothing to undo.
      });

    return () => {
      cancelled = true;
      revert?.();
    };
  }, []);

  return null;
}
