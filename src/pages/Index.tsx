import { useNavigate } from "react-router-dom";
import {
  Lightbulb, Play, ArrowRight, Search, BarChart3, Target,
  TrendingUp, Users, Zap, Shield, Star, CheckCircle2,
  ChevronRight, Sparkles, Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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
      <section className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl bg-muted/50 px-8 pb-10 pt-12 lg:px-16 lg:pb-14 lg:pt-16" style={{ minHeight: 520 }}>
          <div className="grid items-center gap-8 lg:grid-cols-2">
            {/* Left — title, description, CTAs in flex-col */}
            <div className="flex flex-col gap-6">
              <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-[4.5rem]">
                Take the
                <br />
                guesswork out
              </h1>
              <p className="max-w-md text-base leading-relaxed text-muted-foreground">
                IdeaProbe is a platform for modern founders to swiftly validate
                startup ideas and find the right market opportunity
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  size="lg"
                  className="rounded-full px-8 text-sm font-medium"
                  onClick={() => navigate("/ideas")}
                >
                  Get started for free
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8 text-sm font-medium"
                  onClick={() => navigate("/ideas")}
                >
                  Book a demo
                </Button>
              </div>
            </div>

            {/* Right — hero image */}
            <div className="hidden lg:block">
              <img
                src="/hero-dashboard.jpg"
                alt="IdeaProbe dashboard preview"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
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

      {/* Value Proposition — dark panel + overlapping cards */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10 lg:pb-28">
        <div className="relative grid gap-0 lg:grid-cols-5">
          {/* Dark left panel */}
          <div className="relative z-10 rounded-2xl bg-[hsl(150,30%,20%)] p-10 lg:col-span-2 lg:rounded-r-none">
            <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Reach the right<br />market,<br />every time.
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-white/70">
              Get insights from exactly the data you need. With deep search analysis,
              competitor mapping, and AI-powered scoring, validating your idea has never been easier.
            </p>
            <div className="mt-10">
              <p className="text-xs text-white/50">Powered by:</p>
              <div className="mt-2 flex items-center gap-4">
                <span className="text-sm font-semibold text-white/80">AI Engine</span>
                <span className="text-sm font-semibold text-white/80">Market Data</span>
              </div>
            </div>
          </div>

          {/* Right — overlapping UI cards */}
          <div className="relative z-20 -ml-0 lg:-ml-6 lg:col-span-3">
            <div className="grid gap-4 p-6 sm:grid-cols-2">
              <Card className="shadow-lg">
                <CardContent className="p-5">
                  <h3 className="text-base font-semibold text-foreground">Analyze idea</h3>
                  <div className="mt-4 space-y-3">
                    <div>
                      <span className="text-xs text-muted-foreground">Keywords tracked</span>
                      <p className="text-xl font-bold text-foreground">24</p>
                      <div className="mt-1 h-1.5 w-full rounded-full bg-muted">
                        <div className="h-1.5 rounded-full bg-primary" style={{ width: "72%" }} />
                      </div>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">Market fit</span>
                      <p className="text-lg font-bold text-foreground">Strong</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">Select category</span>
                      <div className="mt-1 rounded-md border border-border px-3 py-1.5 text-sm text-foreground">SaaS</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardContent className="p-5">
                  <h3 className="text-sm font-semibold text-foreground">Competition Level</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["Low", "Medium", "High"].map((level) => (
                      <Badge key={level} variant={level === "Medium" ? "default" : "outline"} className="text-xs">
                        {level}
                      </Badge>
                    ))}
                  </div>

                  <h3 className="mt-5 text-sm font-semibold text-foreground">Target audience</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["Founders", "Product teams", "Indie hackers", "Agencies"].map((audience) => (
                      <Badge key={audience} variant="outline" className="text-xs">
                        {audience}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
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
