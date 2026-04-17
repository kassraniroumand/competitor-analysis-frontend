import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, TrendingUp, Users, Target, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { moreFeaturesData } from "./data";
import type { MoreFeaturesSectionProps } from "./MoreFeaturesSection.types";

export function MoreFeaturesSection({ items = moreFeaturesData }: MoreFeaturesSectionProps) {
  const [openIndex, setOpenIndex] = useState(0);
  const isMobile = useIsMobile();

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
      <div className="overflow-hidden rounded-3xl bg-foreground text-background">
        <div className="grid lg:grid-cols-2">
          {/* Left — Title + Accordion */}
          <div className="flex flex-col justify-center p-8 lg:p-14">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">More features</h2>

            <div className="mt-10 space-y-0 divide-y divide-background/10">
              {items.map((item, i) => {
                const isOpen = openIndex === i;
                return (
                  <button
                    key={item.title}
                    className={cn("w-full text-left py-5 px-4 rounded-xl transition-colors", isOpen && "bg-background")}
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  >
                    <div className="flex items-center gap-3">
                      {isOpen ? <Minus className="h-4 w-4 shrink-0 text-black" /> : <Plus className="h-4 w-4 shrink-0 text-background/60" />}
                      <span className={cn("text-base font-semibold transition-colors", isOpen ? "text-black" : "text-background/60")}>
                        {item.title}
                      </span>
                    </div>
                    {isMobile ? (
                      isOpen && (
                        <div className="overflow-hidden">
                          <p className="mt-3 pl-7 text-sm leading-relaxed text-black/70">{item.description}</p>
                        </div>
                      )
                    ) : (
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <p className="mt-3 pl-7 text-sm leading-relaxed text-black/70">{item.description}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right — Dynamic collage */}
          <div className="relative overflow-hidden min-h-[300px] lg:min-h-0">
            {isMobile ? (
              <div key={openIndex} className="absolute inset-0 p-6">
                <CollageContent index={openIndex} />
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={openIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute inset-0 p-6 lg:p-8"
                >
                  <CollageContent index={openIndex} />
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

interface CollageContentProps {
  index: number;
}

function CollageContent({ index }: CollageContentProps) {
  return (
    <div className="relative h-full w-full">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 h-32 w-32 blur-3xl" />

      {index === 0 && (
        <>
          <div className="absolute top-4 left-4 rounded-xl bg-background text-foreground p-4 shadow-lg w-48">
            <p className="text-xs font-medium text-muted-foreground">Search Volume</p>
            <p className="mt-1 text-2xl font-bold text-primary">12.4K</p>
            <p className="text-[10px] text-muted-foreground">monthly searches</p>
          </div>
          <div className="absolute top-8 right-6 rounded-xl bg-primary text-primary-foreground px-5 py-2.5 shadow-lg text-sm font-semibold">Trending ↑</div>
          <div className="absolute top-36 right-4 rounded-xl bg-background text-foreground p-4 shadow-lg w-52">
            <p className="text-xs font-medium text-muted-foreground">Community Signals</p>
            <div className="mt-2 space-y-1.5">
              {["Reddit — 340 mentions", "HN — 89 posts", "Twitter — 1.2K tweets"].map((c) => (
                <div key={c} className="flex items-center gap-2 text-xs"><div className="h-2 w-2 rounded-full bg-primary" /><span>{c}</span></div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-8 left-8 rounded-xl bg-background text-foreground p-4 shadow-lg">
            <div className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-primary" /><span className="text-xs font-semibold">+27% growth YoY</span></div>
          </div>
        </>
      )}

      {index === 1 && (
        <>
          <div className="absolute top-4 left-4 rounded-xl bg-background text-foreground p-4 shadow-lg w-52">
            <p className="text-xs font-medium text-muted-foreground">Competitors found</p>
            <div className="mt-2 space-y-1.5">
              {["Acme Corp — $49/mo", "RivalX — $29/mo", "BetaTool — Free"].map((c) => (
                <div key={c} className="flex items-center gap-2 text-xs"><div className="h-2 w-2 rounded-full bg-primary" /><span>{c}</span></div>
              ))}
            </div>
          </div>
          <div className="absolute top-8 right-6 rounded-xl bg-primary text-primary-foreground px-5 py-2.5 shadow-lg text-sm font-semibold">3 gaps found</div>
          <div className="absolute bottom-32 right-8 rounded-xl bg-background text-foreground p-4 shadow-lg w-48">
            <p className="text-xs font-medium text-muted-foreground">Feature Gap</p>
            <p className="mt-1 text-sm font-semibold text-primary">API access</p>
            <p className="text-[10px] text-muted-foreground">No competitor offers this</p>
          </div>
          <div className="absolute bottom-8 left-8 rounded-xl bg-background text-foreground p-4 shadow-lg">
            <div className="flex items-center gap-2"><Users className="h-4 w-4 text-primary" /><span className="text-xs font-semibold">Market map ready</span></div>
          </div>
        </>
      )}

      {index === 2 && (
        <>
          <div className="absolute top-4 left-4 rounded-xl bg-background text-foreground p-4 shadow-lg w-56">
            <p className="text-xs font-medium text-muted-foreground">Top Pain Points</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {["Slow onboarding", "High pricing", "Missing API", "Poor UX"].map((p) => (
                <span key={p} className="rounded-full bg-secondary px-2.5 py-1 text-[10px] font-medium">{p}</span>
              ))}
            </div>
          </div>
          <div className="absolute top-8 right-6 rounded-xl bg-primary text-primary-foreground px-5 py-2.5 shadow-lg text-sm font-semibold">142 complaints</div>
          <div className="absolute top-40 right-4 rounded-xl bg-background text-foreground p-4 shadow-lg w-52">
            <p className="text-xs font-medium text-muted-foreground">User Quote</p>
            <p className="mt-1 text-xs italic text-foreground/80">"I wish there was a simpler way to get started..."</p>
            <p className="mt-1 text-[10px] text-muted-foreground">— Reddit user</p>
          </div>
          <div className="absolute bottom-8 left-8 rounded-xl bg-background text-foreground p-4 shadow-lg">
            <div className="flex items-center gap-2"><Target className="h-4 w-4 text-primary" /><span className="text-xs font-semibold">4 unmet needs</span></div>
          </div>
        </>
      )}

      {index === 3 && (
        <>
          <div className="absolute top-4 left-4 rounded-xl bg-background text-foreground p-4 shadow-lg w-48">
            <p className="text-xs font-medium text-muted-foreground">Opportunity Score</p>
            <p className="mt-1 text-2xl font-bold text-primary">87/100</p>
            <p className="text-[10px] text-muted-foreground">High potential</p>
          </div>
          <div className="absolute top-8 right-6 rounded-xl bg-primary text-primary-foreground px-5 py-2.5 shadow-lg text-sm font-semibold">Download PDF</div>
          <div className="absolute top-36 right-4 rounded-xl bg-background text-foreground p-4 shadow-lg w-52">
            <p className="text-xs font-medium text-muted-foreground">Report Sections</p>
            <div className="mt-2 space-y-1.5">
              {["Executive Summary", "Market Analysis", "Risk Assessment", "Next Steps"].map((c) => (
                <div key={c} className="flex items-center gap-2 text-xs"><CheckCircle2 className="h-3 w-3 text-primary" /><span>{c}</span></div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-8 left-8 rounded-xl bg-background text-foreground p-4 shadow-lg">
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /><span className="text-xs font-semibold">Report ready</span></div>
          </div>
        </>
      )}
    </div>
  );
}
