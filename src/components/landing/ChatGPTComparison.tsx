import { motion } from "framer-motion";
import {
  MessageSquare, Sparkles, Check, X, ArrowRight,
} from "lucide-react";

const categories = [
  {
    label: "Market Research",
    chatgpt: "Relies on broad, often outdated data. Lacks structured validation frameworks.",
    platform: "Analyzes real-time trends and specific market segments for precise validation.",
  },
  {
    label: "Competitors",
    chatgpt: "Limited ability to identify niche competitors or analyze true market positioning.",
    platform: "Identifies direct and indirect competitors with detailed positioning insights.",
  },
  {
    label: "Pain Points",
    chatgpt: "Can infer, but struggles to quantify or prioritize user-reported pain points.",
    platform: "Quantifies and prioritizes user pain points based on structured data analysis.",
  },
  {
    label: "Scoring",
    chatgpt: "No inherent scoring or ranking system for idea viability.",
    platform: "Provides a clear, multi-faceted scoring system for idea viability.",
  },
  {
    label: "Reports",
    chatgpt: "Generates conversational text, not actionable, data-driven reports.",
    platform: "Delivers comprehensive, actionable reports with clear recommendations.",
  },
];

export default function ChatGPTComparison() {
  return (
    <section className="py-20 lg:py-28 max-w-6xl mx-auto px-6 lg:px-10">
      {/* Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 rounded-full bg-destructive/10 px-4 py-1.5 text-xs font-semibold text-destructive mb-5">
          <MessageSquare className="h-3.5 w-3.5" />
          ChatGPT is not enough
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Idea Validation:{" "}
          <span className="text-primary">IdeaProbe</span> vs. the Rest
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
          See how IdeaProbe illuminates market insights that generic AI tools can only guess at.
        </p>
      </div>

      {/* Two columns */}
      <div className="grid gap-5 md:grid-cols-2">
        {/* ChatGPT side */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-border bg-card p-6 lg:p-8"
        >
          <div className="flex items-center gap-3 mb-7">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
              <MessageSquare className="h-4.5 w-4.5 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground">ChatGPT</h3>
          </div>

          <div className="space-y-5">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <h4 className="text-sm font-semibold text-muted-foreground mb-1.5 flex items-center gap-2">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-destructive/10">
                    <X className="h-3 w-3 text-destructive" />
                  </div>
                  {cat.label}
                </h4>
                <p className="text-sm text-muted-foreground/80 pl-7">{cat.chatgpt}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* IdeaProbe side */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/[0.04] to-transparent p-6 lg:p-8 relative overflow-hidden shadow-xl shadow-primary/5"
        >
          <div className="absolute -top-16 -right-16 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />

          <div className="flex items-center gap-3 mb-7 relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Sparkles className="h-4.5 w-4.5 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground">IdeaProbe</h3>
          </div>

          <div className="space-y-5 relative">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <h4 className="text-sm font-semibold text-primary mb-1.5 flex items-center gap-2">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  {cat.label}
                </h4>
                <p className="text-sm text-foreground/80 pl-7">{cat.platform}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 relative">
            <a
              href="/ideas"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:scale-[1.02]"
            >
              Start Validating
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
