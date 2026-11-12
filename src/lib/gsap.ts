/**
 * Loads GSAP + ScrollTrigger once, on demand, in the browser.
 * Every animated component calls loadGsap() instead of importing GSAP at the top of its file,
 * so the library stays out of the first-load JavaScript and is shared by all of them.
 */
async function init() {
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
