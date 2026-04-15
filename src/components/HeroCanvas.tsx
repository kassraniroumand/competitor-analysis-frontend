import { useState, useRef } from "react";
import { Sparkles, Settings, BarChart3, LayoutGrid, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// @ts-ignore
import "swiper/css";

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

export default function HeroCanvas() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
        <div className="h-2.5 w-2.5 rounded-full bg-destructive/40" />
        <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/40" />
        <div className="h-2.5 w-2.5 rounded-full bg-green-500/40" />
        <div className="ml-3 flex-1 rounded-md bg-secondary px-3 py-1">
          <span className="text-[10px] text-muted-foreground">ideaprobe.com/dashboard</span>
        </div>
      </div>

      {/* Slide content */}
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        speed={400}
        onSwiper={(s) => { swiperRef.current = s; }}
        onSlideChange={(s) => setActiveIndex(s.activeIndex)}
        className="hero-canvas-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.label}>
            <div className="px-5 py-6 sm:px-8 sm:py-8" style={{ minHeight: 280 }}>
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                  <slide.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">{slide.label}</h3>
                  <p className="text-xs text-muted-foreground">{slide.description}</p>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3 mt-6">
                {slide.stats.map((stat) => (
                  <div key={stat.label} className="rounded-xl bg-secondary p-3 sm:p-4 text-center">
                    <p className="text-lg sm:text-xl font-bold text-foreground">{stat.value}</p>
                    <p className="mt-0.5 text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Decorative bar chart */}
              <div className="mt-6 flex items-end gap-1.5 h-16">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm bg-primary/20"
                    style={{
                      height: `${20 + Math.sin(i * 0.8) * 40 + Math.random() * 30}%`,
                    }}
                  />
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Bottom navigation */}
      <div className="flex items-center justify-between border-t border-border px-4 py-3">
        <div className="flex items-center gap-1">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActiveIndex(i); swiperRef.current?.slideTo(i); }}
              className={`h-1.5 rounded-full transition-all ${
                i === activeIndex ? "w-5 bg-primary" : "w-1.5 bg-muted-foreground/25"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
