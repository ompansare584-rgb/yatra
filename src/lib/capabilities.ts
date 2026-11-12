/**
 * Browser-only helpers that decide how much motion a visitor should get.
 * Nothing here reads environment variables.
 */
type NavigatorExtras = Navigator & {
  connection?: { saveData?: boolean };
  deviceMemory?: number;
};

/** True when animation should be removed or simplified: reduced motion, Save-Data, or a low-power device. */
export function shouldSimplifyMotion(): boolean {
  if (typeof window === "undefined") return true;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;

  const nav = navigator as NavigatorExtras;
  if (nav.connection?.saveData) return true;
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 2) return true;
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) return true;
  return false;
}

/** The WebGL sky is only for wide screens with a capable device that are allowed full motion. */
export function canUseShaderScene(): boolean {
  return (
    !shouldSimplifyMotion() &&
    window.matchMedia("(min-width: 64em)").matches &&
    (navigator.hardwareConcurrency ?? 0) >= 4
  );
}
