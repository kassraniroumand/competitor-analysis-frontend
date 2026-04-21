export type IdeaSource =
  | "Reddit"
  | "Hacker News"
  | "Product Hunt"
  | "Twitter / X"
  | "Indie Hackers"
  | "Y Combinator";

export interface DiscoveredIdea {
  id: string;
  title: string;
  summary: string;
  source: IdeaSource;
  sourceUrl: string;
  sourceHandle: string;
  author: string;
  category: string;
  postedAt: string;
  upvotes: number;
  comments: number;
  trendingScore: number;
  tags: string[];
}

export const SOURCE_META: Record<IdeaSource, { badge: string; color: string }> = {
  "Reddit": { badge: "r/", color: "text-orange-500" },
  "Hacker News": { badge: "HN", color: "text-orange-600" },
  "Product Hunt": { badge: "PH", color: "text-rose-500" },
  "Twitter / X": { badge: "X", color: "text-foreground" },
  "Indie Hackers": { badge: "IH", color: "text-emerald-600" },
  "Y Combinator": { badge: "YC", color: "text-orange-500" },
};

export const discoveredIdeas: DiscoveredIdea[] = [
  {
    id: "d1",
    title: "AI meeting note-taker that actually understands follow-ups",
    summary:
      "Users want a tool that not only transcribes meetings but extracts action items and assigns owners automatically. Existing tools miss nuance.",
    source: "Reddit",
    sourceUrl: "https://reddit.com/r/SaaS/comments/abc",
    sourceHandle: "r/SaaS",
    author: "u/lean_builder",
    category: "Productivity / AI",
    postedAt: "3h ago",
    upvotes: 842,
    comments: 137,
    trendingScore: 94,
    tags: ["AI", "meetings", "B2B"],
  },
  {
    id: "d2",
    title: "Show HN: I built a DB client that explains every query in plain English",
    summary:
      "Developer-focused tool that sits between your IDE and Postgres, explaining queries, plans, and bottlenecks using an LLM.",
    source: "Hacker News",
    sourceUrl: "https://news.ycombinator.com/item?id=123",
    sourceHandle: "news.ycombinator.com",
    author: "showhn_dev",
    category: "DevTools",
    postedAt: "6h ago",
    upvotes: 1245,
    comments: 312,
    trendingScore: 91,
    tags: ["devtools", "postgres", "AI"],
  },
  {
    id: "d3",
    title: "Dentalyze — AI triage for small dental practices",
    summary:
      "Helps small dentists summarize patient records, suggest next-visit plans, and cut admin by 40%. Launching to waitlist this week.",
    source: "Product Hunt",
    sourceUrl: "https://producthunt.com/posts/dentalyze",
    sourceHandle: "producthunt.com",
    author: "Priya S.",
    category: "HealthTech",
    postedAt: "1d ago",
    upvotes: 612,
    comments: 58,
    trendingScore: 87,
    tags: ["health", "AI", "SMB"],
  },
  {
    id: "d4",
    title: "Why isn't there a Figma for interactive data dashboards?",
    summary:
      "Thread with 2k+ engagements asking why BI tools are still clunky to design. Opportunity for a design-first analytics builder.",
    source: "Twitter / X",
    sourceUrl: "https://x.com/status/abc",
    sourceHandle: "@lennysan",
    author: "Lenny R.",
    category: "DataViz / BI",
    postedAt: "8h ago",
    upvotes: 2103,
    comments: 489,
    trendingScore: 89,
    tags: ["BI", "design", "analytics"],
  },
  {
    id: "d5",
    title: "Made $12k MRR with a Chrome extension for Shopify refunds",
    summary:
      "Solo founder sharing growth playbook. Market signal: Shopify merchants spend 6+ hrs/week on refund disputes; no specialized tooling.",
    source: "Indie Hackers",
    sourceUrl: "https://indiehackers.com/post/abc",
    sourceHandle: "indiehackers.com",
    author: "sam.e",
    category: "E-commerce / SMB",
    postedAt: "2d ago",
    upvotes: 487,
    comments: 94,
    trendingScore: 78,
    tags: ["shopify", "ecommerce", "chrome"],
  },
  {
    id: "d6",
    title: "W24: Palette — Auto-generated brand kits for solo founders",
    summary:
      "YC-backed. Lets non-designers generate brand guidelines, logo variants, and templates in one pass. Hiring designers in SF.",
    source: "Y Combinator",
    sourceUrl: "https://ycombinator.com/companies/palette",
    sourceHandle: "ycombinator.com",
    author: "YC W24",
    category: "Design / AI",
    postedAt: "4d ago",
    upvotes: 321,
    comments: 22,
    trendingScore: 72,
    tags: ["design", "AI", "branding"],
  },
  {
    id: "d7",
    title: "r/smallbusiness: We still book appointments via sticky notes",
    summary:
      "Hundreds of comments from local shops wanting a dead-simple SMS booking tool — no Calendly complexity, just a number and a calendar.",
    source: "Reddit",
    sourceUrl: "https://reddit.com/r/smallbusiness/comments/xyz",
    sourceHandle: "r/smallbusiness",
    author: "u/mainstreet_mary",
    category: "LocalTech",
    postedAt: "12h ago",
    upvotes: 934,
    comments: 278,
    trendingScore: 83,
    tags: ["booking", "SMB", "SMS"],
  },
  {
    id: "d8",
    title: "Ask HN: What's missing in personal-finance apps for immigrants?",
    summary:
      "Cross-border banking, sending money home, credit-building from scratch — commenters note no one serves this well in the US.",
    source: "Hacker News",
    sourceUrl: "https://news.ycombinator.com/item?id=456",
    sourceHandle: "news.ycombinator.com",
    author: "curious_dev",
    category: "FinTech",
    postedAt: "1d ago",
    upvotes: 756,
    comments: 198,
    trendingScore: 80,
    tags: ["fintech", "immigrants", "banking"],
  },
  {
    id: "d9",
    title: "Stitch — AI tailor that turns screenshots into code",
    summary:
      "Trending #1 on PH. Upload a UI screenshot and get React + Tailwind components. Great traction, unclear moat vs v0 / Builder.",
    source: "Product Hunt",
    sourceUrl: "https://producthunt.com/posts/stitch",
    sourceHandle: "producthunt.com",
    author: "Marco D.",
    category: "DevTools / AI",
    postedAt: "18h ago",
    upvotes: 1420,
    comments: 221,
    trendingScore: 85,
    tags: ["AI", "devtools", "design"],
  },
  {
    id: "d10",
    title: "Solo founder: $4k MRR running a 'done-for-you' SEO audits service",
    summary:
      "Productized service model. Suggests a productized SaaS opportunity: self-serve site audits with prioritized fix queues.",
    source: "Indie Hackers",
    sourceUrl: "https://indiehackers.com/post/seo-audits",
    sourceHandle: "indiehackers.com",
    author: "nora.b",
    category: "Marketing / SEO",
    postedAt: "3d ago",
    upvotes: 298,
    comments: 54,
    trendingScore: 68,
    tags: ["SEO", "marketing", "solo"],
  },
  {
    id: "d11",
    title: "Viral thread: 'Every Notion user I know wants a better CRM'",
    summary:
      "1.3M impressions. Notion-native, opinionated sales CRMs are underbuilt. Big long-tail opportunity.",
    source: "Twitter / X",
    sourceUrl: "https://x.com/status/xyz",
    sourceHandle: "@janecruz",
    author: "Jane C.",
    category: "Sales / CRM",
    postedAt: "5h ago",
    upvotes: 3102,
    comments: 612,
    trendingScore: 92,
    tags: ["notion", "CRM", "sales"],
  },
  {
    id: "d12",
    title: "W24: Helm — AI-native project management for tiny teams",
    summary:
      "Positioning against Linear / Asana. Focus on 2–8 person startups where Jira is overkill and Notion is undercooked.",
    source: "Y Combinator",
    sourceUrl: "https://ycombinator.com/companies/helm",
    sourceHandle: "ycombinator.com",
    author: "YC W24",
    category: "Productivity",
    postedAt: "6d ago",
    upvotes: 189,
    comments: 31,
    trendingScore: 65,
    tags: ["productivity", "AI", "startups"],
  },
];

export const discoverCategories = [
  "All",
  "Productivity / AI",
  "DevTools",
  "HealthTech",
  "FinTech",
  "E-commerce / SMB",
  "Marketing / SEO",
  "Design / AI",
  "Sales / CRM",
  "LocalTech",
  "DataViz / BI",
  "DevTools / AI",
];

export const discoverSources: ("All" | IdeaSource)[] = [
  "All",
  "Reddit",
  "Hacker News",
  "Product Hunt",
  "Twitter / X",
  "Indie Hackers",
  "Y Combinator",
];
