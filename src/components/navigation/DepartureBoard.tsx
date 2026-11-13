"use client";

import clsx from "clsx";
import { useState } from "react";
import { stations } from "@/content/stations";
import { useActiveStation } from "@/hooks/useActiveStation";
import s from "./DepartureBoard.module.scss";

/**
 * Text shown as split-flap tiles. The flip is a plain CSS animation that plays each time `flipKey`
 * changes — no animation library. The real text is always in the HTML (screen-reader copy + visible tiles),
 * so the board reads correctly with no JavaScript and no animation.
 */
function Flap({ text, flipKey }: { text: string; flipKey: number }) {
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
                return (
                  <span
                    key={`${flipKey}-${i}`}
                    className={clsx(s.char, flipKey > 0 && s.flip)}
                    style={flipKey > 0 ? { animationDelay: `${i * 18}ms` } : undefined}
                  >
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
                  <Flap text={station.destination} flipKey={flipKey} />
                </span>
                <span className={s.remark}>
                  <Flap text={station.remark} flipKey={flipKey} />
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
