export interface SaaSNewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  category: "Funding" | "Product" | "Trend" | "Acquisition" | "Launch";
  tags: string[];
  publishedAt: string;
  readTimeMin: number;
  imageEmoji: string;
}

export const mockNews: SaaSNewsItem[] = [
  {
    id: "n1",
    title: "Vertical AI SaaS startups raised $4.2B in Q1, double last year",
    summary:
      "Investors are concentrating bets on industry-specific AI tools — legaltech, healthtech, and field-service ops led the round count.",
    source: "TechCrunch",
    url: "https://example.com/news/vertical-ai-q1",
    category: "Funding",
    tags: ["AI", "Vertical SaaS", "Funding"],
    publishedAt: "2026-04-19",
    readTimeMin: 4,
    imageEmoji: "💸",
  },
  {
    id: "n2",
    title: "Notion launches autonomous workspace agents",
    summary:
      "New 'workspace agents' can draft pages, run searches, and update databases without explicit prompts. Currently in beta for Enterprise.",
    source: "The Verge",
    url: "https://example.com/news/notion-agents",
    category: "Product",
    tags: ["Notion", "Agents", "Productivity"],
    publishedAt: "2026-04-18",
    readTimeMin: 3,
    imageEmoji: "🤖",
  },
  {
    id: "n3",
    title: "Stripe acquires usage-metering startup Lago for ~$700M",
    summary:
      "The deal positions Stripe as the default billing layer for AI-pricing models where per-token and per-call usage dominate.",
    source: "Bloomberg",
    url: "https://example.com/news/stripe-lago",
    category: "Acquisition",
    tags: ["Stripe", "Billing", "Pricing"],
    publishedAt: "2026-04-17",
    readTimeMin: 5,
    imageEmoji: "🤝",
  },
  {
    id: "n4",
    title: "PLG playbook is breaking — sales-led is back for AI tools",
    summary:
      "Median ACV for AI SaaS in Q1 was $48K, up 3.1× YoY. Self-serve trials underperform when buyers need security review and SOC2.",
    source: "SaaStr",
    url: "https://example.com/news/sales-led-ai",
    category: "Trend",
    tags: ["GTM", "PLG", "AI"],
    publishedAt: "2026-04-16",
    readTimeMin: 6,
    imageEmoji: "📈",
  },
  {
    id: "n5",
    title: "Linear releases public roadmap API for embedded planning",
    summary:
      "Lets external apps surface Linear projects and timelines in-context. Cursor and Vercel are first to ship integrations.",
    source: "Linear Blog",
    url: "https://example.com/news/linear-api",
    category: "Launch",
    tags: ["Linear", "API", "Integrations"],
    publishedAt: "2026-04-15",
    readTimeMin: 2,
    imageEmoji: "🚀",
  },
  {
    id: "n6",
    title: "EU AI Act compliance hits SaaS — Q2 enforcement begins",
    summary:
      "All AI-feature-bearing SaaS sold into the EU must now provide model cards and incident logs. Vendors are scrambling on documentation.",
    source: "Reuters",
    url: "https://example.com/news/eu-ai-act",
    category: "Trend",
    tags: ["Compliance", "EU", "AI Act"],
    publishedAt: "2026-04-14",
    readTimeMin: 7,
    imageEmoji: "⚖️",
  },
  {
    id: "n7",
    title: "Vercel introduces 'Marketplace Plans' — bundled SaaS via the platform",
    summary:
      "Customers can subscribe to multiple integrated SaaS offerings (databases, monitoring, auth) under a single Vercel invoice.",
    source: "Vercel Blog",
    url: "https://example.com/news/vercel-marketplace",
    category: "Launch",
    tags: ["Vercel", "Marketplace", "Distribution"],
    publishedAt: "2026-04-12",
    readTimeMin: 3,
    imageEmoji: "🛒",
  },
  {
    id: "n8",
    title: "Series A median check climbs to $14M as AI deals stay hot",
    summary:
      "Series A rounds for AI-native SaaS now median $14M at $70M post — well above the broader SaaS median of $9M.",
    source: "Crunchbase",
    url: "https://example.com/news/series-a-median",
    category: "Funding",
    tags: ["Series A", "Funding", "AI"],
    publishedAt: "2026-04-10",
    readTimeMin: 4,
    imageEmoji: "📊",
  },
];

export const newsCategories: SaaSNewsItem["category"][] = [
  "Funding",
  "Product",
  "Trend",
  "Acquisition",
  "Launch",
];
