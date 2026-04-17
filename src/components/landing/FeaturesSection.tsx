import { features } from "./data";
import type { FeaturesSectionProps } from "./FeaturesSection.types";

export function FeaturesSection({ items = features }: FeaturesSectionProps) {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
        <div className="lg:sticky lg:top-28">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Built for serious business.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            IdeaProbe is designed for professional teams. Our platform brings deep market analysis, competitor intelligence, and AI-powered scoring.
          </p>
        </div>

        <div className="divide-y divide-border">
          {items.map((feature, idx) => (
            <div key={feature.title} className="group py-7 first:pt-0 last:pb-0">
              <div className="flex items-start gap-5">
                <span className="mt-0.5 text-xs font-mono font-bold text-muted-foreground/50 tabular-nums">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <feature.icon className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="text-base font-bold text-foreground">{feature.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground pl-12">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
