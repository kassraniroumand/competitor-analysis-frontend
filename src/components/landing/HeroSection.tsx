"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Play, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import HeroCanvas from "@/components/HeroCanvas";
import type { HeroSectionProps } from "./HeroSection.types";

export function HeroSection(_: HeroSectionProps) {
  const router = useRouter();

  return (
    <section className="relative overflow-hidden px-6 pt-16 pb-12 sm:pt-24 sm:pb-16 lg:px-10 lg:pt-32 lg:pb-24">
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div className="relative z-10">
          <Badge variant="secondary" className="mb-5 rounded-full px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="mr-1.5 h-3 w-3 text-primary" />
            AI-powered idea validation
          </Badge>

          <h1 className="text-[2.25rem] font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem] xl:text-[3.5rem]">
            Validate startup ideas in minutes, not months.
          </h1>

          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
            Deep market research, competitor analysis, and opportunity scoring — all in one AI-powered platform built for founders and product teams.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" className="rounded-full bg-foreground px-8 text-sm font-medium text-background hover:bg-foreground/90" onClick={() => router.push("/ideas")}>
              Start for free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-6 text-sm font-medium" onClick={() => router.push("/ideas")}>
              <Play className="mr-2 h-3.5 w-3.5" />
              Watch demo
            </Button>
          </div>

          <div className="mt-8 flex items-center gap-3 text-muted-foreground">
            <div className="flex -space-x-2">
              {["bg-primary", "bg-chart-2", "bg-chart-3", "bg-chart-4"].map((bg, i) => (
                <div key={i} className={`h-7 w-7 rounded-full border-2 border-background ${bg} flex items-center justify-center`}>
                  <span className="text-[9px] font-bold text-white">{["S", "M", "E", "J"][i]}</span>
                </div>
              ))}
            </div>
            <div className="text-xs">
              <span className="font-semibold text-foreground">2,400+</span> ideas validated
              <span className="mx-1.5">·</span>
              <span className="inline-flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                ))}
              </span>
            </div>
          </div>
        </div>

        <div className="relative lg:-mr-6 xl:-mr-12">
          <HeroCanvas />
        </div>
      </div>
    </section>
  );
}
