import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { PageEnd, PageHero, PageSection } from "@/components/sections/PageParts";
import { ProjectCard, ProjectsEmpty } from "@/components/sections/ProjectParts";
import s from "@/components/sections/Sections.module.scss";
import JsonLd from "@/components/ui/JsonLd";
import { publishedProjects } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { buildBreadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description: `The project log of ${siteConfig.name}: work that is built, documented and honestly described.`,
  path: "/projects",
});

export default function ProjectsPage() {
  const projects = publishedProjects();
  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ])}
      />
      <main id="main" tabIndex={-1}>
        <PageHero
          sign="WORK, DOCUMENTED"
          marathi="प्रकल्प"
          title="Project log"
          lead="Only work that is real appears here: what the problem was, what I did, and how it works."
          trail={["Projects"]}
        />

        <PageSection tone="dusk" label="PROJECT LOG" title="Everything I have documented">
          {projects.length === 0 ? (
            <ProjectsEmpty />
          ) : (
            <ul className={s.projects}>
              {projects.map((project) => (
                <li key={project.slug} data-reveal>
                  <ProjectCard project={project} />
                </li>
              ))}
            </ul>
          )}
        </PageSection>

        <PageEnd
          tone="night"
          links={[
            { href: "/github", title: "GitHub", text: "Browse my public repositories." },
            { href: "/about", title: "About", text: "More about who I am." },
            { href: "/contact", title: "Contact", text: "Say hello." },
          ]}
        />
      </main>
    </>
  );
}
