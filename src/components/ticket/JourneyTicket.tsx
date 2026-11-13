import Image from "next/image";
import { siteConfig } from "@/content/site";
import { ticketCopy } from "@/content/ticket";
import { has } from "@/lib/content";
import s from "./JourneyTicket.module.scss";

/**
 * The journey ticket: an original graphic identity card, NOT a reservation.
 * No PNR, seat, train number or booking reference appears anywhere on it.
 * Its layout responds to the width of the space it is placed in (container query),
 * so the text and the photo are never squeezed.
 */
export default function JourneyTicket() {
  const initials = siteConfig.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <div className={s.ticket} role="group" aria-label={`Journey ticket for ${siteConfig.name}`}>
      <div className={s.main}>
        <p className={s.kicker}>
          <span>Journey ticket</span>
          <span lang="mr" className={s.marathi}>
            यात्रा तिकीट
          </span>
        </p>

        <dl className={s.fields}>
          <div className={`${s.field} ${s.wide}`}>
            <dt>Passenger</dt>
            <dd className={s.name}>{siteConfig.name}</dd>
          </div>
          <div className={`${s.field} ${s.wide}`}>
            <dt>Journey</dt>
            <dd>{siteConfig.field}</dd>
          </div>
          <div className={s.field}>
            <dt>Status</dt>
            <dd>{ticketCopy.status}</dd>
          </div>
          <div className={s.field}>
            <dt>Identity</dt>
            <dd>{ticketCopy.identity}</dd>
          </div>
        </dl>

        {/* Origin -> current station -> destination, drawn as a little route. */}
        <ol className={s.route} aria-label="Route">
          <li>
            <span className={s.routeLabel}>Origin</span>
            <strong>{siteConfig.city}</strong>
          </li>
          <li className={s.here}>
            <span className={s.routeLabel}>Current station</span>
            <strong>{siteConfig.institutionShort}</strong>
          </li>
          <li>
            <span className={s.routeLabel}>Destination</span>
            <strong>{ticketCopy.destination}</strong>
          </li>
        </ol>
      </div>

      <div className={s.perforation} aria-hidden="true" />

      <div className={s.stub}>
        {has(siteConfig.portraitUrl) ? (
          <Image
            className={s.portrait}
            src={siteConfig.portraitUrl}
            alt={`Portrait of ${siteConfig.name}`}
            width={640}
            height={640}
            sizes="(max-width: 34rem) 96px, 140px"
          />
        ) : (
          <span className={s.monogram} aria-hidden="true">
            {initials}
          </span>
        )}
        <span className={s.bars} aria-hidden="true" />
        {/* A rubber stamp: purely decorative. */}
        <span className={s.stamp} lang="mr" aria-hidden="true">
          यात्रा
        </span>
      </div>
    </div>
  );
}
