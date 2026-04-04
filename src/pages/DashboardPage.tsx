import { useNavigate } from "react-router-dom";
import {
  Lightbulb,
  Users,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Clock,
  Trophy,
  BarChart3,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { MetricCard } from "@/components/shared/MetricCard";
import { ScoreBadge } from "@/components/shared/ScoreBadge";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { mockReports, mockCompetitors } from "@/data/mock-data";

export default function DashboardPage() {
  const navigate = useNavigate();

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
          <Button className="gap-2" onClick={() => navigate("/ideas")}>
            <Sparkles className="h-4 w-4" />
            New Analysis
          </Button>
        </PageHeader>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total Ideas"
            value={mockReports.length}
            subtitle={`${completedReports.length} completed`}
            icon={Lightbulb}
          />
          <MetricCard
            title="Avg. Score"
            value={`${avgScore}/100`}
            subtitle="Across completed ideas"
            icon={TrendingUp}
          />
          <MetricCard
            title="Competitors"
            value={totalCompetitors}
            subtitle={`Across ${new Set(mockCompetitors.map((c) => c.ideaId)).size} ideas`}
            icon={Users}
          />
          <MetricCard
            title="Processing"
            value={processingReports.length}
            subtitle="Currently analyzing"
            icon={Clock}
          />
        </div>

        {/* Alerts */}
        {alerts.length > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-primary" />
                Alerts & Updates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {alerts.map((alert, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-lg bg-accent/50 px-4 py-2.5 text-sm"
                >
                  {alert.type === "processing" && (
                    <Clock className="h-4 w-4 text-amber-500 shrink-0" />
                  )}
                  {alert.type === "insight" && (
                    <Trophy className="h-4 w-4 text-primary shrink-0" />
                  )}
                  {alert.type === "competitor" && (
                    <Users className="h-4 w-4 text-muted-foreground shrink-0" />
                  )}
                  <span className="text-foreground">{alert.message}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Scoring Ideas */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-primary" />
                  Top Scoring Ideas
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs"
                  onClick={() => navigate("/ideas")}
                >
                  View all <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {topIdeas.map((idea, idx) => (
                <div
                  key={idea.id}
                  className="flex items-center gap-4 rounded-lg border p-4 cursor-pointer hover:bg-accent/40 transition-colors"
                  onClick={() => navigate(`/ideas/${idea.id}`)}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
                    {idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-foreground truncate">
                      {idea.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs font-normal">
                        {idea.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {idea.createdAt}
                      </span>
                    </div>
                  </div>
                  <ScoreBadge score={idea.opportunityScore} />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
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
                { label: "View Competitors", icon: Users, to: "/competitors" },
                { label: "Validation Data", icon: TrendingUp, to: "/validation" },
                { label: "Pain Points", icon: AlertTriangle, to: "/pain-points" },
                { label: "View Reports", icon: FileText, to: "/reports/1" },
              ].map((action) => (
                <button
                  key={action.label}
                  onClick={() => navigate(action.to)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <action.icon className="h-4 w-4 shrink-0" />
                  {action.label}
                  <ArrowRight className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100" />
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Reports */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                Recent Reports
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs"
                onClick={() => navigate("/ideas")}
              >
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
                  onClick={() => navigate(`/ideas/${report.id}`)}
                >
                  <div className="flex items-center justify-between">
                    <StatusBadge status={report.status} />
                    {report.status === "completed" && (
                      <ScoreBadge score={report.opportunityScore} size="sm" />
                    )}
                  </div>
                  <p className="text-sm font-medium text-foreground line-clamp-2 leading-snug">
                    {report.title}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs font-normal">
                      {report.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{report.createdAt}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Score Distribution */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Opportunity Score Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {completedReports.map((r) => (
              <div key={r.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground font-medium truncate max-w-[70%]">
                    {r.title}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {r.opportunityScore}/100
                  </span>
                </div>
                <Progress value={r.opportunityScore} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
