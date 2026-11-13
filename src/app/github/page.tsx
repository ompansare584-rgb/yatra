import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { GITHUB_INTRO, GithubPanel } from "@/components/sections/GithubExpress";
import { PageEnd, PageHero, PageSection } from "@/components/sections/PageParts";
import JsonLd from "@/components/ui/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { buildBreadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata({
  title: "GitHub",
  description: `Public repositories of ${siteConfig.name}, loaded from GitHub only when you ask.`,
  path: "/github",
});

export default function GithubPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "GitHub", path: "/github" },
        ])}
      />
      <main id="main" tabIndex={-1}>
        <PageHero
          sign="PUBLIC CODE"
          marathi="कोड"
          title="GitHub Express"
          lead="My public repositories. Nothing is requested from GitHub until you press the button."
          trail={["GitHub"]}
        />
        <PageSection tone="night" label="GITHUB EXPRESS" title="Public repositories" intro={GITHUB_INTRO}>
          <GithubPanel />
        </PageSection>
        <PageEnd
          tone="midnight"
          links={[
            { href: "/projects", title: "Project log", text: "Work that is documented in full." },
            { href: "/about", title: "About", text: "More about who I am." },
            { href: "/contact", title: "Contact", text: "Say hello." },
          ]}
        />
      </main>
    </>
  );
}
