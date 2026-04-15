import { useState, useRef, useEffect } from "react";
import { Sparkles, Settings, BarChart3, LayoutGrid, FileText } from "lucide-react";

const slides = [
  {
    label: "Market Research",
    icon: BarChart3,
    description: "Deep-dive into market size, trends, and demand signals.",
    stats: [
      { label: "Search Volume", value: "12.4K/mo" },
      { label: "Trend", value: "↑ 34%" },
      { label: "Community", value: "High" },
    ],
  },
  {
    label: "Competitor Analysis",
    icon: LayoutGrid,
    description: "Map competitors, pricing, and feature gaps.",
    stats: [
      { label: "Competitors", value: "18" },
      { label: "Avg Price", value: "$29/mo" },
      { label: "Gap Score", value: "7.2" },
    ],
  },
  {
    label: "Opportunity Scoring",
    icon: Sparkles,
    description: "AI-powered scoring across 12 validation dimensions.",
    stats: [
      { label: "Score", value: "82/100" },
      { label: "Dimensions", value: "12" },
      { label: "Confidence", value: "94%" },
    ],
  },
  {
    label: "Pain Points",
    icon: Settings,
    description: "Surface real user complaints and unmet needs.",
    stats: [
      { label: "Issues Found", value: "47" },
      { label: "Severity", value: "High" },
      { label: "Sources", value: "6" },
    ],
  },
  {
    label: "Validation Reports",
    icon: FileText,
    description: "Comprehensive go/no-go reports with actionable insights.",
    stats: [
      { label: "Pages", value: "12" },
      { label: "Insights", value: "34" },
      { label: "Time", value: "< 60s" },
    ],
  },
];

// Deterministic bar heights per slide so they don't re-randomize
const barHeights = slides.map((_, si) =>
  Array.from({ length: 12 }, (_, i) => 25 + Math.sin(i * 0.8 + si * 1.5) * 35 + ((i * 17 + si * 31) % 30))
);

export default function HeroCanvas() {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-advance every 4s
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const goTo = (i: number) => {
    setActiveIndex(i);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
  };

  const slide = slides[activeIndex];
  const SlideIcon = slide.icon;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
        <div className="h-2.5 w-2.5 rounded-full bg-destructive/40" />
        <div className="h-2.5 w-2.5 rounded-full bg-warning/40" />
        <div className="h-2.5 w-2.5 rounded-full bg-success/40" />
        <div className="ml-3 flex-1 rounded-md bg-secondary px-3 py-1">
          <span className="text-[10px] text-muted-foreground">ideaprobe.com/dashboard</span>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex gap-0 border-b border-border bg-secondary/50 px-2 overflow-x-auto scrollbar-hide">
        {slides.map((s, i) => {
          const Icon = s.icon;
          const isActive = i === activeIndex;
          return (
            <button
              key={s.label}
              onClick={() => goTo(i)}
              className={`flex items-center gap-1.5 whitespace-nowrap px-3 py-2 text-[11px] font-medium transition-all duration-200 border-b-2 ${
                isActive
                  ? "border-primary text-foreground bg-card"
                  : "border-transparent text-muted-foreground/60 hover:text-muted-foreground"
              }`}
            >
              <Icon className="h-3 w-3" />
              <span className="hidden sm:inline">{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* Slide content — CSS transition instead of swiper */}
      <div className="relative overflow-hidden" style={{ minHeight: 260 }}>
        {slides.map((s, i) => {
          const isActive = i === activeIndex;
          return (
            <div
              key={s.label}
              className="absolute inset-0 px-5 py-5 sm:px-7 sm:py-6 transition-all duration-500 ease-out"
              style={{
                opacity: isActive ? 1 : 0,
                transform: isActive ? "translateY(0)" : "translateY(12px)",
                pointerEvents: isActive ? "auto" : "none",
              }}
            >
              {/* Header */}
              <div className="flex items-start gap-3 mb-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-foreground leading-tight">{s.label}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{s.description}</p>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-2.5">
                {s.stats.map((stat, si) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-border bg-secondary/60 p-3 text-center transition-all duration-500"
                    style={{
                      transitionDelay: isActive ? `${si * 80}ms` : "0ms",
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "translateY(0)" : "translateY(8px)",
                    }}
                  >
                    <p className="text-lg sm:text-xl font-bold text-foreground tabular-nums">{stat.value}</p>
                    <p className="mt-0.5 text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>

            </div>
          );
        })}
      </div>

      {/* Bottom — progress dots */}
      <div className="flex items-center justify-center gap-1.5 border-t border-border px-4 py-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIndex ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/20 hover:bg-muted-foreground/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
