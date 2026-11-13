import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageEnd, PageHero, PageSection } from "@/components/sections/PageParts";
import { ProjectCaseStudy } from "@/components/sections/ProjectParts";
import JsonLd from "@/components/ui/JsonLd";
import { publishedProjects } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { buildBreadcrumbJsonLd } from "@/lib/structured-data";

// Only published projects get a page. Anything else is a 404 (never generated on demand).
export const dynamicParams = false;

export function generateStaticParams() {
  return publishedProjects().map((project) => ({ slug: project.slug }));
}

type Params = Promise<{ slug: string }>;

function findProject(slug: string) {
  return publishedProjects().find((project) => project.slug === slug);
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const project = findProject((await params).slug);
  if (!project) return {};
  return pageMetadata({ title: project.title, description: project.summary, path: `/projects/${project.slug}` });
}

export default async function ProjectPage({ params }: { params: Params }) {
  const project = findProject((await params).slug);
  if (!project) notFound();

  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
          { name: project.title, path: `/projects/${project.slug}` },
        ])}
      />
      <main id="main" tabIndex={-1}>
        <PageHero
          sign={project.status.toUpperCase()}
          marathi="प्रकल्प"
          title={project.title}
          lead={project.summary}
          trail={["Projects", project.title]}
        />
        <PageSection tone="afternoon" label="CASE STUDY" title="The case study">
          <ProjectCaseStudy project={project} hideHeader />
          <p>
            <Link href="/projects">← All projects</Link>
          </p>
        </PageSection>
        <PageEnd
          tone="dusk"
          links={[
            { href: "/projects", title: "All projects", text: "Back to the project log." },
            { href: "/github", title: "GitHub", text: "Browse my public repositories." },
            { href: "/contact", title: "Contact", text: "Say hello." },
          ]}
        />
      </main>
    </>
  );
}
