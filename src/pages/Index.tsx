import { useNavigate } from "react-router-dom";
import {
  Lightbulb, Users, TrendingUp, Search, Zap, BarChart3,
  ArrowRight, Shield, Target, ChevronRight, Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: Search,
    title: "Market Research",
    description: "Deep-dive into market demand, search trends, and keyword analysis for your idea.",
  },
  {
    icon: Users,
    title: "Competitor Analysis",
    description: "Identify direct & indirect competitors, their strengths, pricing, and weaknesses.",
  },
  {
    icon: Target,
    title: "Pain Point Discovery",
    description: "Uncover real user frustrations, complaints, and unmet needs in the market.",
  },
  {
    icon: BarChart3,
    title: "Validation Metrics",
    description: "Get search volume, community interest, and trend data to validate demand.",
  },
  {
    icon: Shield,
    title: "Opportunity Scoring",
    description: "AI-powered scoring system rates your idea's market opportunity out of 100.",
  },
  {
    icon: Zap,
    title: "Instant Reports",
    description: "Generate comprehensive validation reports in minutes, not weeks.",
  },
];

const stats = [
  { value: "10K+", label: "Ideas Analyzed" },
  { value: "50K+", label: "Competitors Mapped" },
  { value: "85%", label: "Prediction Accuracy" },
  { value: "<2min", label: "Analysis Time" },
];

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
              <Lightbulb className="h-4.5 w-4.5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground">IdeaProbe</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              Home
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate("/ideas")}>
              Ideas
            </Button>
            <Button size="sm" className="gap-1.5" onClick={() => navigate("/ideas")}>
              Get Started
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/40 via-background to-background" />
        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-24 lg:pt-32">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-6 gap-1.5 px-3 py-1 text-sm font-medium">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              AI-Powered Idea Validation
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Validate your startup idea{" "}
              <span className="text-primary">before you build</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Stop guessing. Get instant market research, competitor analysis, and demand validation — all powered by AI. Know if your idea has potential in minutes.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="gap-2 px-8 text-base" onClick={() => navigate("/ideas")}>
                <Sparkles className="h-4 w-4" />
                Analyze Your Idea
              </Button>
              <Button variant="outline" size="lg" className="gap-2 px-8 text-base" onClick={() => navigate("/ideas")}>
                Browse Examples
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-border lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="px-6 py-8 text-center">
              <p className="text-3xl font-bold tracking-tight text-primary">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to validate
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Comprehensive analysis tools that give you clarity and confidence.
          </p>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="group border border-border bg-card transition-all hover:border-primary/30 hover:shadow-md">
              <CardContent className="p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-accent/30">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center lg:py-24">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Ready to validate your next big idea?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Join thousands of founders who use IdeaProbe to make data-driven decisions before investing time and money.
          </p>
          <Button size="lg" className="mt-8 gap-2 px-10 text-base" onClick={() => navigate("/ideas")}>
            <Sparkles className="h-4 w-4" />
            Start Free Analysis
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
              <Lightbulb className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold text-foreground">IdeaProbe</span>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 IdeaProbe. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
