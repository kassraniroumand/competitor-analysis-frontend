"use client";

import { useRouter } from "next/navigation";
import {
  Lightbulb, Users, AlertTriangle, Sparkles,
  ArrowRight, Clock, Trophy, BarChart3, FileText, Target, Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { ScoreBadge } from "@/components/shared/ScoreBadge";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { MetricCardSkeleton } from "@/components/skeletons/MetricCardSkeleton";
import { InsightCardSkeleton } from "@/components/skeletons/InsightCardSkeleton";
import { useLoadingState } from "@/hooks/use-loading";
import { mockReports, mockCompetitors } from "@/data/mock-data";

export default function Page() {
  const router = useRouter();
  const isLoading = useLoadingState();

  const completedReports = mockReports.filter((r) => r.status === "completed");
  const processingReports = mockReports.filter((r) => r.status === "processing");
  const topIdeas = completedReports
    .sort((a, b) => b.opportunityScore - a.opportunityScore)
    .slice(0, 3);
  const recentReports = [...mockReports]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 4);
  const totalCompetitors = mockCompetitors.length;
  const avgScore =
    completedReports.length > 0
      ? Math.round(
          completedReports.reduce((s, r) => s + r.opportunityScore, 0) /
            completedReports.length
        )
      : 0;

  const alerts = [
    {
      type: "processing" as const,
      message: `${processingReports.length} idea${processingReports.length !== 1 ? "s" : ""} currently being analyzed`,
      show: processingReports.length > 0,
    },
    {
      type: "insight" as const,
      message: `"${topIdeas[0]?.title}" scored ${topIdeas[0]?.opportunityScore}/100 — highest opportunity`,
      show: topIdeas.length > 0,
    },
    {
      type: "competitor" as const,
      message: `${totalCompetitors} competitors tracked across ${completedReports.length} ideas`,
      show: true,
    },
  ].filter((a) => a.show);

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
        <PageHeader
          title="Dashboard"
          subtitle="Overview of your idea validation pipeline"
        >
          <Button className="gap-2" onClick={() => router.push("/ideas")}>
            <Sparkles className="h-4 w-4" />
            New Analysis
          </Button>
        </PageHeader>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => <MetricCardSkeleton key={i} />)
          ) : (
            [
              { label: "Total Ideas", value: mockReports.length, sub: `${completedReports.length} completed`, icon: Lightbulb, color: "bg-foreground text-background", iconBg: "bg-background/15" },
              { label: "Avg. Score", value: `${avgScore}/100`, sub: "Across completed ideas", icon: Target, color: "bg-primary text-primary-foreground", iconBg: "bg-primary-foreground/20" },
              { label: "Competitors", value: totalCompetitors, sub: `Across ${new Set(mockCompetitors.map((c) => c.ideaId)).size} ideas`, icon: Users, color: "bg-secondary text-foreground", iconBg: "bg-background" },
              { label: "Processing", value: processingReports.length, sub: "Currently analyzing", icon: Loader2, color: "bg-accent text-accent-foreground", iconBg: "bg-background" },
            ].map((stat) => (
              <div key={stat.label} className={`rounded-2xl p-4 ${stat.color}`}>
                <div className="flex items-center justify-between">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${stat.iconBg}`}>
                    <stat.icon className="h-4 w-4" />
                  </div>
                  <span className="text-2xl font-bold tabular-nums">{stat.value}</span>
                </div>
                <p className="mt-3 text-xs font-medium opacity-70 uppercase tracking-wider">{stat.label}</p>
                <p className="mt-0.5 text-[10px] opacity-50">{stat.sub}</p>
              </div>
            ))
          )}
        </div>

        {isLoading ? (
          <InsightCardSkeleton lines={3} />
        ) : alerts.length > 0 ? (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-primary" />
                Alerts & Updates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {alerts.map((alert, i) => (
                <Alert key={i} variant="default" className="bg-accent/50 border-accent">
                  <div className="flex items-center gap-3">
                    {alert.type === "processing" && <Clock className="h-4 w-4 text-warning shrink-0" />}
                    {alert.type === "insight" && <Trophy className="h-4 w-4 text-primary shrink-0" />}
                    {alert.type === "competitor" && <Users className="h-4 w-4 text-muted-foreground shrink-0" />}
                    <AlertDescription className="text-foreground">{alert.message}</AlertDescription>
                  </div>
                </Alert>
              ))}
            </CardContent>
          </Card>
        ) : null}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <InsightCardSkeleton lines={6} />
          ) : (
            <Card className="lg:col-span-2">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-primary" />
                    Top Scoring Ideas
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="text-xs" onClick={() => router.push("/ideas")}>
                    View all <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {topIdeas.map((idea, idx) => (
                  <div
                    key={idea.id}
                    className="flex items-center gap-4 rounded-lg border p-4 cursor-pointer hover:bg-accent/40 transition-colors"
                    onClick={() => router.push(`/ideas/${idea.id}`)}
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-foreground truncate">{idea.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs font-normal">{idea.category}</Badge>
                        <span className="text-xs text-muted-foreground">{idea.createdAt}</span>
                      </div>
                    </div>
                    <ScoreBadge score={idea.opportunityScore} />
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {isLoading ? (
            <InsightCardSkeleton lines={3} />
          ) : (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-primary" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { label: "Analyze New Idea", icon: Sparkles, to: "/ideas" },
                  { label: "Browse All Ideas", icon: Lightbulb, to: "/ideas" },
                  { label: "View Reports", icon: FileText, to: "/reports/1" },
                ].map((action) => (
                  <Button
                    key={action.label}
                    variant="ghost"
                    className="w-full justify-start gap-3 text-sm font-medium text-muted-foreground"
                    onClick={() => router.push(action.to)}
                  >
                    <action.icon className="h-4 w-4 shrink-0" />
                    {action.label}
                    <ArrowRight className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100" />
                  </Button>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {isLoading ? (
          <InsightCardSkeleton lines={5} />
        ) : (
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  Recent Reports
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-xs" onClick={() => router.push("/ideas")}>
                  View all <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {recentReports.map((report) => (
                  <div
                    key={report.id}
                    className="rounded-lg border p-4 cursor-pointer hover:bg-accent/40 transition-colors space-y-2"
                    onClick={() => router.push(`/ideas/${report.id}`)}
                  >
                    <div className="flex items-center justify-between">
                      <StatusBadge status={report.status} />
                      {report.status === "completed" && <ScoreBadge score={report.opportunityScore} size="sm" />}
                    </div>
                    <p className="text-sm font-medium text-foreground line-clamp-2 leading-snug">{report.title}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs font-normal">{report.category}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{report.createdAt}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {isLoading ? (
          <InsightCardSkeleton lines={4} />
        ) : (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Opportunity Score Distribution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {completedReports.map((r) => (
                <div key={r.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground font-medium truncate max-w-[70%]">{r.title}</span>
                    <span className="text-muted-foreground text-xs">{r.opportunityScore}/100</span>
                  </div>
                  <Progress value={r.opportunityScore} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
