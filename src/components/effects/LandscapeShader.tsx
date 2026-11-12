"use client";

import { useEffect, useRef, useState } from "react";
import { canUseShaderScene } from "@/lib/capabilities";
import { fragmentShader, vertexShader } from "./shaders";
import s from "./Landscape.module.scss";

/**
 * Optional WebGL sky. Everything about it is "only if it is safe":
 *  - not rendered for reduced motion, Save-Data, low-power devices or small screens;
 *  - Three.js is downloaded only when the window scrolls near the screen;
 *  - renders at reduced resolution, at most ~30 fps, and only while visible;
 *  - every GPU resource is disposed on unmount;
 *  - if anything fails, the CSS gradient underneath simply stays.
 */
export default function LandscapeShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canUseShaderScene()) return;

    let cancelled = false;
    let teardown: (() => void) | undefined;

    const start = async () => {
      try {
        const { WebGLRenderer, PlaneGeometry, ShaderMaterial, Scene, Mesh, Camera, Vector2 } = await import("three");
        if (cancelled) return;

        const renderer = new WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: "low-power" });
        const geometry = new PlaneGeometry(2, 2);
        const material = new ShaderMaterial({
          vertexShader,
          fragmentShader,
          uniforms: {
            uTime: { value: 0 },
            uRes: { value: new Vector2(1, 1) },
            uDark: { value: 0 },
          },
          depthTest: false,
          depthWrite: false,
        });
        const scene = new Scene();
        scene.add(new Mesh(geometry, material));
        const camera = new Camera();

        // A fraction of the real pixel density: the sky is soft, so nobody can tell.
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1) * 0.6);

        const resize = () => {
          const { clientWidth: w, clientHeight: h } = canvas;
          renderer.setSize(w, h, false);
          material.uniforms.uRes.value.set(w, h);
        };
        resize();
        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(canvas);

        let visible = false;
        let frame = 0;
        let last = 0;
        let elapsed = 0;

        const draw = (now: number) => {
          frame = 0;
          if (!visible || document.hidden) return;
          const dt = now - last;
          if (dt >= 33) {
            elapsed += last === 0 ? 0 : dt / 1000;
            last = now;
            material.uniforms.uTime.value = elapsed;
            renderer.render(scene, camera);
          }
          frame = requestAnimationFrame(draw);
        };
        const play = () => {
          if (!frame && visible && !document.hidden) {
            last = 0;
            frame = requestAnimationFrame(draw);
          }
        };

        const visibility = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
          if (visible) play();
        });
        visibility.observe(canvas);
        document.addEventListener("visibilitychange", play);

        renderer.render(scene, camera); // first frame, then fade the canvas in
        setReady(true);

        teardown = () => {
          if (frame) cancelAnimationFrame(frame);
          visibility.disconnect();
          resizeObserver.disconnect();
          document.removeEventListener("visibilitychange", play);
          geometry.dispose();
          material.dispose();
          renderer.dispose();
          renderer.forceContextLoss();
        };
      } catch {
        // No WebGL, or Three.js failed to load: the CSS sky stays.
      }
    };

    // Only fetch Three.js when the window is about to be seen.
    const gate = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gate.disconnect();
          void start();
        }
      },
      { rootMargin: "300px" },
    );
    gate.observe(canvas);

    return () => {
      cancelled = true;
      gate.disconnect();
      teardown?.();
    };
  }, []);

  return <canvas ref={canvasRef} className={ready ? `${s.canvas} ${s.canvasReady}` : s.canvas} aria-hidden="true" />;
}
