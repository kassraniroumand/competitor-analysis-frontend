import { motion } from "framer-motion";
import { Sparkles, Check, X, ArrowRight, ChevronsRight } from "lucide-react";
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
      {/* Header */}
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Built for serious business.
      </h2>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        IdeaProbe is designed for professional teams. Our platform brings deep market analysis, competitor intelligence, and AI-powered scoring.
      </p>

      <Separator className="my-8 bg-border" />

      {/* Mobile swipe hint */}
      <div className="mb-3 flex items-center gap-1.5 text-xs text-muted-foreground sm:hidden">
        <ChevronsRight className="h-3.5 w-3.5 animate-pulse" />
        <span>Swipe to see all columns</span>
      </div>

      {/* Comparison Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative rounded-2xl border border-border"
      >
        <div className="overflow-x-auto rounded-2xl">
        <table className="w-full min-w-[480px] text-center">
          <thead>
            <tr className="bg-muted/50">
              <th className="sticky left-0 z-20 bg-muted p-3 sm:p-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Feature
              </th>
              <th className="p-3 sm:p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground border-l border-border">
                ChatGPT
              </th>
              <th className="p-3 sm:p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground border-l border-border">
                Gemini
              </th>
              <th className="p-3 sm:p-4 text-xs font-semibold uppercase tracking-wider text-primary border-l border-primary/20 bg-primary/5">
                <span className="flex items-center justify-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  IdeaProbe
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {features.map((f, i) => (
              <motion.tr
                key={f.category}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="border-t border-border"
              >
                <td className="sticky left-0 z-10 bg-background p-3 sm:p-4 text-left text-sm font-medium text-foreground shadow-[1px_0_0_0_hsl(var(--border))]">
                  {f.category}
                </td>
                <td className="p-3 sm:p-4 border-l border-border">
                  <div className="flex items-center justify-center">
                    <StatusIcon available={f.chatgpt} />
                  </div>
                </td>
                <td className="p-3 sm:p-4 border-l border-border">
                  <div className="flex items-center justify-center">
                    <StatusIcon available={f.gemini} />
                  </div>
                </td>
                <td className="p-3 sm:p-4 border-l border-primary/20 bg-primary/[0.02]">
                  <div className="flex items-center justify-center">
                    <StatusIcon available={f.platform} />
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        </div>
        {/* Right-edge fade hint that the table scrolls (mobile only) */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 rounded-r-2xl bg-gradient-to-l from-background to-transparent sm:hidden" />
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
