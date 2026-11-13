"use client";

import { useRef } from "react";

type Animate = (typeof import("framer-motion/dom"))["animate"];

/**
 * A gentle 3D tilt for the ticket that follows the mouse. Framer Motion's small DOM `animate`
 * is downloaded only the first time a mouse hovers the ticket — touch screens, keyboards and
 * reduced-motion visitors never load it. The ticket itself is server-rendered inside this wrapper.
 */
export default function TicketTilt({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const animateRef = useRef<Animate | null>(null);

  const allowed = (event: React.PointerEvent) =>
    event.pointerType === "mouse" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  async function onEnter(event: React.PointerEvent<HTMLDivElement>) {
    if (!allowed(event) || animateRef.current) return;
    try {
      animateRef.current = (await import("framer-motion/dom")).animate;
    } catch {
      // Download failed: the ticket simply does not tilt.
    }
  }

  function onMove(event: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    const animate = animateRef.current;
    if (!el || !animate || !allowed(event)) return;
    const box = el.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    animate(el, { transformPerspective: 900, rotateY: x * 7, rotateX: -y * 7 }, { type: "spring", stiffness: 180, damping: 20 });
  }

  function onLeave() {
    const el = ref.current;
    if (el && animateRef.current) {
      animateRef.current(el, { rotateX: 0, rotateY: 0 }, { type: "spring", stiffness: 180, damping: 20 });
    }
  }

  return (
    <div ref={ref} onPointerEnter={onEnter} onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
    </div>
  );
}
