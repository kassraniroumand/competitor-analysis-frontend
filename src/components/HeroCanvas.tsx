import { useState, useRef, useEffect, useCallback } from "react";
import { Sparkles, Settings, BarChart3, LayoutGrid, FileText, Search, Bell } from "lucide-react";

const AUTO_INTERVAL = 4500;

const slides = [
  {
    label: "Market Research",
    icon: BarChart3,
    accent: "bg-chart-2/10 text-chart-2",
    accentDot: "bg-chart-2",
    description: "Deep-dive into market size, trends, and demand signals.",
    stats: [
      { label: "Search Volume", value: "12.4K", unit: "/mo" },
      { label: "Trend", value: "↑ 34", unit: "%" },
      { label: "Community", value: "High", unit: "" },
    ],
  },
  {
    label: "Competitors",
    icon: LayoutGrid,
    accent: "bg-chart-3/10 text-chart-3",
    accentDot: "bg-chart-3",
    description: "Map competitors, pricing, and feature gaps.",
    stats: [
      { label: "Competitors", value: "18", unit: "" },
      { label: "Avg Price", value: "$29", unit: "/mo" },
      { label: "Gap Score", value: "7.2", unit: "" },
    ],
  },
  {
    label: "Scoring",
    icon: Sparkles,
    accent: "bg-primary/10 text-primary",
    accentDot: "bg-primary",
    description: "AI-powered scoring across 12 validation dimensions.",
    stats: [
      { label: "Score", value: "82", unit: "/100" },
      { label: "Dimensions", value: "12", unit: "" },
      { label: "Confidence", value: "94", unit: "%" },
    ],
  },
  {
    label: "Pain Points",
    icon: Settings,
    accent: "bg-chart-5/10 text-chart-5",
    accentDot: "bg-chart-5",
    description: "Surface real user complaints and unmet needs.",
    stats: [
      { label: "Issues", value: "47", unit: "" },
      { label: "Severity", value: "High", unit: "" },
      { label: "Sources", value: "6", unit: "" },
    ],
  },
  {
    label: "Reports",
    icon: FileText,
    accent: "bg-chart-4/10 text-chart-4",
    accentDot: "bg-chart-4",
    description: "Go/no-go reports with actionable insights.",
    stats: [
      { label: "Pages", value: "12", unit: "" },
      { label: "Insights", value: "34", unit: "" },
      { label: "Time", value: "< 60", unit: "s" },
    ],
  },
];

export default function HeroCanvas() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimers = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
  }, []);

  const startTimers = useCallback(() => {
    clearTimers();
    setProgress(0);
    const step = 50;
    progressRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + (step / AUTO_INTERVAL) * 100, 100));
    }, step);
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
      setProgress(0);
    }, AUTO_INTERVAL);
  }, [clearTimers]);

  useEffect(() => {
    startTimers();
    return clearTimers;
  }, [startTimers, clearTimers]);

  const goTo = (i: number) => {
    setActiveIndex(i);
    startTimers();
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-[0_8px_40px_-12px_hsl(var(--foreground)/0.12)]">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5 bg-secondary/30">
        <div className="h-2 w-2 rounded-full bg-destructive/50" />
        <div className="h-2 w-2 rounded-full bg-warning/50" />
        <div className="h-2 w-2 rounded-full bg-success/50" />
        <div className="ml-3 flex items-center gap-2 flex-1 rounded-lg bg-background border border-border px-3 py-1">
          <Search className="h-2.5 w-2.5 text-muted-foreground/40" />
          <span className="text-[10px] text-muted-foreground/60 font-medium">ideaprobe.com/dashboard</span>
        </div>
        <Bell className="ml-2 h-3 w-3 text-muted-foreground/30" />
      </div>

      {/* Tab bar */}
      <div className="flex gap-0 border-b border-border bg-card px-1 overflow-x-auto scrollbar-hide">
        {slides.map((s, i) => {
          const Icon = s.icon;
          const isActive = i === activeIndex;
          return (
            <button
              key={s.label}
              onClick={() => goTo(i)}
              className={`relative flex items-center gap-1.5 whitespace-nowrap px-3 py-2.5 text-[11px] font-medium transition-colors duration-200 ${
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground/50 hover:text-muted-foreground"
              }`}
            >
              <Icon className="h-3 w-3" />
              <span className="hidden sm:inline">{s.label}</span>
              {/* Active indicator line */}
              {isActive && (
                <span className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </div>

      {/* Slide content */}
      <div className="relative overflow-hidden" style={{ minHeight: 220 }}>
        {slides.map((s, i) => {
          const isActive = i === activeIndex;
          return (
            <div
              key={s.label}
              className="absolute inset-0 px-5 py-5 sm:px-6 sm:py-5 transition-all duration-500 ease-out"
              style={{
                opacity: isActive ? 1 : 0,
                transform: isActive ? "translateY(0) scale(1)" : "translateY(8px) scale(0.98)",
                pointerEvents: isActive ? "auto" : "none",
              }}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${s.accent}`}>
                  <s.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[13px] font-bold text-foreground leading-tight">{s.label}</h3>
                  <p className="mt-0.5 text-[11px] text-muted-foreground leading-snug">{s.description}</p>
                </div>
                <div className={`h-2 w-2 rounded-full ${s.accentDot} animate-pulse`} />
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-2">
                {s.stats.map((stat, si) => (
                  <div
                    key={stat.label}
                    className="group rounded-xl bg-secondary/50 border border-border/50 p-3 text-center transition-all duration-500 hover:bg-secondary hover:border-border"
                    style={{
                      transitionDelay: isActive ? `${si * 60 + 100}ms` : "0ms",
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "translateY(0)" : "translateY(6px)",
                    }}
                  >
                    <p className="text-base sm:text-lg font-bold text-foreground tabular-nums leading-none">
                      {stat.value}
                      {stat.unit && <span className="text-[10px] font-medium text-muted-foreground ml-0.5">{stat.unit}</span>}
                    </p>
                    <p className="mt-1.5 text-[9px] text-muted-foreground uppercase tracking-wider font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom — info + progress */}
      <div className="border-t border-border px-4 py-3 space-y-2.5">
        <div className="flex items-center justify-between text-[10px]">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 font-semibold text-primary">
              Step {activeIndex + 1}/{slides.length}
            </span>
            <span className="text-muted-foreground font-medium">
              {slides[activeIndex].label}
            </span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
              Live analysis
            </span>
            <span>⚡ &lt; 60s</span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="relative h-1.5 overflow-hidden rounded-full transition-all duration-300"
              style={{
                width: i === activeIndex ? 28 : 6,
                backgroundColor: i === activeIndex ? "transparent" : "hsl(var(--muted-foreground) / 0.15)",
              }}
            >
              {i === activeIndex && (
                <>
                  <span className="absolute inset-0 rounded-full bg-primary/20" />
                  <span
                    className="absolute inset-y-0 left-0 rounded-full bg-primary transition-[width] duration-100 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                </>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
