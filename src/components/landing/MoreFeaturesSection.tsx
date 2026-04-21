import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, TrendingUp, Users, Target, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { moreFeaturesData } from "@/data/landing-data";
import type { MoreFeaturesSectionProps } from "./MoreFeaturesSection.types";

export function MoreFeaturesSection({ items = moreFeaturesData }: MoreFeaturesSectionProps) {
  const [openIndex, setOpenIndex] = useState(0);
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      if (rect.bottom < 0 || rect.top > viewportH) return;

      const total = Math.max(1, el.offsetHeight - viewportH);
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const progress = scrolled / total;
      const idx = Math.min(items.length - 1, Math.max(0, Math.floor(progress * items.length * 0.999)));
      setOpenIndex((prev) => (prev === idx ? prev : idx));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [items.length]);

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10"
      style={{ height: `${items.length * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center py-4 sm:py-8">
        <div className="w-full overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
          <div className="grid lg:grid-cols-[1fr_1.1fr]">
            {/* Left — Title + Accordion */}
            <div className="flex flex-col justify-center p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-border">
              <p className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-chart-2 mb-3">
                More Capabilities
              </p>
              <h2 className="text-[28px] leading-[1.1] sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                Everything you need<br className="hidden sm:block" />
                <span className="sm:hidden"> </span>to move fast.
              </h2>
              <p className="mt-3 sm:mt-4 max-w-md text-sm text-muted-foreground">
                Scroll or tap to explore every capability that turns raw market signal into action.
              </p>

              <ul
                className="mt-8 sm:mt-10 divide-y divide-border border-y border-border"
                aria-label="More features"
              >
                {items.map((item, i) => {
                  const isOpen = openIndex === i;
                  return (
                    <li key={item.title} className="relative">
                      {/* Left accent rail */}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute left-0 top-0 bottom-0 w-[3px] transition-colors duration-300",
                          isOpen ? "bg-chart-2" : "bg-transparent"
                        )}
                      />
                      <button
                        aria-expanded={isOpen}
                        onClick={() => setOpenIndex(isOpen ? -1 : i)}
                        className={cn(
                          "group w-full text-left py-5 pl-6 pr-4 cursor-pointer transition-colors duration-300",
                          isOpen ? "bg-chart-2/[0.04]" : "hover:bg-muted/40"
                        )}
                      >
                        <div className="flex items-start gap-4">
                          <span
                            className={cn(
                              "font-mono text-xs font-bold tabular-nums pt-1 transition-colors",
                              isOpen ? "text-chart-2" : "text-muted-foreground/60"
                            )}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-3">
                              <h3
                                className={cn(
                                  "text-base sm:text-lg font-bold transition-colors",
                                  isOpen
                                    ? "text-foreground"
                                    : "text-muted-foreground group-hover:text-foreground"
                                )}
                              >
                                {item.title}
                              </h3>
                              <ChevronDown
                                className={cn(
                                  "h-4 w-4 shrink-0 transition-all duration-300",
                                  isOpen ? "rotate-180 text-chart-2" : "text-muted-foreground/50 group-hover:text-foreground"
                                )}
                              />
                            </div>

                            {isMobile ? (
                              isOpen && (
                                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                  {item.description}
                                </p>
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
                                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                      {item.description}
                                    </p>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            )}
                          </div>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Right — Dynamic preview */}
            <div className="relative overflow-hidden min-h-[340px] lg:min-h-[560px] bg-muted/40">
              {/* subtle grid background */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,hsl(210_8%_50%/0.12)_1px,transparent_1px),linear-gradient(to_bottom,hsl(210_8%_50%/0.12)_1px,transparent_1px)] [background-size:32px_32px]"
              />
              {/* soft radial glow */}
              <div
                aria-hidden
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-chart-2/10 blur-3xl"
              />

              {isMobile ? (
                <div key={openIndex} className="absolute inset-0 p-6">
                  <CollageContent index={openIndex} />
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={openIndex}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute inset-0 p-8"
                  >
                    <CollageContent index={openIndex} />
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface CollageContentProps {
  index: number;
}

const tile = "rounded-xl border border-border bg-card text-foreground shadow-sm";
const chip = "rounded-full bg-chart-2 text-white text-sm font-semibold px-4 py-2 shadow-sm";

function CollageContent({ index }: CollageContentProps) {
  return (
    <div className="relative h-full w-full">
      {index === 0 && (
        <>
          <div className={cn(tile, "absolute top-4 left-4 p-4 w-48")}>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Search Volume
            </p>
            <p className="mt-1 font-mono text-2xl font-bold text-chart-2 tabular-nums">12.4K</p>
            <p className="text-[10px] text-muted-foreground">monthly searches</p>
          </div>
          <div className={cn(chip, "absolute top-8 right-6")}>Trending ↑</div>
          <div className={cn(tile, "absolute top-36 right-4 p-4 w-52")}>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Community Signals
            </p>
            <div className="mt-2 space-y-1.5">
              {["Reddit — 340 mentions", "HN — 89 posts", "Twitter — 1.2K tweets"].map((c) => (
                <div key={c} className="flex items-center gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-chart-2" />
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={cn(tile, "absolute bottom-8 left-8 p-3")}>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-chart-2" />
              <span className="text-xs font-semibold">+27% growth YoY</span>
            </div>
          </div>
        </>
      )}

      {index === 1 && (
        <>
          <div className={cn(tile, "absolute top-4 left-4 p-4 w-52")}>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Competitors found
            </p>
            <div className="mt-2 space-y-1.5">
              {["Acme Corp — $49/mo", "RivalX — $29/mo", "BetaTool — Free"].map((c) => (
                <div key={c} className="flex items-center gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-chart-2" />
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={cn(chip, "absolute top-8 right-6")}>3 gaps found</div>
          <div className={cn(tile, "absolute bottom-32 right-8 p-4 w-48")}>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Feature Gap
            </p>
            <p className="mt-1 text-sm font-bold text-chart-2">API access</p>
            <p className="text-[10px] text-muted-foreground">No competitor offers this</p>
          </div>
          <div className={cn(tile, "absolute bottom-8 left-8 p-3")}>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-chart-2" />
              <span className="text-xs font-semibold">Market map ready</span>
            </div>
          </div>
        </>
      )}

      {index === 2 && (
        <>
          <div className={cn(tile, "absolute top-4 left-4 p-4 w-56")}>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Top Pain Points
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {["Slow onboarding", "High pricing", "Missing API", "Poor UX"].map((p) => (
                <span
                  key={p}
                  className="rounded-full border border-border bg-muted/60 px-2.5 py-1 text-[10px] font-medium text-foreground"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
          <div className={cn(chip, "absolute top-8 right-6")}>142 complaints</div>
          <div className={cn(tile, "absolute top-40 right-4 p-4 w-52")}>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              User Quote
            </p>
            <p className="mt-1 text-xs italic text-foreground/80">
              "I wish there was a simpler way to get started..."
            </p>
            <p className="mt-1 text-[10px] text-muted-foreground">— Reddit user</p>
          </div>
          <div className={cn(tile, "absolute bottom-8 left-8 p-3")}>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-chart-2" />
              <span className="text-xs font-semibold">4 unmet needs</span>
            </div>
          </div>
        </>
      )}

      {index === 3 && (
        <>
          <div className={cn(tile, "absolute top-4 left-4 p-4 w-48")}>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Opportunity Score
            </p>
            <p className="mt-1 font-mono text-2xl font-bold text-chart-2 tabular-nums">87/100</p>
            <p className="text-[10px] text-muted-foreground">High potential</p>
          </div>
          <div className={cn(chip, "absolute top-8 right-6")}>Download PDF</div>
          <div className={cn(tile, "absolute top-36 right-4 p-4 w-52")}>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Report Sections
            </p>
            <div className="mt-2 space-y-1.5">
              {["Executive Summary", "Market Analysis", "Risk Assessment", "Next Steps"].map((c) => (
                <div key={c} className="flex items-center gap-2 text-xs">
                  <CheckCircle2 className="h-3 w-3 text-chart-2" />
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={cn(tile, "absolute bottom-8 left-8 p-3")}>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-chart-2" />
              <span className="text-xs font-semibold">Report ready</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
