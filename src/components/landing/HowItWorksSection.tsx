import { showcaseItems } from "./data";
import type { HowItWorksSectionProps } from "./HowItWorksSection.types";
import type { ShowcaseItem } from "./types";

export function HowItWorksSection({ items = showcaseItems }: HowItWorksSectionProps) {
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
        <div className="sm:hidden -mx-4">
          <ol
            className="flex gap-3 overflow-x-auto px-4 pb-4 snap-x snap-mandatory scroll-px-4 scrollbar-hide"
            aria-label="How it works"
          >
            {items.map((item, i) => (
              <StepCardMobile key={item.label} item={item} index={i} />
            ))}
          </ol>
          <div className="mt-1 flex justify-center gap-1.5 px-4">
            {items.map((_, i) => (
              <span
                key={i}
                className="h-1 w-1 rounded-full bg-muted-foreground/30"
                aria-hidden="true"
              />
            ))}
          </div>
          <p className="mt-3 text-center text-[11px] text-muted-foreground">
            Swipe to see all {items.length} steps →
          </p>
        </div>

        {/* Tablet + Desktop: grid */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-5 gap-px rounded-xl overflow-hidden border border-border bg-border">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="bg-card p-6 sm:p-7 lg:p-8 flex flex-col gap-5"
              >
                <span className="font-mono text-3xl lg:text-4xl font-light text-muted-foreground/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="w-12 h-12 rounded-lg bg-chart-2/10 border border-chart-2/20 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-chart-2" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{item.label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                <div className="mt-auto pt-4 border-t border-border">
                  <div className="text-chart-2 font-mono text-lg font-bold">{item.stat}</div>
                  <div className="text-xs text-muted-foreground">{item.statLabel}</div>
                </div>
              </div>
            );
          })}
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
