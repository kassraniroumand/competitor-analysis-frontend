import { useNavigate } from "react-router-dom";
import {
  Lightbulb, Play, ArrowRight, Search, BarChart3, Target,
  TrendingUp, Users, Zap, Shield, Star, CheckCircle2,
  ChevronRight, Sparkles,
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
          <div className="grid items-start gap-8 lg:grid-cols-2">
            {/* Left — headline top, description + CTAs bottom */}
            <div className="flex flex-col justify-between h-full min-h-[400px]">
              <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-[4.5rem]">
                Take the
                <br />
                guesswork out
              </h1>

              <div className="mt-auto">
                <p className="max-w-md text-base leading-relaxed text-muted-foreground">
                  IdeaProbe is a platform for modern founders to swiftly validate
                  startup ideas and find the right market opportunity
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
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
            </div>

            {/* Right — floating product cards */}
            <div className="relative hidden min-h-[400px] lg:block">
              {/* Main card */}
              <Card className="absolute right-0 top-0 w-[280px] rotate-1 shadow-xl">
                <CardContent className="p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                    <span className="text-xs font-semibold text-foreground">
                      Opportunity Score
                    </span>
                  </div>
                  <p className="text-4xl font-bold tracking-tight text-foreground">
                    87<span className="text-lg text-muted-foreground">/100</span>
                  </p>
                  <Separator className="my-4" />
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Market Demand</span>
                      <span className="font-semibold text-foreground">High</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Competition</span>
                      <span className="font-semibold text-foreground">Moderate</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Timing</span>
                      <span className="font-semibold text-foreground">Excellent</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Summary card */}
              <Card className="absolute left-4 top-24 w-[300px] -rotate-1 shadow-lg">
                <CardContent className="p-5">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">Summary</span>
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0">AI</Badge>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    Most target users (55%) actively search for a solution in this space.
                    The market shows strong growth signals with limited direct competition
                    in the mid-tier segment.
                  </p>
                </CardContent>
              </Card>

              {/* Small floating badge */}
              <Card className="absolute bottom-4 right-8 shadow-md">
                <CardContent className="flex items-center gap-2 p-3">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-xs font-medium text-foreground">
                    3 competitors tracked
                  </span>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Value prop line + logos */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <p className="max-w-3xl text-2xl font-semibold leading-snug tracking-tight text-muted-foreground sm:text-3xl">
          IdeaProbe helps founders{" "}
          <span className="text-foreground">validate faster</span>, get market
          insights{" "}
          <span className="text-foreground">in minutes</span>, and make{" "}
          <span className="text-foreground">data-driven decisions</span>
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-10 lg:gap-14">
          {[
            { icon: Search, name: "MarketScout" },
            { icon: BarChart3, name: "DataForge" },
            { icon: Target, name: "LaunchPad" },
            { icon: TrendingUp, name: "GrowthOS" },
            { icon: Lightbulb, name: "InnovateCo" },
            { icon: Zap, name: "VelocityAI" },
          ].map((brand) => (
            <div
              key={brand.name}
              className="flex items-center gap-2 text-muted-foreground/40"
            >
              <brand.icon className="h-5 w-5" />
              <span className="text-sm font-bold tracking-wide">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 pb-20 lg:px-10 lg:pb-28">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <Card
              key={feature.title}
              className="group border border-border bg-card transition-all hover:shadow-lg"
            >
              <CardContent className="p-6 lg:p-8">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
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
