"use client";

import { useEffect, useRef, useState } from "react";
import { fetchPublicRepos, splitRepos, type Repo, type RepoResult } from "@/lib/github";
import s from "./GithubRepos.module.scss";

interface Props {
  username: string;
  profileUrl: string;
  /** Repository names chosen in site.ts. */
  featured: readonly string[];
}

type View = { kind: "idle" } | { kind: "loading" } | { kind: "done"; result: RepoResult };

const INITIAL_VISIBLE = 9;

function statusText(view: View): string {
  if (view.kind === "idle") return "";
  if (view.kind === "loading") return "Loading public repositories from GitHub…";
  switch (view.result.status) {
    case "ok":
      return `Loaded ${view.result.repos.length} public ${view.result.repos.length === 1 ? "repository" : "repositories"}.`;
    case "empty":
      return "There are no public repositories to show yet.";
    case "rate-limited":
      return "GitHub's request limit was reached. Please try again later, or open the profile directly.";
    case "not-found":
      return "GitHub could not find this profile.";
    case "error":
      return "Could not reach GitHub right now. Please try again, or open the profile directly.";
  }
}

function RepoList({ repos }: { repos: Repo[] }) {
  return (
    <ul className={s.list}>
      {repos.map((repo) => (
        <li key={repo.id} className={s.repo}>
          <h4>
            <a href={repo.url} target="_blank" rel="noopener noreferrer">
              {repo.name}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </h4>
          <p>{repo.description ?? "No description provided."}</p>
          <p className={s.meta}>
            {repo.language ? <span>{repo.language}</span> : null}
            {repo.fork ? <span>Fork</span> : null}
            {repo.archived ? <span>Archived</span> : null}
          </p>
        </li>
      ))}
    </ul>
  );
}

/**
 * Nothing is requested from GitHub until the visitor presses the button, so the page itself
 * never depends on the GitHub API.
 */
export default function GithubRepos({ username, profileUrl, featured }: Props) {
  const [view, setView] = useState<View>({ kind: "idle" });
  const [showAll, setShowAll] = useState(false);
  const controller = useRef<AbortController | null>(null);

  useEffect(() => () => controller.current?.abort(), []);

  async function load() {
    controller.current?.abort();
    const current = new AbortController();
    controller.current = current;
    setView({ kind: "loading" });
    const result = await fetchPublicRepos(username, current.signal);
    if (current.signal.aborted) return;
    setView({ kind: "done", result });
  }

  const loading = view.kind === "loading";
  const failed = view.kind === "done" && ["rate-limited", "error"].includes(view.result.status);
  const split =
    view.kind === "done" && view.result.status === "ok" ? splitRepos(view.result.repos, featured) : null;
  const visibleOthers = split ? (showAll ? split.others : split.others.slice(0, INITIAL_VISIBLE)) : [];

  return (
    <div className={s.wrap}>
      <div className={s.actions}>
        {view.kind === "idle" || failed ? (
          <button type="button" className="btn btn-primary" onClick={load}>
            {failed ? "Try again" : "Load public repositories"}
          </button>
        ) : null}
        <a className="btn" href={profileUrl} target="_blank" rel="noopener noreferrer">
          Open GitHub profile<span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
      {view.kind === "idle" ? (
        <p className={s.hint}>
          Nothing is requested from GitHub until you press the button. Repositories appear exactly as they are on
          GitHub — they are not a curated list of finished projects.
        </p>
      ) : null}

      <p role="status" aria-live="polite" className={s.status}>
        {statusText(view)}
      </p>

      {split ? (
        <>
          {split.featured.length > 0 ? (
            <div className={s.group}>
              <h3>Featured</h3>
              <RepoList repos={split.featured} />
            </div>
          ) : null}
          {split.missing.length > 0 ? (
            <p className={s.hint}>
              Some featured repositories could not be found (they may have been renamed, made private or deleted):{" "}
              {split.missing.join(", ")}.
            </p>
          ) : null}
          {split.others.length > 0 ? (
            <div className={s.group}>
              <h3>{split.featured.length > 0 ? "Other public repositories" : "Public repositories"}</h3>
              <p className={s.hint}>Listed as they appear on GitHub. Many are experiments or coursework in progress.</p>
              <RepoList repos={visibleOthers} />
              {split.others.length > INITIAL_VISIBLE && !showAll ? (
                <button type="button" className="btn" onClick={() => setShowAll(true)}>
                  Show all {split.others.length}
                </button>
              ) : null}
            </div>
          ) : null}
        </>
      ) : null}

      {loading ? <span className="sr-only">Loading</span> : null}
    </div>
  );
}
