import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft, RotateCcw, Download, Trash2, Target, Users, Globe, Briefcase,
  TrendingUp, AlertTriangle, Lightbulb, CheckCircle, XCircle, Info, Tag, MessageSquareQuote, ShieldAlert, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ScoreGauge } from "@/components/shared/ScoreGauge";
import { ScoreBadge } from "@/components/shared/ScoreBadge";
import { InsightCard } from "@/components/shared/InsightCard";
import { QuoteCard } from "@/components/shared/QuoteCard";
import { mockReports, scoreBreakdown, painPoints, marketGaps, risks } from "@/data/mock-data";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function IdeaDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const report = mockReports.find((r) => r.id === id) || mockReports[0];

  const breakdownItems = [
    { label: "Demand", score: scoreBreakdown.demand, icon: TrendingUp },
    { label: "Competition", score: scoreBreakdown.competition, icon: Users },
    { label: "Pain Point", score: scoreBreakdown.painPoint, icon: AlertTriangle },
    { label: "Differentiation", score: scoreBreakdown.differentiation, icon: Zap },
    { label: "Monetization", score: scoreBreakdown.monetization, icon: Briefcase },
  ];

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }}>Ideas</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{report.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Hero */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-start gap-6">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl font-bold text-foreground">{report.title}</h1>
                  <StatusBadge status={report.status} />
                </div>
                <p className="text-sm text-muted-foreground">{report.description}</p>
                <p className="text-sm text-foreground leading-relaxed">
                  <strong>Rewritten:</strong> A SaaS platform leveraging machine learning to predict restaurant inventory demand using historical sales, weather data, and local event calendars — enabling owners to reduce waste by up to 40% and save thousands monthly.
                </p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>Created {report.createdAt}</span>
                  <span>·</span>
                  <span>Updated {report.updatedAt}</span>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <RotateCcw className="h-3.5 w-3.5" /> Regenerate
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Download className="h-3.5 w-3.5" /> Export
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5 text-destructive hover:text-destructive">
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Basic Info */}
        <InsightCard title="Basic Information" icon={Info}>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            {[
              { label: "Target Audience", value: report.targetAudience, icon: Target },
              { label: "Problem Solved", value: "Manual inventory counting, food waste, over-ordering" },
              { label: "Industry", value: report.industry, icon: Briefcase },
              { label: "Business Model", value: report.businessModel },
              { label: "Geography", value: report.geography, icon: Globe },
              { label: "Keywords", value: report.keywords?.join(", "), icon: Tag },
            ].map((item) => (
              <div key={item.label} className="space-y-1">
                <p className="text-xs text-muted-foreground font-medium">{item.label}</p>
                <p className="text-foreground font-medium">{item.value || "—"}</p>
              </div>
            ))}
          </div>
        </InsightCard>

        {/* Opportunity Score */}
        <InsightCard title="Opportunity Score" icon={TrendingUp}>
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <ScoreGauge score={report.opportunityScore} size={160} />
            <div className="flex-1 w-full space-y-3">
              {breakdownItems.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <item.icon className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-sm text-foreground w-28 shrink-0">{item.label}</span>
                  <div className="flex-1">
                    <Progress value={item.score} className="h-2" />
                  </div>
                  <ScoreBadge score={item.score} />
                </div>
              ))}
            </div>
          </div>
        </InsightCard>

        {/* Validation Summary */}
        <InsightCard title="Validation Summary" icon={CheckCircle}>
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Demand Overview", text: "Strong latent demand identified. Growing search trends for 'restaurant inventory software' and 'food waste reduction tools'." },
                { label: "Trend Summary", text: "Sustainability and food waste reduction trending globally. Regulatory pressure increasing in the EU and US." },
                { label: "Market Interest", text: "High interest from independent restaurant owners (72% surveyed expressed need for better inventory tools)." },
                { label: "Validation Verdict", text: "Strong market signal. Clear demand with underserved segments." },
              ].map((item) => (
                <div key={item.label} className="space-y-1">
                  <p className="font-medium text-foreground">{item.label}</p>
                  <p className="text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>
            <Separator />
            <div className="p-3 rounded-lg bg-accent/50">
              <p className="font-medium text-accent-foreground">Recommendation</p>
              <p className="text-sm text-muted-foreground mt-1">
                Pursue this idea with a focus on independent restaurants. The AI forecasting angle combined with weather and event data provides a strong differentiator.
              </p>
            </div>
          </div>
        </InsightCard>

        {/* Pain Points */}
        <InsightCard title="Pain Points Analysis" icon={AlertTriangle}>
          <div className="space-y-4">
            {painPoints.map((pp, i) => (
              <div key={i} className="space-y-2 pb-4 border-b border-border last:border-0 last:pb-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-foreground">{pp.point}</p>
                  <div className="flex gap-1.5 shrink-0">
                    <Badge variant="secondary" className="text-xs">{pp.frequency}</Badge>
                    <Badge variant={pp.severity === 'High' ? 'destructive' : 'secondary'} className="text-xs">{pp.severity}</Badge>
                  </div>
                </div>
                <QuoteCard quote={pp.quote} />
              </div>
            ))}
          </div>
        </InsightCard>

        {/* Market Gaps */}
        <InsightCard title="Market Gaps" icon={Lightbulb}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {marketGaps.map((gap, i) => (
              <div key={i} className="p-4 rounded-lg bg-accent/30 space-y-1">
                <p className="text-sm font-semibold text-foreground">{gap.gap}</p>
                <p className="text-sm text-muted-foreground">{gap.description}</p>
              </div>
            ))}
          </div>
        </InsightCard>

        {/* Risks */}
        <InsightCard title="Risk Assessment" icon={ShieldAlert}>
          <div className="space-y-3">
            {risks.map((r, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <Badge variant={r.level === 'High' ? 'destructive' : 'secondary'} className="text-xs shrink-0 mt-0.5">{r.level}</Badge>
                <div>
                  <p className="text-sm font-medium text-foreground">{r.risk}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{r.description}</p>
                </div>
              </div>
            ))}
          </div>
        </InsightCard>

        {/* Final Recommendation */}
        <Card className="border-2 border-success/30 bg-success/5">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Verdict: Build</h3>
                <p className="text-sm text-muted-foreground">This idea has strong potential</p>
              </div>
            </div>
            <p className="text-sm text-foreground leading-relaxed">
              The AI-powered restaurant inventory forecasting space shows strong demand signals with clear gaps in the market. Independent restaurants are underserved, and no current competitor leverages weather + event data for predictions. This positions the idea well for differentiation.
            </p>
            <div className="space-y-2 text-sm">
              <p><strong className="text-foreground">Positioning:</strong> <span className="text-muted-foreground">"The AI inventory assistant that predicts what your restaurant needs before you do — powered by weather, events, and your sales history."</span></p>
              <p><strong className="text-foreground">Next Step:</strong> <span className="text-muted-foreground">Build an MVP targeting 10 independent restaurants in one metro area. Focus on the weather-aware forecasting feature as the primary differentiator.</span></p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
