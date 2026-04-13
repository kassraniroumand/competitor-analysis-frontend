import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Lightbulb, Play, ArrowRight, Search, BarChart3, Target,
  TrendingUp, Users, Zap, Shield, Star, CheckCircle2,
  ChevronRight, Sparkles, Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import showcaseScreen from "@/assets/showcase-screen.jpg";
import showcaseCompetitors from "@/assets/showcase-competitors.jpg";
import showcaseScoring from "@/assets/showcase-scoring.jpg";
import showcasePainpoints from "@/assets/showcase-painpoints.jpg";
import showcaseReports from "@/assets/showcase-reports.jpg";

const showcaseItems = [
  { label: "Market Research", image: showcaseScreen },
  { label: "Competitor Analysis", image: showcaseCompetitors },
  { label: "Opportunity Scoring", image: showcaseScoring },
  { label: "Pain Point Discovery", image: showcasePainpoints },
  { label: "Validation Reports", image: showcaseReports },
];

const features = [
  {
    icon: Search,
    title: "Deep Market Research",
    description:
      "Analyze search demand, keyword trends, and community interest to validate real market need for your idea.",
  },
  {
    icon: Users,
    title: "Competitor Intelligence",
    description:
      "Map direct and indirect competitors, compare pricing, features, strengths, and find your competitive edge.",
  },
  {
    icon: Target,
    title: "Pain Point Discovery",
    description:
      "Surface real user complaints, feature requests, and unmet needs from across the web.",
  },
  {
    icon: BarChart3,
    title: "Validation Metrics",
    description:
      "Get quantified demand signals: search volume, trend direction, community activity, and market sizing.",
  },
  {
    icon: Shield,
    title: "Opportunity Scoring",
    description:
      "AI-powered scoring rates each idea out of 100, factoring in market size, competition, and timing.",
  },
  {
    icon: Zap,
    title: "Instant Reports",
    description:
      "Generate comprehensive validation reports in under 2 minutes — what used to take weeks of manual research.",
  },
];

const testimonials = [
  {
    quote:
      "IdeaProbe saved us months of research. We validated 5 ideas in a single afternoon and knew exactly which one to pursue.",
    author: "Sarah K., Startup Founder",
  },
  {
    quote:
      "Simple, fast, and the competitor analysis alone is worth it. We found gaps nobody else was covering.",
    author: "Marcus T., Product Manager",
  },
];

