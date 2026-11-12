/**
 * Crawler policy — the ONE place to decide which bots may read the site.
 * `true` = allowed, `false` = blocked. Used by src/app/robots.ts.
 *
 * Search/retrieval bots (they fetch pages so people can find or ask about you) and
 * training bots (they collect pages to train AI models) are separate decisions.
 *
 * Defaults below: allow search and user-requested retrieval, opt OUT of model training.
 * Change any value to suit you. robots.txt is a request that well-behaved bots follow;
 * it does not guarantee indexing or inclusion in any search result or AI answer.
 */
export const crawlerPolicy = {
  /** Classic search engines */
  search: {
    Googlebot: true,
    Bingbot: true,
    DuckDuckBot: true,
  },

  /** AI search / answer engines that index pages to cite them */
  aiSearch: {
    "OAI-SearchBot": true,
    "Claude-SearchBot": true,
    PerplexityBot: true,
  },

  /** Fetches made because a person asked an assistant to open the page */
  userRequested: {
    "ChatGPT-User": true,
    "Claude-User": true,
  },

  /** Crawlers that collect content for AI model training */
  training: {
    GPTBot: false,
    ClaudeBot: false,
    "anthropic-ai": false,
    "Google-Extended": false,
    "Applebot-Extended": false,
  },
} as const;
