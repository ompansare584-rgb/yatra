import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/types";
import ExternalLink from "@/components/ui/ExternalLink";
import s from "./Sections.module.scss";

/** The honest empty state: a semaphore signal at "clear". */
export function ProjectsEmpty() {
  return (
    <div className={s.emptyPlatform} data-reveal>
      <svg className={s.signal} viewBox="0 0 48 80" fill="none" aria-hidden="true" focusable="false">
        <rect x="21" y="14" width="6" height="64" fill="currentColor" opacity="0.5" />
        <g transform="rotate(-35 24 18)">
          <rect x="6" y="12" width="36" height="10" rx="2" fill="#ffc857" stroke="currentColor" strokeWidth="2" />
        </g>
        <circle cx="24" cy="10" r="6" fill="#ffc857" />
      </svg>
      <p>Every journey starts somewhere. This project log will grow as I build and document meaningful work.</p>
    </div>
  );
}

/** Full write-up of one project. `headingLevel` keeps the heading order correct on each page. */
export function ProjectCaseStudy({
  project,
  as: Heading = "h3",
  hideHeader = false,
}: {
  project: Project;
  as?: "h2" | "h3";
  /** The page already shows the title and summary (project detail page). */
  hideHeader?: boolean;
}) {
  return (
    <article className={s.project} aria-label={hideHeader ? project.title : undefined} aria-labelledby={hideHeader ? undefined : `project-${project.slug}`}>
      {hideHeader ? null : (
        <header>
          <p className={s.projectStatus}>{project.status}</p>
          <Heading id={`project-${project.slug}`}>{project.title}</Heading>
          <p>{project.summary}</p>
        </header>
      )}
      <dl className={s.caseStudy}>
        <div>
          <dt>The problem</dt>
          <dd>{project.problem}</dd>
        </div>
        <div>
          <dt>My contribution</dt>
          <dd>{project.contribution}</dd>
        </div>
        <div>
          <dt>How it works</dt>
          <dd>{project.implementation}</dd>
        </div>
        {project.technologies.length > 0 ? (
          <div>
            <dt>Technologies</dt>
            <dd>{project.technologies.join(" · ")}</dd>
          </div>
        ) : null}
      </dl>
      {project.screenshots?.map((shot) => (
        <Image
          key={shot.src}
          className={s.screenshot}
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          sizes="(max-width: 48em) 100vw, 60rem"
        />
      ))}
      {project.links.length > 0 ? (
        <p className={s.projectLinks}>
          {project.links.map((link) => (
            <ExternalLink key={link.url} className="btn" href={link.url}>
              {link.label}
            </ExternalLink>
          ))}
        </p>
      ) : null}
    </article>
  );
}

/** A short card linking to a project's own page (used on /projects). */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={s.project}>
      <header>
        <p className={s.projectStatus}>{project.status}</p>
        <h2 className={s.cardTitle}>
          <Link href={`/projects/${project.slug}`}>{project.title}</Link>
        </h2>
        <p>{project.summary}</p>
      </header>
      {project.technologies.length > 0 ? <p className={s.chips}>{project.technologies.map((t) => <span key={t}>{t}</span>)}</p> : null}
      <p>
        <Link className="btn" href={`/projects/${project.slug}`}>
          Read the case study
        </Link>
      </p>
    </article>
  );
}
