import { siteConfig } from "@/content/site";
import GithubRepos from "@/components/github/GithubRepos";
import Station from "@/components/station/Station";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import ExternalLink from "@/components/ui/ExternalLink";
import { githubUsername } from "@/lib/github";

export default function GithubExpress() {
  const username = githubUsername(siteConfig.links.github);

  return (
    <Station id="github-express" intro="My public code, straight from GitHub whenever you ask for it.">
      <div data-reveal>
        {username ? (
          <ErrorBoundary
            fallback={
              <ExternalLink className="btn btn-primary" href={siteConfig.links.github}>
                Open GitHub profile
              </ExternalLink>
            }
          >
            <GithubRepos
              username={username}
              profileUrl={siteConfig.links.github}
              featured={siteConfig.featuredRepositories}
            />
          </ErrorBoundary>
        ) : (
          <ExternalLink className="btn btn-primary" href={siteConfig.links.github}>
            Open GitHub profile
          </ExternalLink>
        )}
      </div>
    </Station>
  );
}
