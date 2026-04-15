import { motion } from "framer-motion";
import { Sparkles, Search, BarChart3, Target, Zap, Clock, FileText, ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const topFeatures = [
  {
    icon: Search,
    title: "ChatGPT / Gemini",
    description:
      "General-purpose AI can brainstorm ideas, but requires manual prompting, lacks real-time market data, and gives inconsistent results every time you ask.",
    highlight: false,
  },
  {
    icon: Sparkles,
    title: "IdeaProbe",
    description:
      "Purpose-built validation engine with real-time data sources, 12-dimension scoring, competitor analysis, and consistent frameworks — all in under 60 seconds.",
    highlight: true,
  },
];

const bottomFeatures = [
  {
    icon: BarChart3,
    title: "12-Dimension Scoring",
    description: "Structured framework scores every idea consistently, unlike generic AI chat.",
  },
  {
    icon: Target,
    title: "Real-Time Data",
    description: "Live market signals and competitor intel — not stale training data.",
  },
  {
    icon: FileText,
    title: "One-Click Reports",
    description: "Full validation reports generated instantly, no prompt engineering needed.",
  },
  {
    icon: Clock,
    title: "Results in < 60s",
    description: "From idea to validated report in under a minute, every single time.",
  },
];

export default function ChatGPTComparison() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
      {/* Header row */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Why IdeaProbe?
        </h2>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground lg:text-right">
          General-purpose AI is great for brainstorming — but idea validation
          needs purpose-built tools with real data and consistent frameworks.
        </p>
      </div>

      <Separator className="my-8 bg-border" />

      {/* Two large cards */}
      <div className="grid gap-px lg:grid-cols-2">
        {topFeatures.map((feature, idx) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className={`space-y-4 py-8 ${idx === 0 ? "lg:pr-10 lg:border-r lg:border-border" : "lg:pl-10"}`}
          >
            <div className="flex items-center gap-2.5">
              <feature.icon className="h-5 w-5 text-foreground" />
              <h3 className="text-base font-bold text-foreground">{feature.title}</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground max-w-sm">
              {feature.description}
            </p>
            <div
              className={`mt-4 flex h-[320px] items-center justify-center overflow-hidden rounded-xl ${
                feature.highlight ? "bg-primary/10" : "bg-secondary"
              }`}
            >
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl shadow-sm ${
                  feature.highlight ? "bg-primary text-primary-foreground" : "bg-background"
                }`}
              >
                <feature.icon className="h-7 w-7" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Separator className="my-8 bg-border" />

      {/* Bottom 4 small features */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {bottomFeatures.map((feature, idx) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: idx * 0.06 }}
            className="space-y-2.5"
          >
            <div className="flex items-center gap-2">
              <feature.icon className="h-4 w-4 text-foreground" />
              <h3 className="text-sm font-bold text-foreground">{feature.title}</h3>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {feature.description}
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
