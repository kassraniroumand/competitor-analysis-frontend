import { Check, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import type { UseCasesShowcaseProps } from "./UseCasesShowcase.types";

export function UseCasesShowcase(_: UseCasesShowcaseProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-0 lg:py-0">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl max-w-lg">
            Hundreds of insights from real market data
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Choose from AI-powered research across competitors, pain points, and market trends. Or define your own custom analysis to generate tailored validation reports.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button className="usecases-prev flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground">
            <ChevronRight className="h-4 w-4 rotate-180" />
          </button>
          <button className="usecases-next flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-10 -mx-6 px-6 lg:mx-0 lg:px-0">
        <Swiper
          modules={[FreeMode, Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1.25}
          freeMode={{ enabled: true, momentum: true, momentumRatio: 0.8 }}
          grabCursor={true}
          touchReleaseOnEdges={true}
          navigation={{ prevEl: ".usecases-prev", nextEl: ".usecases-next" }}
          pagination={{ clickable: true }}
          breakpoints={{ 1024: { slidesPerView: 2, freeMode: false } }}
          className="use-cases-swiper !pb-12 [&_.swiper-wrapper]:items-stretch"
        >
          <SwiperSlide className="!h-auto">
            <Card className="h-full flex flex-col overflow-hidden">
              <CardHeader className="pb-2">
                <CardDescription className="text-xs font-medium uppercase tracking-wider">Market Analysis</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-secondary p-4">
                    <p className="text-2xl font-bold text-primary">35%</p>
                    <p className="mt-1 text-xs text-muted-foreground">faster time-to-insight</p>
                  </div>
                  <div className="rounded-lg bg-secondary p-4">
                    <p className="text-2xl font-bold text-primary">5x</p>
                    <p className="mt-1 text-xs text-muted-foreground">more data points covered</p>
                  </div>
                  <div className="rounded-lg bg-secondary p-4">
                    <p className="text-2xl font-bold text-primary">20%</p>
                    <p className="mt-1 text-xs text-muted-foreground">reduction in failed launches</p>
                  </div>
                  <div className="rounded-lg bg-secondary p-4">
                    <p className="text-2xl font-bold text-primary">+12</p>
                    <p className="mt-1 text-xs text-muted-foreground">NPS uplift across teams</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-lg font-bold text-foreground">Real business outcomes, fast.</p>
              </CardFooter>
            </Card>
          </SwiperSlide>

          <SwiperSlide className="!h-auto">
            <Card className="h-full flex flex-col overflow-hidden">
              <CardHeader className="pb-2">
                <CardDescription className="text-xs font-medium uppercase tracking-wider">Competitor Intel</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-3">
                  {["Pricing strategy comparison", "Feature gap analysis", "Market positioning map", "Customer sentiment overview"].map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-lg bg-secondary px-4 py-3">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-lg font-bold text-foreground">Deep competitive landscape.</p>
              </CardFooter>
            </Card>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}
