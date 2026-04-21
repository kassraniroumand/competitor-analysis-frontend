"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Activity,
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Compass,
  Flame,
  Lightbulb,
  Newspaper,
  Sparkles,
  Target,
  Users,
  Zap,
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockReports, mockCompetitors } from "@/data/mock-data";
import { discoveredIdeas, SOURCE_META } from "@/data/discover-data";
import { mockNews } from "@/data/news-data";

const monoFont = {
  fontFamily: '"JetBrains Mono", "SF Mono", ui-monospace, monospace',
};

export default function Page() {
  const router = useRouter();

  const completed = useMemo(
    () => mockReports.filter((r) => r.status === "completed"),
    []
  );
  const processing = useMemo(
    () => mockReports.filter((r) => r.status === "processing"),
    []
  );
  const failed = useMemo(
    () => mockReports.filter((r) => r.status === "failed"),
    []
  );

  const topIdeas = useMemo(
    () => [...completed].sort((a, b) => b.opportunityScore - a.opportunityScore),
    [completed]
  );
  const topIdea = topIdeas[0];
  const avgScore = completed.length
    ? Math.round(
        completed.reduce((s, r) => s + r.opportunityScore, 0) / completed.length
      )
    : 0;

  const topSignals = useMemo(
    () =>
      [...discoveredIdeas]
        .sort((a, b) => b.trendingScore - a.trendingScore)
        .slice(0, 3),
    []
  );
  const latestNews = useMemo(
    () =>
      [...mockNews]
        .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
        .slice(0, 3),
    []
  );

  const actions = useMemo(() => {
    const validated = topIdeas
      .filter((r) => r.opportunityScore >= 70)
      .map((r) => ({
        icon: CheckCircle2,
        tint: "text-primary",
        bg: "bg-primary/10",
        title: r.title,
        detail: `Validated · score ${r.opportunityScore}/100`,
        cta: "Draft PRD",
        to: `/dashboard/ideas/${r.id}`,
      }));
    const inProgress = processing.map((r) => ({
      icon: Clock,
      tint: "text-warning",
      bg: "bg-warning/10",
      title: r.title,
      detail: "Analysis in progress",
      cta: "Check status",
      to: `/dashboard/ideas/${r.id}`,
    }));
    const failures = failed.map((r) => ({
      icon: AlertCircle,
      tint: "text-destructive",
      bg: "bg-destructive/10",
      title: r.title,
      detail: "Analysis failed — retry or refine",
      cta: "Retry",
      to: `/dashboard/ideas/${r.id}`,
    }));
    return [...validated, ...inProgress, ...failures].slice(0, 5);
  }, [topIdeas, processing, failed]);

  const topIdeaCompetitors = topIdea
    ? mockCompetitors.filter((c) => c.ideaId === topIdea.id).length
    : 0;

  return (
    <AppLayout>
      <div className="p-4 lg:p-8 max-w-6xl mx-auto space-y-6">
        <PageHeader
          title="Dashboard"
          subtitle="Your idea validation command center"
        >
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => router.push("/dashboard/discover")}
          >
            <Compass className="h-4 w-4" />
            Discover
          </Button>
          <Button className="gap-2" onClick={() => router.push("/dashboard/ideas")}>
            <Sparkles className="h-4 w-4" />
            New Analysis
          </Button>
        </PageHeader>

        {topIdea && (
          <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/5 via-card to-card p-5 lg:p-6">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-3.5 w-3.5 text-primary" />
              <span
                className="text-[10px] uppercase tracking-[0.22em] font-semibold text-primary"
                style={monoFont}
              >
                Focus today
              </span>
            </div>
            <div className="flex items-start gap-4 lg:gap-6">
              <div className="flex-1 min-w-0 space-y-2">
                <h2 className="text-xl lg:text-2xl font-bold leading-tight tracking-tight">
                  {topIdea.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {topIdea.description}
                </p>
                <div
                  className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-2 text-xs text-muted-foreground"
                  style={monoFont}
                >
                  <span className="flex items-center gap-1.5">
                    <Target className="h-3.5 w-3.5 text-primary" />
                    Score {topIdea.opportunityScore}/100
                  </span>
                  <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                  <span className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5" />
                    {topIdeaCompetitors} competitors mapped
                  </span>
                  <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                  <span>{topIdea.category}</span>
                </div>
              </div>
              <div className="hidden sm:flex flex-col items-center justify-center rounded-2xl bg-primary/10 px-5 py-4 shrink-0">
                <span
                  className="text-3xl lg:text-4xl font-bold text-primary tabular-nums leading-none"
                  style={monoFont}
                >
                  {topIdea.opportunityScore}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-primary/70 mt-1.5">
                  / 100
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 pt-4 mt-5 border-t border-border">
              <Button
                onClick={() => router.push(`/dashboard/ideas/${topIdea.id}`)}
                className="gap-1.5"
              >
                Open validation
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push(`/dashboard/ideas/${topIdea.id}`)}
                className="gap-1.5"
              >
                Draft PRD
              </Button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <MetricTile
            label="Total ideas"
            value={mockReports.length}
            sub={`${completed.length} validated`}
          />
          <MetricTile
            label="Avg opportunity"
            value={avgScore}
            sub={`Top: ${topIdeas[0]?.opportunityScore ?? 0}/100`}
            tint="primary"
          />
          <MetricTile
            label="In review"
            value={processing.length}
            sub="Processing now"
            tint="warning"
          />
          <MetricTile
            label="Live signals"
            value={discoveredIdeas.length}
            sub="Across 6 sources"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          <Card className="lg:col-span-2">
            <CardContent className="p-5 lg:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold text-base">Action queue</h3>
                </div>
                <span
                  className="text-[10px] uppercase tracking-wider font-medium text-muted-foreground"
                  style={monoFont}
                >
                  {actions.length} {actions.length === 1 ? "item" : "items"}
                </span>
              </div>
              {actions.length > 0 ? (
                <div className="space-y-2">
                  {actions.map((a, i) => (
                    <button
                      key={i}
                      onClick={() => router.push(a.to)}
                      className="group w-full flex items-center gap-3 rounded-lg border p-3 text-left hover:bg-accent/40 transition-colors"
                    >
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-lg ${a.bg} shrink-0`}
                      >
                        <a.icon className={`h-4 w-4 ${a.tint}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {a.title}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {a.detail}
                        </p>
                      </div>
                      <span className="hidden sm:flex text-xs text-muted-foreground shrink-0 items-center gap-1 group-hover:text-foreground transition-colors">
                        {a.cta}
                        <ArrowUpRight className="h-3 w-3" />
                      </span>
                      <ArrowUpRight className="sm:hidden h-4 w-4 text-muted-foreground shrink-0" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center space-y-2">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                  <p className="text-sm font-medium">You&apos;re all caught up</p>
                  <p className="text-xs text-muted-foreground">
                    No pending validations or analyses.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5 lg:p-6">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-base">Pipeline</h3>
              </div>
              <div className="space-y-4">
                <PipelineRow
                  label="Validated"
                  count={completed.length}
                  total={mockReports.length}
                  color="bg-primary"
                />
                <PipelineRow
                  label="Processing"
                  count={processing.length}
                  total={mockReports.length}
                  color="bg-warning"
                />
                <PipelineRow
                  label="Failed"
                  count={failed.length}
                  total={mockReports.length}
                  color="bg-destructive"
                />
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="w-full mt-5 text-xs gap-1"
                onClick={() => router.push("/dashboard/ideas")}
              >
                View all ideas
                <ArrowUpRight className="h-3 w-3" />
              </Button>
            </CardContent>
          </Card>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-primary" />
              <h3 className="font-semibold text-base">Trending signals</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs gap-1"
              onClick={() => router.push("/dashboard/discover")}
            >
              View all
              <ArrowUpRight className="h-3 w-3" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {topSignals.map((s) => {
              const meta = SOURCE_META[s.source];
              return (
                <div
                  key={s.id}
                  className="rounded-xl border bg-card p-4 flex flex-col gap-2 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className={`font-bold ${meta.color}`}
                      style={monoFont}
                    >
                      {meta.badge}
                    </span>
                    <span
                      className="text-muted-foreground truncate"
                      style={monoFont}
                    >
                      {s.sourceHandle}
                    </span>
                    <span className="ml-auto flex items-center gap-1 text-primary shrink-0">
                      <Flame className="h-3 w-3" />
                      <span
                        className="tabular-nums text-[11px]"
                        style={monoFont}
                      >
                        {s.trendingScore}
                      </span>
                    </span>
                  </div>
                  <h4 className="text-sm font-bold leading-snug line-clamp-2">
                    {s.title}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {s.summary}
                  </p>
                  <div className="flex items-center justify-between pt-2 mt-auto">
                    <span
                      className="text-[10px] text-muted-foreground"
                      style={monoFont}
                    >
                      {s.postedAt}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-[11px] gap-1"
                      onClick={() => router.push(`/dashboard/ideas?from=${s.id}`)}
                    >
                      Analyze
                      <ArrowUpRight className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Newspaper className="h-4 w-4 text-primary" />
              <h3 className="font-semibold text-base">News brief</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs gap-1"
              onClick={() => router.push("/dashboard/news")}
            >
              View all
              <ArrowUpRight className="h-3 w-3" />
            </Button>
          </div>
          <div className="rounded-2xl border bg-card divide-y divide-border overflow-hidden">
            {latestNews.map((n) => (
              <Link
                key={n.id}
                href={n.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 sm:gap-4 p-4 hover:bg-accent/40 transition-colors group"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-xl shrink-0">
                  {n.imageEmoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium line-clamp-1 group-hover:text-primary transition-colors">
                    {n.title}
                  </p>
                  <div
                    className="flex items-center gap-1.5 mt-0.5 text-[11px] text-muted-foreground"
                    style={monoFont}
                  >
                    <span className="truncate">{n.source}</span>
                    <span>·</span>
                    <span className="shrink-0">{n.publishedAt}</span>
                    <span className="hidden sm:inline">·</span>
                    <span className="hidden sm:inline shrink-0">
                      {n.readTimeMin} min
                    </span>
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className="text-[10px] shrink-0 hidden sm:inline-flex"
                >
                  {n.category}
                </Badge>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground shrink-0 group-hover:text-foreground transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function MetricTile({
  label,
  value,
  sub,
  tint,
}: {
  label: string;
  value: number | string;
  sub: string;
  tint?: "primary" | "warning";
}) {
  const valueColor =
    tint === "primary"
      ? "text-primary"
      : tint === "warning"
      ? "text-warning"
      : "text-foreground";
  return (
    <div className="rounded-xl border bg-card p-4">
      <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-muted-foreground">
        {label}
      </p>
      <p
        className={`mt-2 text-3xl font-bold tabular-nums leading-none ${valueColor}`}
        style={monoFont}
      >
        {value}
      </p>
      <p className="mt-2 text-[11px] text-muted-foreground">{sub}</p>
    </div>
  );
}

function PipelineRow({
  label,
  count,
  total,
  color,
}: {
  label: string;
  count: number;
  total: number;
  color: string;
}) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold tabular-nums text-foreground" style={monoFont}>
          {count}
          <span className="text-muted-foreground font-normal">/{total}</span>
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
        <div
          className={`h-full rounded-full ${color} transition-all`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
