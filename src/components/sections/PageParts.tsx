import clsx from "clsx";
import Link from "next/link";
import type { Tone } from "@/components/station/Station";
import station from "@/components/station/Station.module.scss";
import s from "./PageParts.module.scss";

interface HeroProps {
  /** Small yellow nameboard text, e.g. "WHO I AM". */
  sign: string;
  /** The same idea in Marathi (decorative; shown with lang="mr"). */
  marathi: string;
  title: string;
  lead: string;
  /** Breadcrumb trail after "Home". The last item is the current page. */
  trail: string[];
}

/** Opening band for the inner pages: dawn sky, nameboard, big title and a railway track along the bottom. */
export function PageHero({ sign, marathi, title, lead, trail }: HeroProps) {
  return (
    <section className={s.hero} aria-labelledby="page-title">
      <span className={s.watermark} lang="mr" aria-hidden="true">
        {marathi}
      </span>
      <div className={clsx("container", s.inner)}>
        <nav aria-label="Breadcrumb" className={s.crumbs}>
          <ol>
            <li>
              <Link href="/">Home</Link>
            </li>
            {trail.map((item, index) => (
              <li key={item} aria-current={index === trail.length - 1 ? "page" : undefined}>
                {item}
              </li>
            ))}
          </ol>
        </nav>
        <p className={s.signboard}>
          <span>{sign}</span>
          <span lang="mr" className={s.marathi}>
            {marathi}
          </span>
        </p>
        <h1 id="page-title" className={s.title}>
          {title}
        </h1>
        <p className={s.lead}>{lead}</p>
      </div>

      {/* A small train on the track, drawn in SVG (static, decorative). */}
      <svg className={s.train} viewBox="0 0 360 60" aria-hidden="true" focusable="false">
        <rect x="6" y="14" width="76" height="30" rx="4" fill="#0b1a36" />
        <rect x="14" y="20" width="12" height="12" rx="2" fill="#ffc857" />
        <rect x="32" y="20" width="12" height="12" rx="2" fill="#ffc857" />
        <rect x="50" y="20" width="12" height="12" rx="2" fill="#ffc857" />
        <rect x="88" y="14" width="76" height="30" rx="4" fill="#0b1a36" />
        <rect x="96" y="20" width="12" height="12" rx="2" fill="#ffc857" />
        <rect x="114" y="20" width="12" height="12" rx="2" fill="#ffc857" />
        <rect x="132" y="20" width="12" height="12" rx="2" fill="#ffc857" />
        <path d="M170 44V22l14-10h40a6 6 0 0 1 6 6v26z" fill="#c73a24" />
        <rect x="190" y="18" width="14" height="14" rx="2" fill="#ffc857" />
        <rect x="226" y="4" width="10" height="14" fill="#0b1a36" />
        <rect x="6" y="44" width="244" height="4" fill="#0b1a36" />
        <circle cx="30" cy="50" r="6" fill="#0b1a36" />
        <circle cx="64" cy="50" r="6" fill="#0b1a36" />
        <circle cx="112" cy="50" r="6" fill="#0b1a36" />
        <circle cx="146" cy="50" r="6" fill="#0b1a36" />
        <circle cx="192" cy="50" r="6" fill="#0b1a36" />
        <circle cx="228" cy="50" r="6" fill="#0b1a36" />
      </svg>
      <div className={s.track} aria-hidden="true" />
    </section>
  );
}

interface SectionProps {
  tone: Tone;
  /** Nameboard text above the heading. */
  label: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
  className?: string;
}

/** A coloured "platform" section on an inner page (same look as the home page stations). */
export function PageSection({ tone, label, title, intro, children, className }: SectionProps) {
  const id = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-title`;
  return (
    <section data-tone={tone} aria-labelledby={id} className={clsx(station.station, className)}>
      <div className="container">
        <header className={station.head} data-reveal>
          <p className={station.signboard}>
            <span className={station.remark}>{label}</span>
          </p>
          <h2 id={id}>{title}</h2>
          {intro ? <p className={station.intro}>{intro}</p> : null}
        </header>
        {children}
      </div>
    </section>
  );
}

interface EndProps {
  tone?: Tone;
  title?: string;
  links: Array<{ href: string; title: string; text: string }>;
}

/** "Next stop" cards at the bottom of an inner page, so every page leads somewhere. */
export function PageEnd({ tone = "dusk", title = "Next stops", links }: EndProps) {
  return (
    <section data-tone={tone} aria-labelledby="next-stops-title" className={clsx(station.station, s.end)}>
      <div className="container">
        <h2 id="next-stops-title" className={s.endTitle} data-reveal>
          {title}
        </h2>
        <ul className={s.endGrid}>
          {links.map((link) => (
            <li key={link.href} data-reveal>
              <Link href={link.href} className={s.endCard}>
                <span className={s.endName}>{link.title}</span>
                <span className={s.endText}>{link.text}</span>
                <span className={s.endArrow} aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
