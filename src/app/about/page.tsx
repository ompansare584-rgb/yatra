import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { INTERESTS_INTRO, InterestCards } from "@/components/sections/Interests";
import { OriginContent } from "@/components/sections/Origin";
import { PageEnd, PageHero, PageSection } from "@/components/sections/PageParts";
import s from "@/components/sections/Sections.module.scss";
import Icon from "@/components/ui/Icon";
import JsonLd from "@/components/ui/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { buildBreadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: `Who ${siteConfig.name} is, how he likes to work, and what he is curious about.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <main id="main" tabIndex={-1}>
        <PageHero
          sign="WHO I AM"
          marathi="माझ्याबद्दल"
          title={`About ${siteConfig.name.split(" ")[0]}`}
          lead="Where I am on my journey, how I like to work, and what I am curious about."
          trail={["About"]}
        />

        <PageSection tone="morning" label="THE ORIGIN" title="Where the journey began">
          <OriginContent />
        </PageSection>

        {siteConfig.approach.length > 0 ? (
          <PageSection tone="noon" label="HOW I WORK" title="How I like to work">
            <ul className={s.approach}>
              {siteConfig.approach.map((item) => (
                <li key={item.title} className={s.ticketCard} data-reveal>
                  <span className={s.cardIcon}>
                    <Icon name={item.icon} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </li>
              ))}
            </ul>
          </PageSection>
        ) : null}

        <PageSection tone="afternoon" label="INTERESTS & IDEAS" title="What I am curious about" intro={INTERESTS_INTRO}>
          <InterestCards />
        </PageSection>

        <PageEnd
          tone="dusk"
          links={[
            { href: "/projects", title: "Project log", text: "The work I build and document." },
            { href: "/github", title: "GitHub", text: "My public code, loaded when you ask." },
            { href: "/contact", title: "Contact", text: "Say hello." },
          ]}
        />
      </main>
    </>
  );
}
