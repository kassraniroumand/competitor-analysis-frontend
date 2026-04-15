import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  MessageSquare, Sparkles, Check, X, ChevronRight,
  Search, Users, BarChart3, Target, FileText, Clock,
} from "lucide-react";

const categories = [
  {
    id: "research",
    label: "Market Research",
    icon: Search,
    chatgpt: {
      title: "Manual prompting",
      points: [
        "You write multiple prompts to get fragmented data",
        "Results may be outdated or hallucinated",
        "No structured output — just walls of text",
        "You must verify every claim yourself",
      ],
      verdict: "slow",
    },
    platform: {
      title: "Automated deep-dive",
      points: [
        "One-click analysis of search trends & demand signals",
        "Real-time data from live sources",
        "Structured dashboards with actionable metrics",
        "Sources cited and cross-referenced automatically",
      ],
      verdict: "fast",
    },
  },
  {
    id: "competitors",
    label: "Competitor Analysis",
    icon: Users,
    chatgpt: {
      title: "Surface-level lists",
      points: [
        "Generic competitor names without depth",
        "No pricing or feature comparison tables",
        "Misses indirect competitors entirely",
        "Stale training data — new entrants are invisible",
      ],
      verdict: "slow",
    },
    platform: {
      title: "Full competitive map",
      points: [
        "Auto-discovers direct & indirect competitors",
        "Side-by-side pricing and feature grids",
        "Identifies gaps and positioning opportunities",
        "Live data ensures new players are captured",
      ],
      verdict: "fast",
    },
  },
  {
    id: "painpoints",
    label: "Pain Points",
    icon: Target,
    chatgpt: {
      title: "Guesswork",
      points: [
        "Generates plausible but unverified pain points",
        "No connection to real user feedback",
        "Can't quantify severity or frequency",
        "Easy to end up solving imaginary problems",
      ],
      verdict: "slow",
    },
    platform: {
      title: "Evidence-based discovery",
      points: [
        "Surfaces real complaints from forums & reviews",
        "Ranks pain points by frequency and intensity",
        "Links to actual user quotes and sources",
        "Prioritizes what users actually struggle with",
      ],
      verdict: "fast",
    },
  },
  {
    id: "scoring",
    label: "Opportunity Scoring",
    icon: BarChart3,
    chatgpt: {
      title: "Subjective opinion",
      points: [
        "Gives a vague 'this could work' assessment",
        "No consistent scoring framework",
        "Different prompts → different conclusions",
        "No comparative benchmarking",
      ],
      verdict: "slow",
    },
    platform: {
      title: "12-dimension scoring",
      points: [
        "Quantified score across market, timing & competition",
        "Consistent framework for every idea",
        "Compare multiple ideas objectively",
        "Backed by data, not vibes",
      ],
      verdict: "fast",
    },
  },
  {
    id: "reports",
    label: "Validation Reports",
    icon: FileText,
    chatgpt: {
      title: "Copy-paste assembly",
      points: [
        "You manually stitch together multiple responses",
        "No consistent format or structure",
        "Can't share with co-founders or investors easily",
        "Hours of prompt engineering for one report",
      ],
      verdict: "slow",
    },
    platform: {
      title: "One-click export",
      points: [
        "Complete go/no-go report generated instantly",
        "Professional format ready for stakeholders",
        "Includes charts, scores, and recommendations",
        "Shareable link or PDF download",
      ],
      verdict: "fast",
    },
  },
];

export default function ChatGPTComparison() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const active = categories.find((c) => c.id === activeCategory)!;

  return (
    <section className="py-20 lg:py-28 max-w-7xl mx-auto px-6 lg:px-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Why not just use{" "}
          <span className="text-muted-foreground line-through decoration-2">ChatGPT</span>?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
          ChatGPT is great for brainstorming. But validating a startup idea needs structured data, real sources, and consistent frameworks — not prompt engineering.
        </p>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
              activeCategory === cat.id
                ? "bg-foreground text-background shadow-md"
                : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
            )}
          >
            <cat.icon className="h-3.5 w-3.5" />
            {cat.label}
          </button>
        ))}
      </div>

      {/* Comparison cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="grid gap-6 lg:grid-cols-2"
        >
          {/* ChatGPT side */}
          <div className="rounded-2xl border border-border bg-card p-6 lg:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-destructive/5 rounded-bl-full" />
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
                <MessageSquare className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">ChatGPT</p>
                <p className="text-base font-semibold text-foreground">{active.chatgpt.title}</p>
              </div>
            </div>
            <ul className="space-y-4">
              {active.chatgpt.points.map((point, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-destructive/10">
                    <X className="h-3 w-3 text-destructive" />
                  </div>
                  <span className="text-sm text-muted-foreground leading-relaxed">{point}</span>
                </motion.li>
              ))}
            </ul>
            <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span>Takes hours of manual work</span>
            </div>
          </div>

          {/* IdeaProbe side */}
          <div className="rounded-2xl border-2 border-primary/20 bg-card p-6 lg:p-8 relative overflow-hidden ring-1 ring-primary/10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full" />
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-medium text-primary uppercase tracking-wider">IdeaProbe</p>
                <p className="text-base font-semibold text-foreground">{active.platform.title}</p>
              </div>
            </div>
            <ul className="space-y-4">
              {active.platform.points.map((point, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-sm text-foreground leading-relaxed">{point}</span>
                </motion.li>
              ))}
            </ul>
            <div className="mt-6 flex items-center gap-2 text-xs text-primary font-medium">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Done in seconds, automatically</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
