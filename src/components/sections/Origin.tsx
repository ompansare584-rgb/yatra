import { siteConfig } from "@/content/site";
import Station from "@/components/station/Station";
import JourneyTicket from "@/components/ticket/JourneyTicket";
import TicketTilt from "@/components/ticket/TicketTilt";
import ExternalLink from "@/components/ui/ExternalLink";
import { has, safeHttpUrl } from "@/lib/content";
import Milestones from "./Milestones";
import s from "./Sections.module.scss";

/** Home page version: the station frame plus a link to the full About page. */
export default function Origin() {
  return (
    <Station id="origin" tone="morning" more={{ href: "/about", label: "More about me" }}>
      <OriginContent />
    </Station>
  );
}

/** Intro text, facts, journey ticket and milestones. Shared by the home page and /about. */
export function OriginContent() {
  const resume = safeHttpUrl(siteConfig.resumeUrl);
  return (
    <>
      <div className={s.originGrid}>
        <div className={s.prose} data-reveal>
          {siteConfig.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          <dl className={s.facts}>
            <div>
              <dt>Studying</dt>
              <dd>
                {siteConfig.program} {siteConfig.field}
              </dd>
            </div>
            <div>
              <dt>College</dt>
              <dd>
                {siteConfig.institution} ({siteConfig.institutionShort})
              </dd>
            </div>
            <div>
              <dt>Based in</dt>
              <dd>{siteConfig.location}</dd>
            </div>
            <div>
              <dt>Academic year</dt>
              <dd>{siteConfig.academicYear}</dd>
            </div>
          </dl>

          {has(siteConfig.lookingFor) ? <p className={s.note}>{siteConfig.lookingFor}</p> : null}
          {resume ? (
            <p>
              <ExternalLink className="btn" href={resume}>
                View resume
              </ExternalLink>
            </p>
          ) : null}
        </div>

        <div className={s.ticketWrap} data-reveal>
          <TicketTilt>
            <JourneyTicket />
          </TicketTilt>
        </div>
      </div>

      <Milestones />
    </>
  );
}
