import { useNavigate, useParams } from "react-router-dom";
import {
  Download, Pencil, Users, Briefcase,
  TrendingUp, AlertTriangle, Zap, DollarSign, Lightbulb,
  CheckCircle, Target, BarChart3, Globe, ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { AppLayout } from "@/components/layout/AppLayout";
import { ScoreGauge } from "@/components/shared/ScoreGauge";
import { mockReports, scoreBreakdown } from "@/data/mock-data";

export default function IdeaDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const report = mockReports.find((r) => r.id === id) || mockReports[0];

  const breakdownItems = [
    { label: "Demand", score: scoreBreakdown.demand, icon: TrendingUp },
    { label: "Pain Severity", score: scoreBreakdown.painPoint, icon: AlertTriangle },
    { label: "Monetization", score: scoreBreakdown.monetization, icon: DollarSign },
    { label: "Differentiation", score: scoreBreakdown.differentiation, icon: Zap },
    { label: "Competition", score: scoreBreakdown.competition, icon: Users },
  ];

  return (
    <AppLayout>
      <div className="p-6 lg:p-10 max-w-5xl mx-auto space-y-6">

        {/* Back Button */}
        <Button variant="ghost" size="sm" className="gap-1.5 -ml-2 text-muted-foreground" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
          Back to Ideas
        </Button>

        {/* Header */}
        <header className="space-y-3">
          <div className="flex items-center gap-2 text-xs">
            <Badge variant="outline" className="font-medium uppercase tracking-wider">
              {report.status === "completed" ? "Completed" : report.status === "analyzing" ? "Analyzing" : "Queued"}
            </Badge>
            <Badge variant="outline" className="font-medium uppercase tracking-wider">{report.category}</Badge>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground leading-tight">
            {report.title}
          </h1>
          <p className="text-sm text-muted-foreground">{report.description}</p>

          <div className="flex gap-2 flex-wrap pt-1">
            <Button variant="outline" size="sm" className="gap-1.5" onClick={() => navigate(`/ideas/${id}/competitors`)}><Users className="h-3.5 w-3.5" /> Competitors</Button>
            <Button variant="outline" size="sm" className="gap-1.5" onClick={() => navigate("/pain-points")}><AlertTriangle className="h-3.5 w-3.5" /> Pain Points</Button>
            <Button variant="outline" size="sm" className="gap-1.5" onClick={() => navigate("/validation")}><CheckCircle className="h-3.5 w-3.5" /> Validation</Button>
            <Button variant="outline" size="sm" className="gap-1.5" onClick={() => navigate(`/reports/${id}`)}><BarChart3 className="h-3.5 w-3.5" /> Report</Button>
          </div>
        </header>

        <Separator />

        {/* Key Info Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Audience", value: report.targetAudience, icon: Target },
            { label: "Industry", value: report.industry, icon: Briefcase },
            { label: "Geography", value: report.geography, icon: Globe },
            { label: "Model", value: report.businessModel, icon: Lightbulb },
          ].map((item) => (
            <div key={item.label} className="space-y-0.5">
              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-widest flex items-center gap-1">
                <item.icon className="h-3 w-3" /> {item.label}
              </p>
              <p className="text-sm font-medium text-foreground">{item.value || "—"}</p>
            </div>
          ))}
        </div>

        {/* Opportunity Score */}
        {report.status === "completed" && (
          <Card>
            <CardContent className="p-5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                <div className="flex items-center gap-4">
                  <ScoreGauge score={report.opportunityScore} size={80} />
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold text-foreground">{report.opportunityScore}</span>
                      <span className="text-sm text-muted-foreground">/100</span>
                    </div>
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                      {report.opportunityScore >= 75 ? "High Potential" : report.opportunityScore >= 50 ? "Moderate" : "Needs Work"}
                    </p>
                  </div>
                </div>

                <Separator orientation="vertical" className="hidden sm:block h-20" />
                <Separator className="sm:hidden" />

                <div className="flex-1 space-y-2">
                  {breakdownItems.map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <item.icon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      <span className="text-xs text-muted-foreground w-24 shrink-0">{item.label}</span>
                      <div className="flex-1"><Progress value={item.score} className="h-1.5" /></div>
                      <span className="text-xs font-medium text-foreground w-8 text-right">{item.score}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Keywords */}
        {report.keywords && report.keywords.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {report.keywords.map((kw) => (
              <Badge key={kw} variant="secondary" className="text-xs font-normal">
                {kw}
              </Badge>
            ))}
          </div>
        )}

      </div>
    </AppLayout>
  );
}
