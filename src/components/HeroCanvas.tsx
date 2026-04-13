import { useState, useRef } from "react";
import { Sparkles, Plus, Settings, BarChart3, LayoutGrid, MoreHorizontal } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/free-mode";
// @ts-ignore
import "swiper/css/pagination";

const floatingImages = [
  { top: "8%", left: "30%", size: "w-16 h-16", rotate: "-3deg", zIndex: 10 },
  { top: "12%", left: "38%", size: "w-14 h-20", rotate: "2deg", zIndex: 11 },
  { top: "6%", right: "10%", size: "w-16 h-14", rotate: "4deg", zIndex: 10 },
  { top: "32%", left: "8%", size: "w-14 h-14", rotate: "-2deg", zIndex: 10 },
  { top: "60%", left: "25%", size: "w-12 h-16", rotate: "5deg", zIndex: 10 },
  { top: "70%", left: "42%", size: "w-10 h-10", rotate: "-4deg", zIndex: 10 },
  { top: "58%", right: "8%", size: "w-16 h-14", rotate: "2deg", zIndex: 10 },
  { top: "72%", right: "18%", size: "w-12 h-12", rotate: "-3deg", zIndex: 10 },
  { top: "68%", left: "12%", size: "w-14 h-12", rotate: "1deg", zIndex: 10 },
];

const imageColors = [
  "bg-[hsl(120,15%,55%)]",
  "bg-[hsl(35,50%,55%)]",
  "bg-[hsl(200,30%,50%)]",
  "bg-[hsl(280,15%,45%)]",
  "bg-[hsl(15,60%,45%)]",
  "bg-[hsl(160,20%,50%)]",
  "bg-[hsl(220,20%,40%)]",
  "bg-[hsl(45,40%,55%)]",
  "bg-[hsl(340,25%,50%)]",
];

const tabs = ["Market Research", "Competitor Analysis", "Opportunity Scoring", "Pain Points", "Validation Reports"];

const slideContents = [
  { label: "Market Research", icon: BarChart3, description: "Deep-dive into market size, trends, and demand signals" },
  { label: "Competitor Analysis", icon: LayoutGrid, description: "Map competitors, pricing, and feature gaps" },
  { label: "Opportunity Scoring", icon: Sparkles, description: "AI-powered scoring across 12 validation dimensions" },
  { label: "Pain Points", icon: Settings, description: "Surface real user complaints and unmet needs" },
  { label: "Validation Reports", icon: Plus, description: "Comprehensive go/no-go reports with actionable insights" },
];

export default function HeroCanvas() {
  const [activeTab, setActiveTab] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    swiperRef.current?.slideTo(index);
  };

  return (
    <div className="relative overflow-hidden rounded-xl bg-[hsl(0,0%,96%)] shadow-2xl ring-1 ring-border">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2.5">
        <div />
      </div>

      {/* Main Swiper Canvas */}
      <div className="mx-3 mb-3 overflow-hidden rounded-lg bg-background">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={0}
          slidesPerView={1}
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
          onSlideChange={(swiper) => setActiveTab(swiper.activeIndex)}
          className="hero-canvas-swiper"
          style={{ aspectRatio: "16/9" }}
        >
          {slideContents.map((slide, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative h-full w-full">
                {/* Dotted orbit ellipses */}
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 450" fill="none">
                  {[140, 180, 220, 260, 300].map((ry, i) => (
                    <ellipse
                      key={i}
                      cx="400"
                      cy="225"
                      rx={ry * 1.6}
                      ry={ry * 0.65}
                      stroke="hsl(0,0%,85%)"
                      strokeWidth="1"
                      strokeDasharray="4 6"
                      fill="none"
                    />
                  ))}
                </svg>

                {/* Center content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-6 text-center">
                  <span className="text-lg font-semibold text-foreground sm:text-xl lg:text-2xl">{slide.label}</span>
                  <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground max-w-[280px]">{slide.description}</p>
                </div>

                {/* Floating image blocks */}
                {floatingImages.map((img, i) => (
                  <div
                    key={i}
                    className={`absolute ${img.size} ${imageColors[(i + idx * 2) % imageColors.length]} rounded-md shadow-md opacity-60`}
                    style={{
                      top: img.top,
                      left: img.left,
                      right: (img as any).right,
                      transform: `rotate(${img.rotate})`,
                      zIndex: img.zIndex,
                    }}
                  />
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Bottom toolbar */}
      <div className="flex items-center justify-center gap-2 pb-3">
        {[Plus, Settings, BarChart3, LayoutGrid, MoreHorizontal].map((Icon, i) => (
          <div key={i} className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground shadow-sm">
            <Icon className="h-4 w-4" />
          </div>
        ))}
      </div>

      {/* Bottom tabs */}
      <div className="border-t border-border py-3 overflow-x-auto">
        <div className="flex items-center gap-4 px-4">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => handleTabClick(i)}
              className={`whitespace-nowrap text-[10px] sm:text-xs font-medium transition-colors shrink-0 ${
                i === activeTab
                  ? "text-foreground underline underline-offset-4 decoration-2"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
