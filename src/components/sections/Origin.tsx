import { siteConfig } from "@/content/site";
import Station from "@/components/station/Station";
import JourneyTicket from "@/components/ticket/JourneyTicket";
import ExternalLink from "@/components/ui/ExternalLink";
import { has, safeHttpUrl } from "@/lib/content";
import Milestones from "./Milestones";
import s from "./Sections.module.scss";

export default function Origin() {
  const resume = safeHttpUrl(siteConfig.resumeUrl);
  return (
    <Station id="origin" tone="morning">
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
          <JourneyTicket />
        </div>
      </div>

      <Milestones />
    </Station>
  );
}
