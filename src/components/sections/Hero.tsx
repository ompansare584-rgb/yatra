import { siteConfig } from "@/content/site";
import DepartureBoard from "@/components/navigation/DepartureBoard";
import ExternalLink from "@/components/ui/ExternalLink";
import s from "./Hero.module.scss";

/** "Pune, Maharashtra, India" -> "PUNE, MAHARASHTRA · INDIA" */
function locationLabel(location: string) {
  return location.toUpperCase().replace(/, ([^,]+)$/, " · $1");
}

/** The opening screen: Om Pansare Junction. */
export default function Hero() {
  return (
    <section id="junction" data-station="junction" tabIndex={-1} aria-labelledby="hero-title" className={s.hero}>
      <div className={`container ${s.inner}`}>
        <div className={s.intro}>
          <p className={s.signboard}>
            <span>{`${siteConfig.name.toUpperCase()} JUNCTION`}</span>
            <span lang="mr" className={s.marathi}>
              यात्रा
            </span>
          </p>
          <p className={s.location}>{locationLabel(siteConfig.location)}</p>

          <h1 id="hero-title" className={s.title}>
            {siteConfig.name}
          </h1>
          <p className={s.lead}>{siteConfig.heroLead}</p>
          <p className={s.copy}>{siteConfig.heroIntro}</p>
          <p className={s.supporting}>{siteConfig.heroSupporting}</p>

          <div className={s.actions}>
            <a className="btn btn-primary" href="#origin">
              Explore the journey
            </a>
            <ExternalLink className="btn" href={siteConfig.links.github}>
              Visit GitHub
            </ExternalLink>
          </div>
        </div>

        <DepartureBoard />
      </div>
      <div className={s.track} aria-hidden="true" />
    </section>
  );
}
