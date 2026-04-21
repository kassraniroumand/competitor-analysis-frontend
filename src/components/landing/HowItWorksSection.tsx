import { useEffect, useRef, useState } from "react";
import { showcaseItems } from "@/data/landing-data";
import type { HowItWorksSectionProps } from "./HowItWorksSection.types";
import { cn } from "@/lib/utils";

export function HowItWorksSection({ items = showcaseItems }: HowItWorksSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const triggerY = window.innerHeight * 0.45;
      let bestIdx = 0;
      let bestDist = Infinity;
      stepRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - triggerY);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      });
      setActiveIndex(bestIdx);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [items.length]);

  const progressPct =
    items.length > 1 ? (activeIndex / (items.length - 1)) * 100 : 0;

  return (
    <section className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12 sm:mb-16 lg:mb-20 max-w-2xl">
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-chart-2 mb-3">
            The Process
          </p>
          <h2 className="text-[28px] leading-[1.1] sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            From concept to clarity
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            in five sharp steps.
          </h2>
          <p className="text-muted-foreground mt-4 text-sm sm:text-base lg:text-lg">
            Under two minutes. Zero guesswork.
          </p>
        </div>

        {/* Timeline */}
        <ol className="relative" aria-label="How it works steps">
          {/* Rail background */}
          <div
            className="absolute left-5 sm:left-6 top-3 bottom-3 w-px bg-border"
            aria-hidden
          />
          {/* Rail progress — occupies the same box, scales from top */}
          <div
            className="absolute left-5 sm:left-6 top-3 bottom-3 w-px bg-chart-2 origin-top transition-transform duration-500 ease-out"
            style={{ transform: `scaleY(${progressPct / 100})` }}
            aria-hidden
          />

          {items.map((item, i) => {
            const Icon = item.icon;
            const isActive = i === activeIndex;
            const isPast = i < activeIndex;
            const isReached = isActive || isPast;
            return (
              <li
                key={item.label}
                ref={(el) => (stepRefs.current[i] = el)}
                data-index={i}
                className="relative pl-14 sm:pl-20 pb-10 sm:pb-14 last:pb-0"
              >
                {/* Rail node */}
                <div
                  className={cn(
                    "absolute left-0 top-0 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border-2 bg-background transition-all duration-500",
                    isActive
                      ? "border-chart-2 ring-4 ring-chart-2/15"
                      : isPast
                        ? "border-chart-2"
                        : "border-border"
                  )}
                >
                  <span
                    className={cn(
                      "font-mono text-xs sm:text-sm font-bold tabular-nums transition-colors",
                      isReached ? "text-chart-2" : "text-muted-foreground"
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Content card — dossier panel */}
                <div
                  className={cn(
                    "group relative overflow-hidden rounded-xl border bg-card transition-all duration-500",
                    isActive
                      ? "border-chart-2/50 shadow-md -translate-y-0.5"
                      : "border-border/70 hover:border-border"
                  )}
                >
                  {/* Header strip: eyebrow + stat metadata */}
                  <div
                    className={cn(
                      "flex items-center justify-between gap-3 px-5 sm:px-6 py-3 border-b transition-colors duration-500",
                      isActive
                        ? "bg-chart-2 border-chart-2"
                        : "bg-muted/50 border-border/60"
                    )}
                  >
                    <span
                      className={cn(
                        "font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase transition-colors duration-500",
                        isActive ? "text-white" : "text-muted-foreground"
                      )}
                    >
                      Step {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span
                        className={cn(
                          "font-mono text-sm font-bold tabular-nums transition-colors duration-500",
                          isActive ? "text-white" : "text-foreground"
                        )}
                      >
                        {item.stat}
                      </span>
                      <span
                        aria-hidden
                        className={cn(
                          "h-3 w-px transition-colors duration-500",
                          isActive ? "bg-white/40" : "bg-border"
                        )}
                      />
                      <span
                        className={cn(
                          "text-[10px] sm:text-[11px] uppercase tracking-[0.15em] transition-colors duration-500",
                          isActive ? "text-white/80" : "text-muted-foreground"
                        )}
                      >
                        {item.statLabel}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="relative p-5 sm:p-7">
                    <Icon
                      strokeWidth={1.75}
                      className={cn(
                        "absolute top-5 sm:top-7 right-5 sm:right-7 w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-500",
                        isActive ? "text-chart-2" : "text-muted-foreground/45"
                      )}
                    />
                    <h3 className="pr-10 text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                      {item.label}
                    </h3>
                    <p className="mt-2.5 text-sm sm:text-[15px] text-muted-foreground leading-relaxed max-w-prose">
                      {item.description}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Outcome footer */}
        <div className="mt-10 sm:mt-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-chart-2/30 bg-chart-2/5 p-5 sm:p-6">
          <div>
            <p className="font-mono text-[11px] font-bold tracking-[0.25em] uppercase text-chart-2">
              Outcome
            </p>
            <p className="mt-1.5 text-sm sm:text-base font-semibold text-foreground">
              A validated, investor-ready report — without the guesswork.
            </p>
          </div>
          <div className="flex items-baseline gap-2 shrink-0">
            <span className="font-mono text-2xl sm:text-3xl font-bold text-chart-2 tabular-nums">
              ~2m
            </span>
            <span className="text-xs text-muted-foreground">end-to-end</span>
          </div>
        </div>
      </div>
    </section>
  );
}
