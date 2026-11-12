"use client";

import clsx from "clsx";
import { useEffect, useRef } from "react";
import { stations } from "@/content/stations";
import { useActiveStation } from "@/hooks/useActiveStation";
import { shouldSimplifyMotion } from "@/lib/capabilities";
import { loadGsap } from "@/lib/gsap";
import s from "./RouteRail.module.scss";

/**
 * The railway route that fills as you scroll.
 *  - Wide screens: a vertical rail of numbered station roundels (real links).
 *  - Small screens: a thin progress bar along the top.
 * Active stations are marked even with reduced motion; only the scroll-linked fill is skipped.
 */
export default function RouteRail() {
  const active = useActiveStation();
  const railFill = useRef<HTMLSpanElement>(null);
  const barFill = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (shouldSimplifyMotion()) return;

    let cancelled = false;
    let kill: (() => void) | undefined;

    loadGsap()
      .then(({ gsap, ScrollTrigger }) => {
        if (cancelled || !railFill.current || !barFill.current) return;

        const sections = stations
          .map((st) => document.getElementById(st.id))
          .filter((el): el is HTMLElement => el !== null);
        if (sections.length < 2) return;

        const setRail = gsap.quickSetter(railFill.current, "scaleY") as (v: number) => void;
        const setBar = gsap.quickSetter(barFill.current, "scaleX") as (v: number) => void;

        let tops: number[] = [];
        const measure = () => {
          tops = sections.map((el) => el.getBoundingClientRect().top + window.scrollY);
        };

        // 0 = first station, 1 = last station, interpolated between stations so the fill lines up with the roundels.
        const update = () => {
          const y = window.scrollY + window.innerHeight * 0.45;
          const last = tops.length - 1;
          let progress = 0;
          if (y >= tops[last]) progress = 1;
          else if (y > tops[0]) {
            for (let i = 0; i < last; i++) {
              if (y >= tops[i] && y < tops[i + 1]) {
                progress = (i + (y - tops[i]) / (tops[i + 1] - tops[i])) / last;
                break;
              }
            }
          }
          setRail(progress);
          setBar(progress);
        };

        const trigger = ScrollTrigger.create({
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          onUpdate: update,
          onRefresh: () => {
            measure();
            update();
          },
        });
        measure();
        update();
        kill = () => trigger.kill();
      })
      .catch(() => {
        // GSAP failed to load: the route simply does not animate.
      });

    return () => {
      cancelled = true;
      kill?.();
    };
  }, []);

  return (
    <>
      <div className={s.bar} aria-hidden="true">
        <span ref={barFill} className={s.barFill} />
      </div>
      <nav className={s.rail} aria-label="Journey route">
        <span className={s.track} aria-hidden="true">
          <span ref={railFill} className={s.fill} />
        </span>
        <ol className={s.stops}>
          {stations.map((station) => {
            const isActive = active === station.id;
            return (
              <li key={station.id}>
                <a
                  href={`#${station.id}`}
                  className={clsx(s.stop, isActive && s.active)}
                  aria-label={`Station ${station.platform}: ${station.name}`}
                  aria-current={isActive ? "location" : undefined}
                  title={station.name}
                >
                  {station.platform}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
