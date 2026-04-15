import { motion } from "framer-motion";
import { MessageSquare, Sparkles, Check, X, ArrowRight } from "lucide-react";

const features = [
  { category: "Market Research", chatgpt: "Manual prompting, outdated data", platform: "One-click real-time analysis" },
  { category: "Competitors", chatgpt: "Generic surface-level lists", platform: "Full competitive map with pricing" },
  { category: "Pain Points", chatgpt: "Guesswork, no real evidence", platform: "Evidence-based from 50+ sources" },
  { category: "Scoring", chatgpt: "Subjective, inconsistent", platform: "12-dimension data-backed scoring" },
  { category: "Reports", chatgpt: "Copy-paste from multiple chats", platform: "One-click professional export" },
  { category: "Speed", chatgpt: "Hours of prompt engineering", platform: "Results in under 60 seconds" },
  { category: "Data Sources", chatgpt: "Training data only", platform: "Live data from real sources" },
  { category: "Consistency", chatgpt: "Different prompts → different results", platform: "Same framework every time" },
];

export default function ChatGPTComparison() {
  return (
    <section className="py-20 lg:py-28 max-w-5xl mx-auto px-4 sm:px-6 lg:px-10">
      {/* Header */}
      <div className="text-center mb-12">
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

      {/* Comparison Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-border overflow-hidden"
      >
        {/* Table Header */}
        <div className="grid grid-cols-[1fr_1fr_1fr] bg-muted/50">
          <div className="p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Feature
          </div>
          <div className="p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2 border-l border-border">
            <MessageSquare className="h-3.5 w-3.5" />
            ChatGPT
          </div>
          <div className="p-4 text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-2 border-l border-primary/20 bg-primary/5">
            <Sparkles className="h-3.5 w-3.5" />
            IdeaProbe
          </div>
        </div>

        {/* Table Rows */}
        {features.map((feature, i) => (
          <motion.div
            key={feature.category}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="grid grid-cols-[1fr_1fr_1fr] border-t border-border"
          >
            <div className="p-4 text-sm font-medium text-foreground flex items-center">
              {feature.category}
            </div>
            <div className="p-4 text-sm text-muted-foreground border-l border-border flex items-start gap-2">
              <X className="h-4 w-4 shrink-0 text-destructive/60 mt-0.5" />
              <span>{feature.chatgpt}</span>
            </div>
            <div className="p-4 text-sm text-foreground border-l border-primary/20 bg-primary/[0.02] flex items-start gap-2">
              <Check className="h-4 w-4 shrink-0 text-primary mt-0.5" />
              <span>{feature.platform}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA */}
      <div className="flex justify-center pt-8">
        <a
          href="/ideas"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:scale-[1.02]"
        >
          Try IdeaProbe free
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
