/**
 * Loads GSAP + ScrollTrigger once, on demand, in the browser — and only AFTER the page has
 * finished loading and the browser is idle. That keeps the animation libraries out of the
 * critical path (first paint, LCP, blocking time) entirely.
 */
function afterLoadAndIdle(): Promise<void> {
  return new Promise((resolve) => {
    const idle = () => {
      if ("requestIdleCallback" in window) window.requestIdleCallback(() => resolve(), { timeout: 3000 });
      else setTimeout(resolve, 1500);
    };
    if (document.readyState === "complete") idle();
    else window.addEventListener("load", idle, { once: true });
  });
}

async function init() {
  await afterLoadAndIdle();
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
  gsap.registerPlugin(ScrollTrigger);
  // Fonts change text height; recalculate trigger positions once they have loaded.
  void document.fonts?.ready.then(() => ScrollTrigger.refresh());
  return { gsap, ScrollTrigger };
}

let cached: ReturnType<typeof init> | null = null;

export function loadGsap() {
  cached ??= init();
  return cached;
}
