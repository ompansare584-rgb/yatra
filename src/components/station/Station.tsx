import clsx from "clsx";
import { getStation } from "@/lib/stations";
import s from "./Station.module.scss";

interface Props {
  /** One of the ids in src/content/stations.ts */
  id: string;
  /** Short line under the heading. Optional. */
  intro?: string;
  children: React.ReactNode;
  className?: string;
}

/** The shared "platform" frame every station uses: signboard, heading, content. */
export default function Station({ id, intro, children, className }: Props) {
  const station = getStation(id);
  const titleId = `${id}-title`;
  return (
    <section id={id} data-station={id} tabIndex={-1} aria-labelledby={titleId} className={clsx(s.station, className)}>
      <div className="container">
        <header className={s.head} data-reveal>
          <p className={s.signboard}>
            <span className="sr-only">Station </span>
            <span className={s.number}>{station.platform}</span>
            <span aria-hidden="true" className={s.sep} />
            <span className={s.remark}>{station.remark}</span>
          </p>
          <h2 id={titleId}>{station.name}</h2>
          {intro ? <p className={s.intro}>{intro}</p> : null}
          <a className={s.back} href="#junction">
            <span aria-hidden="true">↑ </span>Departure board
          </a>
        </header>
        {children}
      </div>
    </section>
  );
}
