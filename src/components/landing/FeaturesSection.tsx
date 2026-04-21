import { features } from "@/data/landing-data";
import type { FeaturesSectionProps } from "./FeaturesSection.types";

export function FeaturesSection({ items = features }: FeaturesSectionProps) {
  const [hero, ...rest] = items;
  const HeroIcon = hero.icon;

  return (
    <section
      id="features"
      className="mx-auto max-w-7xl px-4 sm:px-6 py-20 lg:px-10 lg:py-28"
    >
      {/* Header */}
      <div className="mb-12 sm:mb-14 lg:mb-16 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-chart-2 mb-3">
            Capabilities
          </p>
          <h2 className="text-[28px] leading-[1.1] sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Built for serious
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            business.
          </h2>
        </div>
        <p className="max-w-sm text-sm sm:text-base text-muted-foreground">
          Designed for professional teams. Deep market analysis, competitor
          intelligence, and AI-powered scoring — all in one place.
        </p>
      </div>

      {/* Asymmetric bento — flagship + supporting */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 auto-rows-[minmax(0,auto)]">
        {/* Flagship card: spans 2 cols × 2 rows on md+ */}
        <article className="group relative overflow-hidden rounded-3xl border border-chart-2/30 bg-gradient-to-br from-chart-2/10 via-chart-2/[0.04] to-transparent md:col-span-2 md:row-span-2 p-8 sm:p-10 lg:p-12 flex flex-col justify-between min-h-[320px] md:min-h-[480px]">
          {/* Decorative glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-chart-2/15 blur-3xl"
          />
          {/* Decorative watermark icon */}
          <HeroIcon
            aria-hidden
            strokeWidth={0.75}
            className="pointer-events-none absolute -top-6 -right-6 h-48 w-48 text-chart-2/[0.06]"
          />

          <div className="relative">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-chart-2">
              Headline Feature
            </p>
            <div className="mt-8 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-chart-2 text-white shadow-md shadow-chart-2/20">
              <HeroIcon strokeWidth={1.75} className="h-6 w-6" />
            </div>
          </div>

          <div className="relative mt-10">
            <h3 className="text-2xl sm:text-3xl lg:text-[40px] lg:leading-[1.1] font-bold tracking-tight text-foreground">
              {hero.title}
            </h3>
            <p className="mt-4 text-sm sm:text-base lg:text-lg leading-relaxed text-muted-foreground max-w-xl">
              {hero.description}
            </p>
          </div>
        </article>

        {/* Supporting cards */}
        {rest.map((feature, idx) => {
          const Icon = feature.icon;
          const number = String(idx + 2).padStart(2, "0");
          return (
            <article
              key={feature.title}
              className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card p-6 transition-all duration-300 hover:border-chart-2/50 hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-chart-2/10 border border-chart-2/20">
                  <Icon strokeWidth={1.75} className="h-4 w-4 text-chart-2" />
                </div>
                <span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground/60 tabular-nums">
                  {number}
                </span>
              </div>
              <h3 className="mt-4 text-base sm:text-lg font-bold tracking-tight text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
              <span
                aria-hidden
                className="absolute bottom-0 left-0 h-[2px] w-0 bg-chart-2 transition-[width] duration-500 group-hover:w-full"
              />
            </article>
          );
        })}
      </div>
    </section>
  );
}
