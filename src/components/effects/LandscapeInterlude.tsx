"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import { shouldSimplifyMotion } from "@/lib/capabilities";
import { loadGsap } from "@/lib/gsap";
import s from "./Landscape.module.scss";

const LandscapeShader = dynamic(() => import("./LandscapeShader"), { ssr: false });

/** One hill silhouette that tiles seamlessly (same height at both ends). */
const HILLS = {
  far: "M0 210 C120 150 240 150 360 190 S560 235 700 180 S900 140 1040 185 S1260 235 1400 170 S1520 160 1600 210 V300 H0 Z",
  mid: "M0 235 C140 190 260 200 380 225 S600 265 740 220 S940 185 1080 225 S1300 270 1440 225 S1560 215 1600 235 V300 H0 Z",
  near: "M0 262 C160 240 300 244 440 258 S700 280 860 258 S1100 238 1250 258 S1500 276 1600 262 V300 H0 Z",
};

/**
 * The window-seat interlude between Station 02 and 03: a train window onto a layered landscape.
 * Purely decorative (aria-hidden). Each layer slides sideways at its own speed as the section
 * scrolls past; with reduced motion the scene is simply static.
 */
export default function LandscapeInterlude() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || shouldSimplifyMotion()) return;

    let cancelled = false;
    let revert: (() => void) | undefined;

    loadGsap()
      .then(({ gsap }) => {
        if (cancelled) return;
        const ctx = gsap.context(() => {
          gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((layer) => {
            gsap.to(layer, {
              xPercent: -Number(layer.dataset.speed),
              ease: "none",
              scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true },
            });
          });
        }, root);
        revert = () => ctx.revert();
      })
      .catch(() => {
        // GSAP failed to load: the landscape stays still.
      });

    return () => {
      cancelled = true;
      revert?.();
    };
  }, []);

  return (
    <div ref={rootRef} className={s.interlude} aria-hidden="true">
      <div className="container">
        <div className={s.window}>
          <div className={s.glass}>
            <ErrorBoundary>
              <LandscapeShader />
            </ErrorBoundary>

            {/* Layers are 160% wide so they can slide without ever showing an edge. */}
            <svg className={s.layer} data-speed="8" viewBox="0 0 1600 300" preserveAspectRatio="none" focusable="false">
              <path d={HILLS.far} fill="var(--land-far)" />
            </svg>
            <svg className={s.layer} data-speed="16" viewBox="0 0 1600 300" preserveAspectRatio="none" focusable="false">
              <path d={HILLS.mid} fill="var(--land-mid)" />
            </svg>
            <svg className={s.layer} data-speed="30" viewBox="0 0 1600 300" preserveAspectRatio="none" focusable="false">
              <path d={HILLS.near} fill="var(--land-near)" />
              {/* Telegraph poles and wire along the nearest hill. */}
              <g stroke="var(--land-near)" strokeWidth="5" fill="none">
                {[160, 480, 800, 1120, 1440].map((x) => (
                  <g key={x}>
                    <path d={`M${x} 262 V170 M${x - 16} 182 H${x + 16}`} />
                  </g>
                ))}
                <path strokeWidth="1.5" d="M160 182 Q320 206 480 182 T800 182 T1120 182 T1440 182" />
              </g>
            </svg>
            {/* A single signal lamp on the horizon. */}
            <span className={s.lamp} />
          </div>
          <span className={s.mullion} />
        </div>
        <p className={s.caption}>Between stations</p>
      </div>
    </div>
  );
}
