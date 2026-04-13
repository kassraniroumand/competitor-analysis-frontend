import { useState, useRef } from "react";
import { Sparkles, Plus, Settings, BarChart3, LayoutGrid, MoreHorizontal } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";

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
        <div className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground shadow-sm">
          <LayoutGrid className="h-3.5 w-3.5" />
          Dashboard
        </div>
        <div className="flex items-center gap-1">
          <div className="flex -space-x-1.5">
            {[
              "bg-blue-600",
              "bg-amber-500",
              "bg-emerald-500",
              "bg-purple-500",
            ].map((c, i) => (
              <div key={i} className={`h-6 w-6 rounded-full ${c} ring-2 ring-[hsl(0,0%,96%)]`} />
            ))}
          </div>
          <span className="ml-2 text-xs text-muted-foreground">Share</span>
        </div>
      </div>

      {/* Canvas area */}
      <div className="relative mx-3 mb-3 overflow-hidden rounded-lg bg-background" style={{ aspectRatio: "16/9" }}>
        {/* Dotted orbit ellipses */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 450" fill="none">
          {[140, 180, 220, 260, 300].map((ry, i) => (
            <ellipse
              key={i}
              cx="400"
              cy="225"
              rx={ry * 1.6}
              ry={ry * 0.65}
              stroke="hsl(0,0%,75%)"
              strokeWidth="1"
              strokeDasharray="4 6"
              fill="none"
            />
          ))}
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold text-foreground sm:text-xl lg:text-2xl">AI validation</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
              <Sparkles className="h-4 w-4 text-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground sm:text-xl lg:text-2xl">for serious ideas</span>
          </div>
        </div>

        {/* Floating image blocks */}
        {floatingImages.map((img, i) => (
          <div
            key={i}
            className={`absolute ${img.size} ${imageColors[i]} rounded-md shadow-md`}
            style={{
              top: img.top,
              left: img.left,
              right: (img as any).right,
              transform: `rotate(${img.rotate})`,
              zIndex: img.zIndex,
            }}
          />
        ))}

        {/* User cursors */}
        <div className="absolute top-[28%] left-[28%] z-30 flex items-start gap-0.5">
          <svg width="12" height="16" viewBox="0 0 12 16" fill="hsl(0,0%,50%)">
            <path d="M1 1L11 8L5.5 8.5L3 15L1 1Z" />
          </svg>
          <span className="rounded-full bg-[hsl(0,0%,60%)] px-2 py-0.5 text-[10px] font-medium text-white">User A</span>
        </div>
        <div className="absolute top-[55%] left-[52%] z-30 flex items-start gap-0.5">
          <svg width="12" height="16" viewBox="0 0 12 16" fill="hsl(0,0%,50%)">
            <path d="M1 1L11 8L5.5 8.5L3 15L1 1Z" />
          </svg>
          <span className="rounded-full bg-[hsl(0,0%,60%)] px-2 py-0.5 text-[10px] font-medium text-white">User B</span>
        </div>
      </div>

      {/* Bottom toolbar */}
      <div className="flex items-center justify-center gap-2 pb-3">
        {[Plus, Settings, BarChart3, LayoutGrid, MoreHorizontal].map((Icon, i) => (
          <div key={i} className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground shadow-sm">
            <Icon className="h-4 w-4" />
          </div>
        ))}
      </div>

      {/* Bottom tabs - Swiper */}
      <div className="border-t border-border py-3">
        <Swiper
          modules={[FreeMode]}
          freeMode
          slidesPerView="auto"
          spaceBetween={16}
          slidesOffsetBefore={16}
          slidesOffsetAfter={16}
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
          onSlideChange={(swiper) => setActiveTab(swiper.activeIndex)}
        >
          {tabs.map((tab, i) => (
            <SwiperSlide key={tab} style={{ width: "auto" }}>
              <button
                onClick={() => handleTabClick(i)}
                className={`whitespace-nowrap text-[10px] sm:text-xs font-medium transition-colors shrink-0 ${
                  i === activeTab
                    ? "text-foreground underline underline-offset-4 decoration-2"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
