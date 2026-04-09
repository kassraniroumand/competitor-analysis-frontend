import { useNavigate } from "react-router-dom";
import {
  Lightbulb, ChevronDown, Search, BarChart3, Target,
  TrendingUp, Diamond, Triangle, ChevronsRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "hsl(var(--hero-bg))" }}>
      {/* Nav */}
      <header className="flex items-center justify-between px-8 py-5 lg:px-12">
        <div className="flex items-center gap-2.5">
          <Lightbulb className="h-6 w-6" style={{ color: "hsl(var(--hero-fg))" }} />
          <span className="text-xl font-bold tracking-tight" style={{ color: "hsl(var(--hero-fg))" }}>
            IdeaProbe
          </span>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {["Products", "Industries", "Resources"].map((item) => (
            <button
              key={item}
              className="flex items-center gap-1 text-sm font-semibold uppercase tracking-wide transition-opacity hover:opacity-70"
              style={{ color: "hsl(var(--hero-fg))" }}
            >
              {item}
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          ))}
          <button
            className="text-sm font-semibold uppercase tracking-wide transition-opacity hover:opacity-70"
            style={{ color: "hsl(var(--hero-fg))" }}
            onClick={() => navigate("/ideas")}
          >
            Ideas
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="rounded-none border-2 px-6 font-semibold uppercase tracking-wide"
            style={{
              borderColor: "hsl(var(--hero-fg))",
              color: "hsl(var(--hero-fg))",
              backgroundColor: "transparent",
            }}
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </Button>
          <Button
            className="rounded-none px-6 font-semibold uppercase tracking-wide"
            style={{
              backgroundColor: "hsl(var(--hero-fg))",
              color: "hsl(var(--hero-bg))",
            }}
            onClick={() => navigate("/ideas")}
          >
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="px-8 pb-16 pt-12 lg:px-12 lg:pb-24 lg:pt-20">
        <h1
          className="max-w-5xl text-5xl font-normal leading-[1.1] tracking-tight sm:text-6xl lg:text-[5.5rem]"
          style={{ color: "hsl(var(--hero-fg))", fontFamily: "'DM Sans', Georgia, serif" }}
        >
          Validating ideas{" "}
          <em className="font-normal italic">frictionless</em>{" "}
          <ChevronsRight className="inline-block h-10 w-10 -translate-y-1 lg:h-14 lg:w-14" />
          <br />
          Research{" "}
          <Triangle className="inline-block h-8 w-8 -translate-y-1 fill-current lg:h-12 lg:w-12" />{" "}
          for the founders
          <br />
          and builders shaping{" "}
          <Diamond className="inline-block h-8 w-8 -translate-y-0.5 fill-current lg:h-11 lg:w-11" />{" "}
          their
          <br />
          next big{" "}
          <span
            className="mx-1 inline-block h-8 w-20 rounded-sm bg-cover bg-center align-middle opacity-60 lg:h-12 lg:w-32"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=200&q=80')",
            }}
          />{" "}
          venture.
        </h1>

        <Button
          className="mt-12 rounded-none px-8 py-6 text-sm font-semibold uppercase tracking-widest lg:mt-16"
          style={{
            backgroundColor: "hsl(var(--hero-fg))",
            color: "hsl(var(--hero-bg))",
          }}
          onClick={() => navigate("/ideas")}
        >
          Start Analysis
        </Button>
      </section>

      {/* Trusted by */}
      <section
        className="border-t px-8 py-8 lg:px-12"
        style={{ borderColor: "hsl(var(--hero-fg) / 0.15)" }}
      >
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:gap-12">
          <p
            className="shrink-0 text-xs font-bold uppercase tracking-widest"
            style={{ color: "hsl(var(--hero-fg))" }}
          >
            Trusted by
            <br />
            leading teams
          </p>
          <div className="flex flex-wrap items-center gap-10 lg:gap-16">
            {[
              { icon: Search, name: "MarketScout" },
              { icon: BarChart3, name: "DataForge" },
              { icon: Target, name: "LaunchPad" },
              { icon: TrendingUp, name: "GrowthOS" },
              { icon: Lightbulb, name: "InnovateCo" },
            ].map((brand) => (
              <div
                key={brand.name}
                className="flex items-center gap-2 opacity-60 transition-opacity hover:opacity-100"
                style={{ color: "hsl(var(--hero-fg))" }}
              >
                <brand.icon className="h-5 w-5" />
                <span className="text-sm font-bold tracking-wide">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
