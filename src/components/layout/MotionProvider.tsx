"use client";

import { LazyMotion } from "framer-motion";

// The animation features are fetched only when first needed (keeps first-load JS small).
const loadFeatures = () => import("./motionFeatures").then((mod) => mod.default);

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
