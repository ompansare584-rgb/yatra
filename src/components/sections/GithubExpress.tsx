import { siteConfig } from "@/content/site";
import GithubRepos from "@/components/github/GithubRepos";
import Station from "@/components/station/Station";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import ExternalLink from "@/components/ui/ExternalLink";
import { githubUsername } from "@/lib/github";

export const GITHUB_INTRO = "My public code, straight from GitHub whenever you ask for it.";

/** The repository loader (nothing is requested until the visitor presses the button). */
export function GithubPanel() {
  const username = githubUsername(siteConfig.links.github);
  const fallback = (
    <ExternalLink className="btn btn-primary" href={siteConfig.links.github}>
      Open GitHub profile
    </ExternalLink>
  );

  return (
    <div data-reveal>
      {username ? (
        <ErrorBoundary fallback={fallback}>
          <GithubRepos username={username} profileUrl={siteConfig.links.github} featured={siteConfig.featuredRepositories} />
        </ErrorBoundary>
      ) : (
        fallback
      )}
    </div>
  );
}

export default function GithubExpress() {
  return (
    <Station id="github-express" tone="night" intro={GITHUB_INTRO} more={{ href: "/github", label: "Open the GitHub page" }}>
      <GithubPanel />
    </Station>
  );
}
