import clsx from "clsx";
import Link from "next/link";
import { getStation } from "@/lib/stations";
import s from "./Station.module.scss";

/** Time of day for the section's colours. Defined in src/styles/tokens.scss. */
export type Tone = "morning" | "noon" | "afternoon" | "dusk" | "night" | "midnight";

interface Props {
  /** One of the ids in src/content/stations.ts */
  id: string;
  tone: Tone;
  /** Short line under the heading. Optional. */
  intro?: string;
  children: React.ReactNode;
  className?: string;
  /** A link to the full page for this station, e.g. { href: "/about", label: "Read more about me" }. */
  more?: { href: string; label: string };
  /** Show "↑ Departure board" (only meaningful on the home page). Default true. */
  showBack?: boolean;
}

/** The shared "platform" frame every station uses: nameboard, heading, content. */
export default function Station({ id, tone, intro, children, className, more, showBack = true }: Props) {
  const station = getStation(id);
  const titleId = `${id}-title`;
  return (
    <section
      id={id}
      data-station={id}
      data-tone={tone}
      tabIndex={-1}
      aria-labelledby={titleId}
      className={clsx(s.station, className)}
    >
      <div className="container">
        <header className={s.head} data-reveal>
          <span className={s.numeral} aria-hidden="true">
            {station.platform}
          </span>
          <p className={s.signboard}>
            <span className="sr-only">Station </span>
            <span className={s.number}>{station.platform}</span>
            <span aria-hidden="true" className={s.sep} />
            <span className={s.remark}>{station.remark}</span>
          </p>
          <h2 id={titleId}>{station.name}</h2>
          {intro ? <p className={s.intro}>{intro}</p> : null}
          {more || showBack ? (
            <p className={s.links}>
              {more ? (
                <Link className={s.more} href={more.href}>
                  {more.label}
                  <span aria-hidden="true"> →</span>
                </Link>
              ) : null}
              {showBack ? (
                <a className={s.back} href="#junction">
                  <span aria-hidden="true">↑ </span>Departure board
                </a>
              ) : null}
            </p>
          ) : null}
        </header>
        {children}
      </div>
    </section>
  );
}
