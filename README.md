# Yatra (यात्रा) — Om Pansare's portfolio

A railway-journey portfolio built with Next.js 15 (App Router), React 19, TypeScript and SCSS.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run typecheck && npm run lint
npm run build && npm run start
npm run analyze      # bundle analyzer
npm run lhci         # Lighthouse CI (after a build)
```

Node 26.x is required (`engines` in package.json).

## Change your content

Everything personal lives in **`src/content/site.ts`**. You should not need to edit a component.

| Field | What it does | Optional? |
|---|---|---|
| `resumeUrl` | Shows a "View resume" button when filled | yes, `""` hides it |
| `portraitUrl` | Portrait on the ticket (`/images/om-portrait-640.webp`) | yes, `""` shows initials |
| `lookingFor` | One line about opportunities | yes |
| `projects` | Case studies; only `published: true` ones appear | yes, `[]` shows the empty state |
| `tools` | Workshop entries; only `reviewed: true` ones appear | yes |
| `interests` | Station 02 cards | yes |
| `achievements` | Milestones; `date`, `description`, `proofUrl` may be `""` | yes |
| `featuredRepositories` | GitHub repo names to highlight, e.g. `["my-repo"]` | yes |
| `contact.formspreeUrl` | Contact form (or use the env variable below) | yes, no form is shown without it |

Crawler permissions (search vs AI training) are in **`src/content/crawlers.ts`**.
Departure-board wording is in `src/content/stations.ts`; ticket wording in `src/content/ticket.ts`.

## Environment variables (`.env.example`)

- `SITE_URL` (or `NEXT_PUBLIC_SITE_URL`) — final domain; read only in `src/lib/site-url.ts` (server-only).
- `NEXT_PUBLIC_FORMSPREE_URL` — e.g. `https://formspree.io/f/xxxx`; read only in `src/lib/server-env.ts`.

## Deploy on Vercel

1. Push the repo to GitHub, import it in Vercel (framework: Next.js, Node.js 26.x).
2. Add `SITE_URL` (and `NEXT_PUBLIC_FORMSPREE_URL` if wanted) under Project → Settings → Environment Variables.
3. Deploy, then check `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/facts.json`, `/md`, and the Open Graph image.

## Structure

```
src/app            layout, page, metadata routes, llms.txt, llms-full.txt, facts.json, md
src/components     layout (providers), navigation (board, rail), station, ticket, sections,
                   effects (landscape + shader), github, contact, ui
src/content        your content + crawler policy
src/lib            github, markdown, metadata, structured-data, server-only env helpers
src/styles         tokens, mixins, typography, utilities
```

## Notes

- Animation libraries (GSAP, Lenis, Framer Motion features, Three.js) are loaded on demand and are skipped for
  reduced motion, Save-Data and low-power devices. Without them the site is a plain, fully working page.
- GitHub is contacted only after a visitor presses "Load public repositories".
- The Content-Security-Policy ships as **report-only**; promote it to enforced after checking the deployed console.
- Regenerate icons from `src/app/icon.svg` with `npm run icons`; rebuild the portrait with `npm run portrait <image>`.


## Pages

| Route | What it shows |
| --- | --- |
| `/` | The full journey (all six stations) |
| `/about` | Intro, journey ticket, "How I like to work" (`approach` in `site.ts`), interests |
| `/projects` | Project log: published projects only, honest empty state otherwise |
| `/projects/<slug>` | One page per published project (set `published: true` in `site.ts`) |
| `/github` | Public repositories, requested only when the visitor presses the button |
| `/contact` | Closing message, LinkedIn/GitHub, and the form only if Formspree is configured |

All text still comes from `src/content/site.ts`; the sitemap, `llms.txt` and breadcrumbs follow the same content.
