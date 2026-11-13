import Station from "@/components/station/Station";
import { publishedProjects } from "@/lib/content";
import { ProjectCaseStudy, ProjectsEmpty } from "./ProjectParts";
import s from "./Sections.module.scss";

export default function ProjectLog() {
  // Only projects with `published: true` in site.ts appear — nothing is auto-generated.
  const projects = publishedProjects();

  return (
    <Station id="project-log" tone="dusk" more={{ href: "/projects", label: "Open the project log" }}>
      {projects.length === 0 ? (
        <ProjectsEmpty />
      ) : (
        <ul className={s.projects}>
          {projects.map((project) => (
            <li key={project.slug} data-reveal>
              <ProjectCaseStudy project={project} />
            </li>
          ))}
        </ul>
      )}
    </Station>
  );
}