export default function Index() {
  const navigate = useNavigate();
  const [activeShowcase, setActiveShowcase] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Lightbulb className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground">
              IdeaProbe
            </span>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Features
            </a>
            <a href="#testimonials" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Testimonials
            </a>
            <button
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => navigate("/ideas")}
            >
              <Play className="h-3.5 w-3.5" />
              Watch demo
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-sm font-medium"
              onClick={() => navigate("/dashboard")}
            >
              Log in
            </Button>
            <Button
              size="sm"
              className="rounded-full px-5 text-sm font-medium"
              onClick={() => navigate("/ideas")}
            >
              Get started for free
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-20 pb-16 sm:pt-28 sm:pb-20 lg:px-10 lg:pt-36 lg:pb-28">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-0">
          {/* Left — text */}
          <div className="relative z-10">
            <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]">
              Validate your<br /> startup ideas<br /> with confidence.
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
              IdeaProbe is designed for teams that need to validate startup ideas with AI-powered research at scale.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Button
                size="lg"
                className="rounded-full bg-foreground px-8 text-sm font-semibold text-background hover:bg-foreground/90"
                onClick={() => navigate("/ideas")}
              >
                Start for free
              </Button>
              <button
                onClick={() => navigate("/ideas")}
                className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
              >
                Watch video
              </button>
            </div>
          </div>

          {/* Right — dashboard screenshot, bleeding right */}
          <div className="relative lg:-mr-10 xl:-mr-20">
            <div className="overflow-hidden rounded-xl bg-muted shadow-2xl ring-1 ring-border">
              <img
                src={showcaseItems[0].image}
                alt="IdeaProbe dashboard"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Showcase */}
      <section className="px-6 py-16 sm:py-24 lg:py-32 lg:px-10">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="relative overflow-hidden rounded-2xl bg-muted shadow-xl" style={{ aspectRatio: "4/3" }}>
            <AnimatePresence initial={false}>
              <motion.img
                key={activeShowcase}
                src={showcaseItems[activeShowcase].image}
                alt={showcaseItems[activeShowcase].label}
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>
          </div>
          <div className="space-y-2 lg:space-y-3">
            {showcaseItems.map((item, i) => (
              <button
                key={item.label}
                onClick={() => setActiveShowcase(i)}
                className={`block text-left text-2xl font-bold tracking-tight transition-colors duration-200 lg:text-4xl ${
                  activeShowcase === i
                    ? "text-foreground"
                    : "text-muted-foreground/30 hover:text-muted-foreground/50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Checklist + headline section */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Validate your startup idea in minutes
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              Run comprehensive market validation using a wide variety of data sources and AI-powered analysis.
            </p>
          </div>
          <div className="space-y-3">
            {[
              "Analyze search demand & keyword trends",
              "Map competitors & pricing strategies",
              "Surface real user pain points",
              "Get AI-powered opportunity scoring",
              "Assess market size & timing",
              "Generate validation reports instantly",
              "Track competitor feature gaps",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-foreground" />
                <span className="text-sm font-medium text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature cards — 2 large */}
      <section id="features" className="mx-auto max-w-7xl px-6 pb-8 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-2">
          {features.slice(0, 2).map((feature) => (
            <div key={feature.title} className="space-y-5">
              <div className="flex h-[280px] items-center justify-center rounded-2xl bg-accent/50">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-background shadow-sm">
                  <feature.icon className="h-7 w-7 text-foreground" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature cards — 3 small */}
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-8 lg:px-10 lg:pb-28">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.slice(2).map((feature) => (
            <div key={feature.title} className="space-y-5">
              <div className="flex h-[220px] items-center justify-center rounded-2xl bg-accent/50">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-background shadow-sm">
                  <feature.icon className="h-6 w-6 text-foreground" />
                </div>
              </div>
              <h3 className="text-base font-semibold text-foreground">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Dark Showcase Section */}
      <section className="bg-[hsl(220,15%,10%)] px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <h2 className="text-4xl font-extrabold text-white lg:text-5xl">IdeaProbe</h2>
          <p className="mt-3 text-sm leading-relaxed text-white/50">
            AI-powered idea validation.<br />Crafting smarter decisions.
          </p>

          {/* Tabs */}
          <div className="mt-10 flex flex-wrap gap-2">
            {showcaseItems.map((item, i) => (
              <button
                key={item.label}
                onClick={() => setActiveShowcase(i)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                  activeShowcase === i
                    ? "bg-white text-[hsl(220,15%,10%)]"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Monitor frame with dashboard image */}
          <div className="mt-10 flex justify-center">
            <div className="w-full max-w-4xl">
              <div className="relative overflow-hidden rounded-t-xl border border-white/10 bg-white shadow-2xl" style={{ aspectRatio: "16/10" }}>
                <AnimatePresence initial={false}>
                  <motion.img
                    key={activeShowcase}
                    src={showcaseItems[activeShowcase].image}
                    alt={showcaseItems[activeShowcase].label}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>
              </div>
              {/* Monitor stand */}
              <div className="mx-auto h-5 w-24 rounded-b-lg bg-[hsl(220,10%,25%)]" />
              <div className="mx-auto h-1.5 w-36 rounded-b-md bg-[hsl(220,10%,20%)]" />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing comparison + features */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10 lg:pb-28">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              On average, teams{" "}
              <span className="text-primary">save 40+ hours</span> per idea with IdeaProbe
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              Stop spending weeks on manual research: our AI-powered validation keeps time-to-insight low while making sure you get comprehensive analysis.
            </p>
          </div>
          <div>
            <div className="space-y-0 divide-y divide-border rounded-xl border border-border">
              <div className="flex items-center justify-between px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">IdeaProbe</span>
                </div>
                <span className="text-sm font-bold text-foreground">&lt; 2 min</span>
              </div>
              <div className="flex items-center justify-between px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-muted">
                    <Search className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <span className="text-sm text-muted-foreground">Manual research</span>
                </div>
                <span className="text-sm text-muted-foreground">2–4 weeks</span>
              </div>
              <div className="flex items-center justify-between px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-muted">
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <span className="text-sm text-muted-foreground">Hiring a consultant</span>
                </div>
                <span className="text-sm text-muted-foreground">4–8 weeks</span>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Time to validate a single startup idea
            </p>
          </div>
        </div>

        {/* Bottom feature columns */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-bold text-foreground">Custom analysis</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Didn't find the market segment you were after? No worries — we let you define custom keywords, niches, and target audiences for tailored validation.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">Deep competitor mapping</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Integrate competitor data from multiple sources — pricing pages, feature lists, review sites — and get a unified competitive landscape view.
            </p>
          </div>
        </div>
      </section>


      {/* Testimonials */}
      <section
        id="testimonials"
        className="border-y border-border bg-muted/30 px-6 py-20 lg:px-10 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-primary text-primary" />
            ))}
            <span className="ml-2 text-sm font-semibold text-foreground">4.9</span>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            {testimonials.map((t) => (
              <blockquote key={t.author} className="space-y-3">
                <p className="text-lg leading-relaxed text-foreground">
                  "{t.quote}"
                </p>
                <cite className="block text-sm font-medium not-italic text-muted-foreground">
                  {t.author}
                </cite>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto max-w-7xl px-6 py-24 text-center lg:px-10 lg:py-32">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Great decisions start with{" "}
          <span className="text-primary">real data</span>
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
          Start validating your ideas and getting market insights right away
        </p>
        <Button
          size="lg"
          className="mt-8 rounded-full px-8 text-sm font-medium"
          onClick={() => navigate("/ideas")}
        >
          Get started for free
        </Button>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
          <span className="text-xs text-muted-foreground">
            © 2026 IdeaProbe
          </span>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground">
              Terms of Service
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
