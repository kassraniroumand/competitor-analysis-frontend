import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  MessageSquare, Sparkles, Check, X, ChevronRight,
  Search, Users, BarChart3, Target, FileText, Clock,
  ArrowRight, Zap,
} from "lucide-react";

const categories = [
  {
    id: "research",
    label: "Market Research",
    icon: Search,
    chatgpt: {
      title: "Manual prompting",
      points: [
        "Multiple prompts for fragmented data",
        "Outdated or hallucinated results",
        "No structured output",
        "Manual verification required",
      ],
    },
    platform: {
      title: "Automated deep-dive",
      points: [
        "One-click trend & demand analysis",
        "Real-time data from live sources",
        "Structured dashboards & metrics",
        "Auto-cited & cross-referenced",
      ],
    },
    stat: { label: "Time saved", value: "4hrs → 30s" },
  },
  {
    id: "competitors",
    label: "Competitors",
    icon: Users,
    chatgpt: {
      title: "Surface-level lists",
      points: [
        "Generic names without depth",
        "No pricing or feature grids",
        "Misses indirect competitors",
        "Stale training data",
      ],
    },
    platform: {
      title: "Full competitive map",
      points: [
        "Discovers direct & indirect players",
        "Side-by-side pricing & features",
        "Identifies gaps & opportunities",
        "Live data captures new entrants",
      ],
    },
    stat: { label: "Competitors found", value: "3× more" },
  },
  {
    id: "painpoints",
    label: "Pain Points",
    icon: Target,
    chatgpt: {
      title: "Guesswork",
      points: [
        "Plausible but unverified points",
        "No real user feedback connection",
        "Can't quantify severity",
        "Risk of solving imaginary problems",
      ],
    },
    platform: {
      title: "Evidence-based discovery",
      points: [
        "Real complaints from forums & reviews",
        "Ranked by frequency and intensity",
        "Linked to actual user quotes",
        "Prioritized by real struggle data",
      ],
    },
    stat: { label: "Data sources", value: "50+" },
  },
  {
    id: "scoring",
    label: "Scoring",
    icon: BarChart3,
    chatgpt: {
      title: "Subjective opinion",
      points: [
        "Vague 'this could work' assessment",
        "No consistent framework",
        "Different prompts → different results",
        "No comparative benchmarks",
      ],
    },
    platform: {
      title: "12-dimension scoring",
      points: [
        "Quantified market, timing & competition",
        "Consistent framework for every idea",
        "Compare multiple ideas objectively",
        "Data-backed, not vibes",
      ],
    },
    stat: { label: "Dimensions", value: "12" },
  },
  {
    id: "reports",
    label: "Reports",
    icon: FileText,
    chatgpt: {
      title: "Copy-paste assembly",
      points: [
        "Manually stitch multiple responses",
        "No consistent format",
        "Can't easily share with stakeholders",
        "Hours of prompt engineering",
      ],
    },
    platform: {
      title: "One-click export",
      points: [
        "Complete go/no-go report instantly",
        "Professional stakeholder format",
        "Charts, scores & recommendations",
        "Shareable link or PDF download",
      ],
    },
    stat: { label: "Report time", value: "< 1 min" },
  },
];

export default function ChatGPTComparison() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const active = categories.find((c) => c.id === activeCategory)!;

  return (
    <section className="py-20 lg:py-28 max-w-6xl mx-auto px-6 lg:px-10">
      {/* Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 rounded-full bg-destructive/10 px-4 py-1.5 text-xs font-semibold text-destructive mb-5">
          <MessageSquare className="h-3.5 w-3.5" />
          ChatGPT is not enough
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Stop prompt-engineering.
          <br />
          <span className="text-primary">Start validating.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
          ChatGPT is great for brainstorming — but validation needs structured data, real sources, and consistent frameworks.
        </p>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <cat.icon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{cat.label}</span>
              <span className="sm:hidden">{cat.label.split(" ")[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Comparison */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="space-y-4"
        >
          {/* Stat banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-center gap-3 rounded-2xl bg-primary/5 border border-primary/10 py-3 px-5"
          >
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              {active.stat.label}:{" "}
              <span className="text-primary font-bold">{active.stat.value}</span>
            </span>
          </motion.div>

          {/* Two columns */}
          <div className="grid gap-4 lg:grid-cols-2">
            {/* ChatGPT side */}
            <div className="rounded-2xl border border-border bg-card p-5 lg:p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">ChatGPT</p>
                  <p className="text-sm font-semibold text-foreground">{active.chatgpt.title}</p>
                </div>
              </div>
              <ul className="space-y-3">
                {active.chatgpt.points.map((point, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-start gap-2.5"
                  >
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-destructive/10">
                      <X className="h-3 w-3 text-destructive" />
                    </div>
                    <span className="text-sm text-muted-foreground leading-relaxed">{point}</span>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground/70 border-t border-border pt-4">
                <Clock className="h-3.5 w-3.5" />
                <span>Hours of manual work</span>
              </div>
            </div>

            {/* IdeaProbe side */}
            <div className="rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/[0.03] to-transparent p-5 lg:p-7 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
              <div className="flex items-center gap-3 mb-5 relative">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-primary uppercase tracking-wider">IdeaProbe</p>
                  <p className="text-sm font-semibold text-foreground">{active.platform.title}</p>
                </div>
              </div>
              <ul className="space-y-3 relative">
                {active.platform.points.map((point, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-start gap-2.5"
                  >
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm text-foreground leading-relaxed">{point}</span>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-5 flex items-center gap-2 text-xs text-primary font-medium border-t border-primary/10 pt-4">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Done in seconds, automatically</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex justify-center pt-4">
            <a
              href="/ideas"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:scale-[1.02]"
            >
              Try IdeaProbe free
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
