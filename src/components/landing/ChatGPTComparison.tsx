import { motion } from "framer-motion";
import { Sparkles, Check, X, Search, BarChart3, Target, FileText, Clock, ShieldCheck, Layers, Zap, ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const comparisons = [
  {
    icon: Search,
    title: "Deep Market Research",
    chatgpt: "Manual prompting, inconsistent results",
    platform: "One-click real-time market validation",
  },
  {
    icon: Layers,
    title: "Competitor Analysis",
    chatgpt: "Surface-level, outdated training data",
    platform: "Live competitor intel with scoring",
  },
];

const highlights = [
  {
    icon: BarChart3,
    title: "12-Dimension Scoring",
    description: "Consistent structured framework that scores every idea the same way — no more guessing.",
  },
  {
    icon: Target,
    title: "Real-Time Data Sources",
    description: "Live market signals and community interest, not stale training data.",
  },
  {
    icon: FileText,
    title: "One-Click Reports",
    description: "Full validation reports generated instantly. No prompt engineering needed.",
  },
  {
    icon: Clock,
    title: "Results in < 60s",
    description: "From idea to validated report in under a minute, every single time.",
  },
];

function ComparisonPoint({ label, positive }: { label: string; positive: boolean }) {
  return (
    <div className="flex items-start gap-2.5">
      {positive ? (
        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <Check className="h-3 w-3 text-primary" />
        </div>
      ) : (
        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-destructive/10">
          <X className="h-3 w-3 text-destructive/70" />
        </div>
      )}
      <span className={`text-sm leading-relaxed ${positive ? "text-foreground" : "text-muted-foreground"}`}>
        {label}
      </span>
    </div>
  );
}

export default function ChatGPTComparison() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
      {/* Header — matches "Built for serious business" */}
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Why IdeaProbe?
      </h2>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        General-purpose AI is great for brainstorming — but idea validation
        needs purpose-built tools with real data and consistent frameworks.
      </p>

      <Separator className="my-8 bg-border" />

      {/* Two large comparison cards */}
      <div className="grid gap-px lg:grid-cols-2">
        {comparisons.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className={`space-y-5 py-8 ${idx === 0 ? "lg:pr-10 lg:border-r lg:border-border" : "lg:pl-10"}`}
          >
            <div className="flex items-center gap-2.5">
              <item.icon className="h-5 w-5 text-foreground" />
              <h3 className="text-base font-bold text-foreground">{item.title}</h3>
            </div>

            <div className="space-y-3">
              <ComparisonPoint label={item.chatgpt} positive={false} />
              <ComparisonPoint label={item.platform} positive={true} />
            </div>

            <div className="mt-4 flex h-[220px] items-center justify-center overflow-hidden rounded-xl bg-secondary">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-background shadow-sm">
                <item.icon className="h-7 w-7 text-foreground" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Separator className="my-8 bg-border" />

      {/* Bottom 4 highlights */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: idx * 0.06 }}
            className="space-y-2.5"
          >
            <div className="flex items-center gap-2">
              <item.icon className="h-4 w-4 text-foreground" />
              <h3 className="text-sm font-bold text-foreground">{item.title}</h3>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="flex justify-center pt-12">
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
