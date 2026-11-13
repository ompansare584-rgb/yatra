import RouteRail from "@/components/navigation/RouteRail";
import LandscapeInterlude from "@/components/effects/LandscapeInterlude";
import GithubExpress from "@/components/sections/GithubExpress";
import Hero from "@/components/sections/Hero";
import Interests from "@/components/sections/Interests";
import NextStop from "@/components/sections/NextStop";
import Origin from "@/components/sections/Origin";
import ProjectLog from "@/components/sections/ProjectLog";
import Workshop from "@/components/sections/Workshop";
import { buildJsonLd, jsonLdToString } from "@/lib/structured-data";
import { getFormspreeUrl } from "@/lib/server-env";

// Static page: everything essential is rendered on the server. The Formspree URL is
// resolved here (server-only) and handed to the contact section as a plain prop.
export default function Home() {
  const formUrl = getFormspreeUrl();

  return (
    <>
      <script
        type="application/ld+json"
        // Our own verified content, serialised with "<" escaped — never third-party data.
        dangerouslySetInnerHTML={{ __html: jsonLdToString(buildJsonLd()) }}
      />
      <RouteRail />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Origin />
        <Interests />
        <LandscapeInterlude />
        <Workshop />
        <ProjectLog />
        <GithubExpress />
        <NextStop formUrl={formUrl} />
      </main>
    </>
  );
}
