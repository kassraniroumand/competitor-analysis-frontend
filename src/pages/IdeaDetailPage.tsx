import { useNavigate, useParams } from "react-router-dom";
import {
  RotateCcw, Download, Trash2, Target, Users, Globe, Briefcase,
  TrendingUp, AlertTriangle, Lightbulb, CheckCircle, ShieldAlert, Zap,
  Calendar, Tag, FileText, Rocket, BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatDrilldownCard } from "@/components/ideas/StatDrilldownCard";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppLayout } from "@/components/layout/AppLayout";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ScoreGauge } from "@/components/shared/ScoreGauge";
import { ScoreBadge } from "@/components/shared/ScoreBadge";
import { QuoteCard } from "@/components/shared/QuoteCard";
import { mockReports, scoreBreakdown, painPoints, marketGaps, risks } from "@/data/mock-data";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList,
  BreadcrumbPage, BreadcrumbSeparator,
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

  const quickStats = [
    {
      label: "Target Audience", value: report.targetAudience || "—", icon: Target,
      summary: "Primary users who will benefit most from this product. Understanding the audience shapes messaging, features, and go-to-market strategy.",
      details: [
        { label: "Segment Size", value: "~2.4M businesses", progress: 72 },
        { label: "Willingness to Pay", value: "High (78%)", progress: 78 },
        { label: "Tech Adoption Rate", value: "Moderate (61%)", progress: 61 },
        { label: "Switching Cost", value: "Low barrier", progress: 35 },
      ],
    },
    {
      label: "Industry", value: report.industry || "—", icon: Briefcase,
      summary: "The target industry vertical and its current state of digital transformation and market readiness.",
      details: [
        { label: "Market Size (TAM)", value: "$12.8B", progress: 85 },
        { label: "Growth Rate (CAGR)", value: "14.2%", progress: 71 },
        { label: "Digital Maturity", value: "Low-Medium", progress: 40 },
        { label: "Regulatory Complexity", value: "Moderate", progress: 55 },
      ],
    },
    {
      label: "Geography", value: report.geography || "—", icon: Globe,
      summary: "Initial target markets and expansion potential across regions.",
      details: [
        { label: "Primary Market", value: "North America", progress: 90 },
        { label: "Secondary Market", value: "Western Europe", progress: 65 },
        { label: "Market Readiness", value: "High", progress: 82 },
        { label: "Localization Effort", value: "Low", progress: 25 },
      ],
    },
    {
      label: "Business Model", value: report.businessModel || "—", icon: BarChart3,
      summary: "Revenue model viability and projected unit economics for sustainable growth.",
      details: [
        { label: "Revenue Potential", value: "$4.2M ARR (Y3)", progress: 76 },
        { label: "Gross Margin", value: "~82%", progress: 82 },
        { label: "CAC Payback", value: "8 months", progress: 60 },
        { label: "LTV:CAC Ratio", value: "4.1x", progress: 80 },
      ],
    },
  ];

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/ideas" onClick={(e) => { e.preventDefault(); navigate("/ideas"); }}>Ideas</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{report.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">{report.title}</h1>
              <StatusBadge status={report.status} />
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {report.createdAt}</span>
              {report.keywords && (
                <div className="flex items-center gap-1 flex-wrap">
                  <Tag className="h-3 w-3" />
                  {report.keywords.map((kw) => (
                    <Badge key={kw} variant="secondary" className="text-[10px] px-1.5 py-0">{kw}</Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button variant="outline" size="sm" className="gap-1.5"><RotateCcw className="h-3.5 w-3.5" /> Regenerate</Button>
            <Button variant="outline" size="sm" className="gap-1.5"><Download className="h-3.5 w-3.5" /> Export</Button>
            <Button variant="outline" size="sm" className="gap-1.5 text-destructive hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /> Delete</Button>
          </div>
        </div>

        {/* Top Grid: Score + Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Score Card */}
          <Card className="lg:row-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Opportunity Score</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <ScoreGauge score={report.opportunityScore} size={140} />
              <Separator />
              <div className="w-full space-y-2.5">
                {breakdownItems.map((item) => (
                  <div key={item.label} className="flex items-center gap-2.5">
                    <item.icon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <span className="text-xs text-foreground w-24 shrink-0">{item.label}</span>
                    <div className="flex-1"><Progress value={item.score} className="h-1.5" /></div>
                    <ScoreBadge score={item.score} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stat Cards */}
          {quickStats.map((stat) => (
            <StatDrilldownCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              icon={stat.icon}
              details={stat.details}
              summary={stat.summary}
            />
          ))}

          {/* Description Card */}
          <Card className="lg:col-span-2">
            <CardContent className="p-4">
              <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider mb-1.5">Summary</p>
              <p className="text-sm text-foreground leading-relaxed">{report.description}</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="validation" className="space-y-4">
          <TabsList>
            <TabsTrigger value="validation" className="gap-1.5"><CheckCircle className="h-3.5 w-3.5" /> Validation</TabsTrigger>
            <TabsTrigger value="painpoints" className="gap-1.5"><AlertTriangle className="h-3.5 w-3.5" /> Pain Points</TabsTrigger>
            <TabsTrigger value="market" className="gap-1.5"><Lightbulb className="h-3.5 w-3.5" /> Market Gaps</TabsTrigger>
            <TabsTrigger value="risks" className="gap-1.5"><ShieldAlert className="h-3.5 w-3.5" /> Risks</TabsTrigger>
          </TabsList>

          {/* Validation Tab */}
          <TabsContent value="validation" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Demand Overview", text: "Strong latent demand identified. Growing search trends for 'restaurant inventory software' and 'food waste reduction tools'." },
                { label: "Trend Summary", text: "Sustainability and food waste reduction trending globally. Regulatory pressure increasing in the EU and US." },
                { label: "Market Interest", text: "High interest from independent restaurant owners (72% surveyed expressed need for better inventory tools)." },
                { label: "Validation Verdict", text: "Strong market signal. Clear demand with underserved segments." },
              ].map((item) => (
                <Card key={item.label}>
                  <CardContent className="p-4 space-y-1">
                    <p className="text-xs font-semibold text-foreground uppercase tracking-wider">{item.label}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-4">
                <p className="text-xs font-semibold text-primary uppercase tracking-wider">Recommendation</p>
                <p className="text-sm text-foreground mt-1 leading-relaxed">
                  Pursue this idea with a focus on independent restaurants. The AI forecasting angle combined with weather and event data provides a strong differentiator.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pain Points Tab */}
          <TabsContent value="painpoints" className="space-y-3">
            {painPoints.map((pp, i) => (
              <Card key={i}>
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium text-foreground">{pp.point}</p>
                    <div className="flex gap-1.5 shrink-0">
                      <Badge variant="secondary" className="text-xs">{pp.frequency}</Badge>
                      <Badge variant={pp.severity === 'High' ? 'destructive' : 'secondary'} className="text-xs">{pp.severity}</Badge>
                    </div>
                  </div>
                  <QuoteCard quote={pp.quote} />
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Market Gaps Tab */}
          <TabsContent value="market">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {marketGaps.map((gap, i) => (
                <Card key={i}>
                  <CardContent className="p-4 space-y-1">
                    <p className="text-sm font-semibold text-foreground">{gap.gap}</p>
                    <p className="text-sm text-muted-foreground">{gap.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Risks Tab */}
          <TabsContent value="risks" className="space-y-3">
            {risks.map((r, i) => (
              <Card key={i}>
                <CardContent className="p-4 flex items-start gap-3">
                  <Badge variant={r.level === 'High' ? 'destructive' : 'secondary'} className="text-xs shrink-0 mt-0.5">{r.level}</Badge>
                  <div>
                    <p className="text-sm font-medium text-foreground">{r.risk}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{r.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Verdict */}
        <Card className="border-2 border-success/30 bg-success/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10">
                <Rocket className="h-5 w-5 text-success" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Verdict: Build</h3>
                <p className="text-sm text-muted-foreground">This idea has strong potential</p>
              </div>
            </div>
            <p className="text-sm text-foreground leading-relaxed mb-3">
              The AI-powered restaurant inventory forecasting space shows strong demand signals with clear gaps in the market. Independent restaurants are underserved, and no current competitor leverages weather + event data for predictions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="p-3 rounded-lg bg-background/60">
                <p className="font-semibold text-foreground text-xs uppercase tracking-wider mb-1">Positioning</p>
                <p className="text-muted-foreground">"The AI inventory assistant that predicts what your restaurant needs before you do."</p>
              </div>
              <div className="p-3 rounded-lg bg-background/60">
                <p className="font-semibold text-foreground text-xs uppercase tracking-wider mb-1">Next Step</p>
                <p className="text-muted-foreground">Build an MVP targeting 10 independent restaurants in one metro area. Focus on weather-aware forecasting.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
