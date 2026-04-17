import { Separator } from "@/components/ui/separator";
import { valuePropItems } from "./data";
import type { ValuePropBannerProps } from "./ValuePropBanner.types";

export function ValuePropBanner({
  items = valuePropItems,
  heading = "AI-powered validation purpose-built for startups",
  subheading = "Powering thousands of validated ideas",
}: ValuePropBannerProps) {
  return (
    <section className="border-y border-border bg-secondary">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-10">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-foreground sm:text-xl">{heading}</h2>
          <p className="text-sm text-muted-foreground">{subheading}</p>
        </div>
        <Separator className="mb-6 bg-border" />
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.title}>
              <h3 className="text-sm font-bold text-foreground">{item.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
