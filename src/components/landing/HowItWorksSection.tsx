import { showcaseItems } from "./data";
import type { HowItWorksSectionProps } from "./HowItWorksSection.types";

export function HowItWorksSection({ items = showcaseItems }: HowItWorksSectionProps) {
  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 lg:mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-chart-2 mb-3">The Process</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            From concept to clarity
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>in five sharp steps.
          </h2>
          <p className="text-muted-foreground mt-4 text-base lg:text-lg">Under two minutes. Zero guesswork.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px rounded-xl overflow-hidden border border-border bg-border">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="bg-card p-6 sm:p-7 lg:p-8 flex flex-col gap-5">
                <span className="font-mono text-3xl lg:text-4xl font-light text-muted-foreground/30">
                  {String(i + 1).padStart(2, '0')}
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
