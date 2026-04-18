import { useEffect, useRef, useState } from "react";
import { showcaseItems } from "./data";
import type { HowItWorksSectionProps } from "./HowItWorksSection.types";
import type { ShowcaseItem } from "./types";
import { cn } from "@/lib/utils";

export function HowItWorksSection({ items = showcaseItems }: HowItWorksSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const active = items[activeIndex];
  const ActiveIcon = active.icon;

  useEffect(() => {
    const handleScroll = () => {
      const triggerY = window.innerHeight * 0.4;
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

  return (
    <section className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-chart-2 mb-2 sm:mb-3">
            The Process
          </p>
          <h2 className="text-[26px] leading-[1.15] sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            From concept to clarity
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>in five sharp steps.
          </h2>
          <p className="text-muted-foreground mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg">
            Under two minutes. Zero guesswork.
          </p>
        </div>

        {/* Mobile: horizontal swipe carousel */}
        <div className="lg:hidden -mx-4">
          <ol
            className="flex gap-3 overflow-x-auto px-4 pb-4 snap-x snap-mandatory scroll-px-4 scrollbar-hide"
            aria-label="How it works"
          >
            {items.map((item, i) => (
              <StepCardMobile key={item.label} item={item} index={i} />
            ))}
          </ol>
          <p className="mt-3 text-center text-[11px] text-muted-foreground">
            Swipe to see all {items.length} steps →
          </p>
        </div>

        {/* Desktop: split — sticky preview + step list */}
        <div className="hidden lg:grid grid-cols-2 gap-8">
          {/* Left: sticky preview of active step */}
          <div className="sticky top-24 self-start">
            <div className="rounded-2xl border-2 border-chart-2/40 bg-card p-8 aspect-square flex flex-col justify-between shadow-sm">
              <div>
                <span className="font-mono text-6xl font-light text-muted-foreground/20">
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>
                <div className="mt-6 w-14 h-14 rounded-lg bg-chart-2/10 border border-chart-2/20 flex items-center justify-center">
                  <ActiveIcon className="w-7 h-7 text-chart-2" />
                </div>
                <h3 className="mt-6 text-2xl font-bold text-foreground">{active.label}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {active.description}
                </p>
              </div>
              <div className="border-t border-border pt-4">
                <div className="font-mono text-2xl font-bold text-chart-2">{active.stat}</div>
                <div className="text-xs text-muted-foreground">{active.statLabel}</div>
              </div>
            </div>
          </div>

          {/* Right: scrollable step list — active step driven by scroll position */}
          <ol className="space-y-24 py-[20vh]" aria-label="How it works steps">
            {items.map((item, i) => {
              const isActive = i === activeIndex;
              return (
                <li
                  key={item.label}
                  ref={(el) => (stepRefs.current[i] = el)}
                  data-index={i}
                  className={cn(
                    "transition-opacity duration-500",
                    isActive ? "opacity-100" : "opacity-30"
                  )}
                >
                  <span className="font-mono text-xs font-bold text-chart-2">
                    STEP {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="mt-2 text-2xl font-bold text-foreground">{item.label}</h4>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="font-mono text-lg font-bold text-chart-2">{item.stat}</span>
                    <span className="text-xs text-muted-foreground">{item.statLabel}</span>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

interface StepCardMobileProps {
  item: ShowcaseItem;
  index: number;
}

function StepCardMobile({ item, index }: StepCardMobileProps) {
  const Icon = item.icon;
  return (
    <li className="snap-start shrink-0 w-[78%] max-w-[300px] rounded-xl border border-border bg-card p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="font-mono text-2xl font-light text-muted-foreground/40">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="w-9 h-9 rounded-lg bg-chart-2/10 border border-chart-2/20 flex items-center justify-center">
          <Icon className="w-4 h-4 text-chart-2" />
        </div>
      </div>
      <h3 className="text-base font-semibold text-foreground">{item.label}</h3>
      <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
      <div className="mt-auto pt-3 border-t border-border flex items-baseline justify-between gap-2">
        <span className="text-chart-2 font-mono text-sm font-bold">{item.stat}</span>
        <span className="text-[10px] text-muted-foreground text-right">{item.statLabel}</span>
      </div>
    </li>
  );
}
