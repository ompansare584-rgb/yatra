import { siteConfig } from "@/content/site";
import ContactForm from "@/components/contact/ContactForm";
import Station from "@/components/station/Station";
import ExternalLink from "@/components/ui/ExternalLink";
import { has } from "@/lib/content";
import s from "./Sections.module.scss";

/** Closing message, links and (only when configured) the contact form. */
export function NextStopContent({ formUrl }: { formUrl: string }) {
  return (
    <div className={s.terminusGrid}>
      <div className={s.prose} data-reveal>
        <p className={s.closing}>{siteConfig.closingMessage}</p>
        {has(siteConfig.lookingFor) ? <p className={s.note}>{siteConfig.lookingFor}</p> : null}
        <p className={s.cta}>If something here sparked an idea, I would be glad to hear from you.</p>
        <p className={s.linkRow}>
          <ExternalLink className="btn btn-primary" href={siteConfig.links.linkedin}>
            Connect on LinkedIn
          </ExternalLink>
          <ExternalLink className="btn" href={siteConfig.links.github}>
            Visit GitHub
          </ExternalLink>
        </p>
      </div>

      {formUrl ? (
        <div data-reveal>
          <h3 className={s.formTitle}>Send a message</h3>
          <ContactForm action={formUrl} />
        </div>
      ) : null}
    </div>
  );
}

/** The final platform on the home page. `formUrl` is resolved on the server ("" hides the form). */
export default function NextStop({ formUrl }: { formUrl: string }) {
  return (
    <Station
      id="next-stop"
      tone="midnight"
      className={s.terminus}
      more={{ href: "/contact", label: "Contact page" }}
    >
      <NextStopContent formUrl={formUrl} />
      <div className={s.platformEdge} aria-hidden="true" />
    </Station>
  );
}
