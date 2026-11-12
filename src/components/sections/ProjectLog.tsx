import Image from "next/image";
import Station from "@/components/station/Station";
import ExternalLink from "@/components/ui/ExternalLink";
import { publishedProjects } from "@/lib/content";
import s from "./Sections.module.scss";

export default function ProjectLog() {
  // Only projects with `published: true` in site.ts appear — nothing is auto-generated.
  const projects = publishedProjects();

  return (
    <Station id="project-log">
      {projects.length === 0 ? (
        <div className={s.emptyPlatform} data-reveal>
          <p>
            Every journey starts somewhere. This project log will grow as I build and document meaningful work.
          </p>
        </div>
      ) : (
        <ul className={s.projects}>
          {projects.map((project) => (
            <li key={project.slug} data-reveal>
              <article className={s.project} aria-labelledby={`project-${project.slug}`}>
                <header>
                  <p className={s.projectStatus}>{project.status}</p>
                  <h3 id={`project-${project.slug}`}>{project.title}</h3>
                  <p>{project.summary}</p>
                </header>
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
            </li>
          ))}
        </ul>
      )}
    </Station>
  );
}
