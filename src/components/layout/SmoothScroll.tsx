"use client";

import { useEffect } from "react";
import { shouldSimplifyMotion } from "@/lib/capabilities";
import { loadGsap } from "@/lib/gsap";

/**
 * Progressive smooth-scroll enhancement with Lenis, driven by GSAP's ticker so that
 * ScrollTrigger and Lenis never compete. It only runs on desktop-class devices with a mouse,
 * and only after the page has loaded and gone idle. Phones, reduced motion, Save-Data and
 * low-power devices keep native scrolling and never download Lenis or GSAP for this.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (shouldSimplifyMotion()) return;
    if (!window.matchMedia("(min-width: 64em) and (pointer: fine)").matches) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      try {
        const { gsap, ScrollTrigger } = await loadGsap();
        const { default: Lenis } = await import("lenis");
        if (cancelled) return;

        const lenis = new Lenis({ lerp: 0.1 });
        lenis.on("scroll", ScrollTrigger.update);
        const tick = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        // In-page links (departure board, route rail, skip link): scroll smoothly, then move keyboard focus.
        const onClick = (event: MouseEvent) => {
          if (event.defaultPrevented || event.button !== 0) return;
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
          const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
          if (!link) return;
          const id = decodeURIComponent(link.getAttribute("href")!.slice(1));
          const target = id ? document.getElementById(id) : document.body;
          if (!target) return;
          event.preventDefault();
          lenis.scrollTo(id ? target : 0, { offset: -72 });
          history.replaceState(null, "", id ? `#${id}` : window.location.pathname);
          target.focus({ preventScroll: true });
        };
        document.addEventListener("click", onClick);

        cleanup = () => {
          document.removeEventListener("click", onClick);
          gsap.ticker.remove(tick);
          gsap.ticker.lagSmoothing(500, 33);
          lenis.destroy();
        };
      } catch {
        // Lenis or GSAP failed to load: native scrolling continues to work.
      }
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return null;
}
