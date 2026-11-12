"use client";

import clsx from "clsx";
import { m } from "framer-motion";
import { useState } from "react";
import { stations } from "@/content/stations";
import { useActiveStation } from "@/hooks/useActiveStation";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import s from "./DepartureBoard.module.scss";

/**
 * Text that "flips" like a split-flap display each time `flipKey` changes.
 * The real text is always present in the HTML (screen-reader copy + visible tiles),
 * so the board reads correctly with no JavaScript and no animation.
 */
function Flap({ text, flipKey, animate }: { text: string; flipKey: number; animate: boolean }) {
  let index = 0;
  const words = text.split(" ");
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, w) => (
          <span key={w}>
            <span className={s.word}>
              {Array.from(word).map((char) => {
                const i = index++;
                return animate && flipKey > 0 ? (
                  <m.span
                    key={`${flipKey}-${i}`}
                    className={s.char}
                    initial={{ rotateX: -90, opacity: 0 }}
                    animate={{ rotateX: 0, opacity: 1 }}
                    transition={{ duration: 0.28, delay: i * 0.018, ease: "easeOut" }}
                  >
                    {char}
                  </m.span>
                ) : (
                  <span key={i} className={s.char}>
                    {char}
                  </span>
                );
              })}
            </span>
            {w < words.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </>
  );
}

export default function DepartureBoard() {
  const active = useActiveStation();
  const reduceMotion = usePrefersReducedMotion();

  // Each time a station becomes the active one, its row "flips" once.
  const [previous, setPrevious] = useState<string | null>(null);
  const [flips, setFlips] = useState<Record<string, number>>({});
  if (active !== previous) {
    setPrevious(active);
    if (active && active !== "junction") {
      setFlips((current) => ({ ...current, [active]: (current[active] ?? 0) + 1 }));
    }
  }

  return (
    <nav className={s.board} aria-label="Departure board: the stations of this journey">
      <div className={s.head} aria-hidden="true">
        <span>Departures</span>
        <span lang="mr">प्रस्थान</span>
      </div>
      <div className={s.columns} aria-hidden="true">
        <span>Platform</span>
        <span>Destination</span>
        <span className={s.remarkHead}>Remarks</span>
      </div>
      <ol className={s.rows}>
        {stations.map((station) => {
          const isActive = active === station.id;
          const flipKey = flips[station.id] ?? 0;
          return (
            <li key={station.id}>
              <a
                href={`#${station.id}`}
                className={clsx(s.row, isActive && s.active)}
                aria-current={isActive ? "location" : undefined}
              >
                <span className={s.platform}>
                  <span className="sr-only">Platform </span>
                  {station.platform}
                </span>
                <span className={s.destination}>
                  <Flap text={station.destination} flipKey={flipKey} animate={!reduceMotion} />
                </span>
                <span className={s.remark}>
                  <Flap text={station.remark} flipKey={flipKey} animate={!reduceMotion} />
                  {isActive ? (
                    <span className={s.here} aria-hidden="true">
                      You are here
                    </span>
                  ) : null}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
