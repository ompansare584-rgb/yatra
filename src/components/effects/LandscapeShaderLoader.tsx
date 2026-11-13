"use client";

import dynamic from "next/dynamic";
import ErrorBoundary from "@/components/ui/ErrorBoundary";

// The WebGL sky is its own chunk, never part of the first load.
const LandscapeShader = dynamic(() => import("./LandscapeShader"), { ssr: false });

export default function LandscapeShaderLoader() {
  return (
    <ErrorBoundary>
      <LandscapeShader />
    </ErrorBoundary>
  );
}
