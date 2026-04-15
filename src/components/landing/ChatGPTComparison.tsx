import { motion } from "framer-motion";
import { Sparkles, Check, X, ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const features = [
  { category: "Market Research", chatgpt: false, gemini: false, platform: true },
  { category: "Competitor Analysis", chatgpt: false, gemini: false, platform: true },
  { category: "Pain Point Discovery", chatgpt: false, gemini: false, platform: true },
  { category: "12-Dimension Scoring", chatgpt: false, gemini: false, platform: true },
  { category: "Real-Time Data Sources", chatgpt: false, gemini: true, platform: true },
  { category: "One-Click Reports", chatgpt: false, gemini: false, platform: true },
  { category: "Consistent Framework", chatgpt: false, gemini: false, platform: true },
  { category: "Results in < 60s", chatgpt: false, gemini: false, platform: true },
];

function StatusIcon({ available }: { available: boolean }) {
  return available ? (
    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
      <Check className="h-3.5 w-3.5 text-primary" />
    </div>
  ) : (
    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-destructive/10">
      <X className="h-3.5 w-3.5 text-destructive/70" />
    </div>
  );
}

export default function ChatGPTComparison() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
      {/* Header row — same layout as "Built for serious business" */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Why IdeaProbe?
        </h2>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground lg:text-right">
          General-purpose AI is great for brainstorming — but idea validation needs purpose-built tools with real data and consistent frameworks.
        </p>
      </div>

      <Separator className="my-8 bg-border" />

      {/* Comparison Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-border overflow-hidden"
      >
        {/* Header Row */}
        <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] sm:grid-cols-[2fr_1fr_1fr_1fr] bg-muted/50 text-center">
          <div className="p-3 sm:p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground text-left">
            Feature
          </div>
          <div className="p-3 sm:p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground border-l border-border">
            ChatGPT
          </div>
          <div className="p-3 sm:p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground border-l border-border">
            Gemini
          </div>
          <div className="p-3 sm:p-4 text-xs font-semibold uppercase tracking-wider text-primary border-l border-primary/20 bg-primary/5">
            <span className="flex items-center justify-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              IdeaProbe
            </span>
          </div>
        </div>

        {/* Rows */}
        {features.map((f, i) => (
          <motion.div
            key={f.category}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="grid grid-cols-[1.4fr_1fr_1fr_1fr] sm:grid-cols-[2fr_1fr_1fr_1fr] border-t border-border text-center"
          >
            <div className="p-3 sm:p-4 text-sm font-medium text-foreground text-left flex items-center">
              {f.category}
            </div>
            <div className="p-3 sm:p-4 border-l border-border flex items-center justify-center">
              <StatusIcon available={f.chatgpt} />
            </div>
            <div className="p-3 sm:p-4 border-l border-border flex items-center justify-center">
              <StatusIcon available={f.gemini} />
            </div>
            <div className="p-3 sm:p-4 border-l border-primary/20 bg-primary/[0.02] flex items-center justify-center">
              <StatusIcon available={f.platform} />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA */}
      <div className="flex justify-center pt-10">
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
