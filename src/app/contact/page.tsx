import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { NextStopContent } from "@/components/sections/NextStop";
import { PageHero, PageSection } from "@/components/sections/PageParts";
import s from "@/components/sections/Sections.module.scss";
import JsonLd from "@/components/ui/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { getFormspreeUrl } from "@/lib/server-env";
import { buildBreadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: `How to get in touch with ${siteConfig.name}.`,
  path: "/contact",
});

export default function ContactPage() {
  const formUrl = getFormspreeUrl();
  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <main id="main" tabIndex={-1}>
        <PageHero
          sign="SAY HELLO"
          marathi="संपर्क"
          title="The next stop"
          lead="If something here sparked an idea, I would be glad to hear from you."
          trail={["Contact"]}
        />
        <PageSection tone="midnight" label="THE NEXT STOP" title="Let's connect" className={s.terminus}>
          <NextStopContent formUrl={formUrl} />
          {formUrl ? null : (
            <p className={s.noteBox}>There is no contact form on this site, so LinkedIn is the best way to reach me.</p>
          )}
          <div className={s.platformEdge} aria-hidden="true" />
        </PageSection>
      </main>
    </>
  );
}
