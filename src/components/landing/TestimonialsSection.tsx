import { ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import { testimonials } from "./data";
import type { TestimonialsSectionProps } from "./TestimonialsSection.types";

export function TestimonialsSection({ items = testimonials }: TestimonialsSectionProps) {
  return (
    <section id="testimonials" className="py-20 lg:py-28 max-w-7xl mx-auto">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Hear it from our users</h2>
          <div className="hidden items-center gap-2 sm:flex">
            <button className="testimonials-prev flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground">
              <ChevronRight className="h-4 w-4 rotate-180" />
            </button>
            <button className="testimonials-next flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10 px-6 lg:px-10">
        <Swiper
          modules={[FreeMode, Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView="auto"
          freeMode={{ enabled: true, momentum: true, momentumRatio: 0.8 }}
          grabCursor={true}
          touchReleaseOnEdges={true}
          navigation={{ prevEl: ".testimonials-prev", nextEl: ".testimonials-next" }}
          pagination={{ clickable: true }}
          className="testimonials-swiper"
        >
          {items.map((t) => (
            <SwiperSlide key={t.author} style={{ width: "320px" }}>
              <div className="flex flex-col justify-between rounded-xl bg-secondary p-6 h-full" style={{ minHeight: "360px" }}>
                <div>
                  <p className="text-sm font-bold text-foreground">{t.company}</p>
                  <p className="mt-auto pt-16 text-sm leading-relaxed text-foreground">"{t.quote}"</p>
                </div>
                <div className="mt-8 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">
                    {t.author.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.author}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
