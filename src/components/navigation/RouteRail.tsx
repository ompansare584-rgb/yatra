"use client";

import clsx from "clsx";
import { useEffect, useRef } from "react";
import { stations } from "@/content/stations";
import { useActiveStation } from "@/hooks/useActiveStation";
import { shouldSimplifyMotion } from "@/lib/capabilities";
import { loadGsap } from "@/lib/gsap";
import s from "./RouteRail.module.scss";

/**
 * The railway route that fills as you scroll (home page).
 *  - Wide screens: a vertical rail of numbered station roundels with a little signal lamp that
 *    travels from station to station (GSAP ScrollTrigger, loaded when idle).
 *  - Small screens: a thin progress bar along the top, driven by a CSS scroll timeline (no JavaScript).
 * Active stations are marked even with reduced motion; only the scroll-linked movement is skipped.
 */
export default function RouteRail() {
  const active = useActiveStation();
  const railFill = useRef<HTMLSpanElement>(null);
  const lamp = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (shouldSimplifyMotion()) return;
    if (!window.matchMedia("(min-width: 64em)").matches) return; // the rail only exists on wide screens

    let cancelled = false;
    let kill: (() => void) | undefined;

    loadGsap()
      .then(({ gsap, ScrollTrigger }) => {
        const fill = railFill.current;
        const lampEl = lamp.current;
        if (cancelled || !fill || !lampEl) return;

        const sections = stations
          .map((st) => document.getElementById(st.id))
          .filter((el): el is HTMLElement => el !== null);
        if (sections.length < 2) return;

        const setFill = gsap.quickSetter(fill, "scaleY") as (v: number) => void;
        const setLamp = gsap.quickSetter(lampEl, "y", "px") as (v: number) => void;

        let tops: number[] = [];
        let trackHeight = 0;
        const measure = () => {
          tops = sections.map((el) => el.getBoundingClientRect().top + window.scrollY);
          trackHeight = fill.parentElement?.clientHeight ?? 0;
        };

        // 0 = first station, 1 = last station, interpolated between stations so it lines up with the roundels.
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
          setFill(progress);
          setLamp(progress * trackHeight);
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
        <span className={s.barFill} />
      </div>
      <nav className={s.rail} aria-label="Journey route">
        <span className={s.track} aria-hidden="true">
          <span ref={railFill} className={s.fill} />
        </span>
        <span ref={lamp} className={s.lamp} aria-hidden="true" />
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
