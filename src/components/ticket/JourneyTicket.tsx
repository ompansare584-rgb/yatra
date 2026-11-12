import Image from "next/image";
import { siteConfig } from "@/content/site";
import { ticketCopy } from "@/content/ticket";
import { has } from "@/lib/content";
import s from "./JourneyTicket.module.scss";

/**
 * The journey ticket: an original graphic identity card, NOT a reservation.
 * No PNR, seat, train number or booking reference appears anywhere on it.
 */
export default function JourneyTicket() {
  const fields: Array<[string, string]> = [
    ["Passenger", siteConfig.name],
    ["Origin", siteConfig.city],
    ["Current station", siteConfig.institutionShort],
    ["Journey", siteConfig.field],
    ["Destination", ticketCopy.destination],
    ["Status", ticketCopy.status],
    ["Identity", ticketCopy.identity],
  ];
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
          {fields.map(([label, value]) => (
            <div key={label} className={s.field}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
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
            sizes="(max-width: 48em) 96px, 140px"
          />
        ) : (
          <span className={s.monogram} aria-hidden="true">
            {initials}
          </span>
        )}
        <span className={s.bars} aria-hidden="true" />
      </div>
    </div>
  );
}
