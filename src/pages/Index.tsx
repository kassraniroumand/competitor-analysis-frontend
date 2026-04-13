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
import HeroCanvas from "@/components/HeroCanvas";
import showcaseScreen from "@/assets/showcase-screen.jpg";
import showcaseCompetitors from "@/assets/showcase-competitors.jpg";
import showcaseScoring from "@/assets/showcase-scoring.jpg";
import showcasePainpoints from "@/assets/showcase-painpoints.jpg";
import showcaseReports from "@/assets/showcase-reports.jpg";

const showcaseItems = [
  { label: "Submit your idea", description: "Describe your startup concept in a few sentences — our AI takes it from there.", image: showcaseScreen },
  { label: "AI scans the market", description: "We analyze competitors, search trends, community signals, and pricing data in real time.", image: showcaseCompetitors },
  { label: "Discover pain points", description: "Surface real user complaints, feature requests, and unmet needs from across the web.", image: showcaseScoring },
  { label: "Get your score", description: "Receive an opportunity score out of 100, factoring in market size, competition, and timing.", image: showcasePainpoints },
  { label: "Act on insights", description: "Download a full validation report with actionable recommendations and next steps.", image: showcaseReports },
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
    quote: "IdeaProbe saved us months of research. We validated 5 ideas in a single afternoon and knew exactly which one to pursue.",
    author: "Sarah K.",
    role: "Startup Founder",
    company: "Launchpad",
  },
  {
    quote: "Simple, fast, and the competitor analysis alone is worth it. We found gaps nobody else was covering.",
    author: "Marcus T.",
    role: "Product Manager",
    company: "Browserbase",
  },
  {
    quote: "IdeaProbe turned our fragmented validation process into a single, reliable system that delivers insights in minutes.",
    author: "Elena R.",
    role: "Head of Strategy",
    company: "Origami",
  },
  {
    quote: "I wanted to actually see how the market moves, not read static reports. IdeaProbe felt like the only tool that could handle that.",
    author: "James L.",
    role: "CEO & Founder",
    company: "NovaTech",
  },
  {
    quote: "The pain point discovery feature alone justified the switch. We uncovered needs our competitors completely missed.",
    author: "Priya M.",
    role: "Growth Lead",
    company: "ScaleUp",
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
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => navigate("/pricing")}
            >
              Pricing
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
            <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]">
              Validate your<br /> startup ideas<br /> with confidence.
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              IdeaProbe is designed for teams that need to validate startup ideas with AI-powered research at scale.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Button
                size="lg"
                className="rounded-full bg-foreground px-8 text-sm font-medium text-background hover:bg-foreground/90"
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

          {/* Right — interactive canvas, bleeding right */}
          <div className="relative lg:-mr-10 xl:-mr-20">
            <HeroCanvas />
          </div>
        </div>
      </section>

      {/* Value prop banner */}
      <section className="border-y border-border bg-secondary/50">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-10">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-foreground sm:text-xl">
              AI-powered validation purpose-built for startups
            </h2>
            <p className="text-sm text-muted-foreground">
              Powering thousands of validated ideas
            </p>
          </div>
          <Separator className="mb-6 bg-border" />
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {[
              { title: "Highest accuracy", desc: "Production-ready insights built on cross-referenced data, with minimal hallucination." },
              { title: "Predictable costs", desc: "Flex compute budget based on task complexity. Pay per report, not per token." },
              { title: "Evidence-based outputs", desc: "Verifiability and provenance for every atomic output." },
              { title: "Trusted", desc: "Trusted by leading startups and enterprises for critical validation decisions." },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="text-sm font-bold text-foreground">{item.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works — flow */}
      <section className="px-6 py-16 sm:py-24 lg:py-32 lg:px-10">
        <div className="mx-auto w-full max-w-7xl overflow-hidden rounded-2xl bg-secondary p-8 lg:p-12">
          <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_1fr]">
            {/* Left — preview */}
            <div className="relative min-h-[400px] lg:min-h-[500px]">
              <div className="absolute left-0 top-0 h-[85%] w-full overflow-hidden rounded-xl shadow-lg">
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

              {/* Step indicator */}
              <div className="absolute bottom-0 left-0 flex items-center gap-2">
                {showcaseItems.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveShowcase(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      activeShowcase === i ? "w-6 bg-foreground" : "w-1.5 bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Right — numbered steps */}
            <div className="flex flex-col justify-between lg:min-h-[500px]">
              <div className="space-y-1">
                {showcaseItems.map((item, i) => (
                  <button
                    key={item.label}
                    onClick={() => setActiveShowcase(i)}
                    className={`block w-full text-left transition-all duration-200 rounded-lg px-4 py-3 ${
                      activeShowcase === i
                        ? "bg-background shadow-sm"
                        : "hover:bg-background/50"
                    }`}
                  >
                    <div className="flex items-baseline gap-3">
                      <span className={`text-xs font-bold tabular-nums ${
                        activeShowcase === i ? "text-primary" : "text-muted-foreground/40"
                      }`}>
                        0{i + 1}
                      </span>
                      <div>
                        <p className={`text-sm font-bold tracking-tight transition-colors ${
                          activeShowcase === i ? "text-foreground" : "text-muted-foreground/40"
                        }`}>
                          {item.label}
                        </p>
                        {activeShowcase === i && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mt-1 text-xs leading-relaxed text-muted-foreground"
                          >
                            {item.description}
                          </motion.p>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-8">
                <Separator className="mb-4 bg-foreground" />
                <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                  Five steps. Under two minutes. From raw idea to validated business opportunity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Features section */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        {/* Header row */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Built for serious business.
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground lg:text-right">
            IdeaProbe is designed for professional teams. Our platform brings deep market analysis, competitor intelligence, and AI-powered scoring.
          </p>
        </div>
        <Separator className="my-8 bg-border" />

        {/* Two large feature cards */}
        <div className="grid gap-px lg:grid-cols-2">
          {features.slice(0, 2).map((feature, idx) => (
            <div key={feature.title} className={`space-y-4 py-8 ${idx === 0 ? "lg:pr-10 lg:border-r lg:border-border" : "lg:pl-10"}`}>
              <div className="flex items-center gap-2.5">
                <feature.icon className="h-5 w-5 text-foreground" />
                <h3 className="text-base font-bold text-foreground">{feature.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground max-w-sm">{feature.description}</p>
              <div className="mt-4 flex h-[320px] items-center justify-center overflow-hidden rounded-xl bg-secondary">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-background shadow-sm">
                  <feature.icon className="h-7 w-7 text-foreground" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-8 bg-border" />

        {/* Bottom 4 small features */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.slice(2).map((feature) => (
            <div key={feature.title} className="space-y-2.5">
              <div className="flex items-center gap-2">
                <feature.icon className="h-4 w-4 text-foreground" />
                <h3 className="text-sm font-bold text-foreground">{feature.title}</h3>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>


      {/* Templates / Use cases showcase */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl max-w-lg">
          Hundreds of insights from real market data
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Choose from AI-powered research across competitors, pain points, and market trends. Or define your own custom analysis to generate tailored validation reports.
        </p>

        {/* Preview cards — horizontal scroll on mobile showing ~1.2 cards */}
        <div className="mt-10 -mx-6 px-6 lg:mx-0 lg:px-0">
          <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 lg:grid lg:grid-cols-2 lg:overflow-visible lg:pb-0">
            {/* Card 1 */}
            <div className="min-w-[85%] snap-start shrink-0 overflow-hidden rounded-xl bg-secondary lg:min-w-0" style={{ aspectRatio: "4/3" }}>
              <div className="flex h-full flex-col justify-between p-6 lg:p-8">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Market Analysis</p>
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-background p-4 shadow-sm">
                      <p className="text-2xl font-bold text-primary">35%</p>
                      <p className="mt-1 text-xs text-muted-foreground">faster time-to-insight</p>
                    </div>
                    <div className="rounded-lg bg-background p-4 shadow-sm">
                      <p className="text-2xl font-bold text-primary">5x</p>
                      <p className="mt-1 text-xs text-muted-foreground">more data points covered</p>
                    </div>
                    <div className="rounded-lg bg-background p-4 shadow-sm">
                      <p className="text-2xl font-bold text-primary">20%</p>
                      <p className="mt-1 text-xs text-muted-foreground">reduction in failed launches</p>
                    </div>
                    <div className="rounded-lg bg-background p-4 shadow-sm">
                      <p className="text-2xl font-bold text-primary">+12</p>
                      <p className="mt-1 text-xs text-muted-foreground">NPS uplift across teams</p>
                    </div>
                  </div>
                </div>
                <p className="mt-6 text-lg font-bold text-foreground">Real business outcomes, fast.</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="min-w-[85%] snap-start shrink-0 overflow-hidden rounded-xl bg-secondary lg:min-w-0" style={{ aspectRatio: "4/3" }}>
              <div className="flex h-full flex-col justify-between p-6 lg:p-8">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Competitor Intel</p>
                  <div className="mt-6 space-y-3">
                    {["Pricing strategy comparison", "Feature gap analysis", "Market positioning map", "Customer sentiment overview"].map((item) => (
                      <div key={item} className="flex items-center gap-3 rounded-lg bg-background px-4 py-3 shadow-sm">
                        <Check className="h-4 w-4 text-primary" />
                        <span className="text-sm text-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="mt-6 text-lg font-bold text-foreground">Deep competitive landscape.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom label + nav */}
        <div className="mt-8 flex items-end justify-between">
          <div>
            <h3 className="text-sm font-bold text-foreground">Startup teams</h3>
            <p className="mt-1 text-xs text-muted-foreground">Idea validation, market sizing, and competitor mapping.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground">
              <ChevronRight className="h-4 w-4 rotate-180" />
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>


      {/* Testimonials — horizontal scroll cards */}
      <section id="testimonials" className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex items-end justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Hear it from our users
            </h2>
            <div className="hidden items-center gap-2 sm:flex">
              <button className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground">
                <ChevronRight className="h-4 w-4 rotate-180" />
              </button>
              <button className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 px-6 lg:px-10">
          <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory">
            {testimonials.map((t) => (
              <div
                key={t.author}
                className="min-w-[300px] max-w-[320px] shrink-0 snap-start flex flex-col justify-between rounded-xl bg-secondary p-6"
                style={{ minHeight: "360px" }}
              >
                <div>
                  <p className="text-sm font-bold text-foreground">{t.company}</p>
                  <p className="mt-auto pt-16 text-sm leading-relaxed text-foreground">
                    "{t.quote}"
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">
                    {t.author.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.author}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
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
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
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
      <footer className="border-t border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr_0.8fr]">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
                  <Lightbulb className="h-3.5 w-3.5 text-primary-foreground" />
                </div>
                <span className="text-base font-bold text-foreground">IdeaProbe</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">IdeaProbe Inc.</p>
            </div>

            {/* Product */}
            <div className="space-y-4">
              {["Getting Started", "AI Validation", "Pricing", "Competitor Analysis", "IdeaProbe vs. Manual", "Solutions", "Integrations", "API", "Templates"].map((link) => (
                <a key={link} href="#" className="block text-sm text-foreground hover:text-muted-foreground transition-colors">{link}</a>
              ))}
            </div>

            {/* Company */}
            <div className="space-y-4">
              {["Join our Community", "Academy", "Become an Affiliate", "Partner Network", "Enterprise", "IdeaProbe Studio", "Privacy Policy", "Terms of Service", "Careers", "Contact Us"].map((link) => (
                <a key={link} href="#" className="block text-sm text-foreground hover:text-muted-foreground transition-colors">{link}</a>
              ))}
            </div>

            {/* Social */}
            <div className="space-y-4">
              {["Instagram", "Twitter", "LinkedIn", "YouTube"].map((link) => (
                <a key={link} href="#" className="block text-sm text-foreground hover:text-muted-foreground transition-colors">{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
