import { useNavigate } from "react-router-dom";
import {
  Download, RotateCcw, TrendingUp, Users, AlertTriangle, Lightbulb,
  CheckCircle, ShieldAlert, Target, BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ScoreGauge } from "@/components/shared/ScoreGauge";
import { InsightCard } from "@/components/shared/InsightCard";
import { MetricCard } from "@/components/shared/MetricCard";
import { QuoteCard } from "@/components/shared/QuoteCard";
import { mockReports, mockCompetitors, painPoints, marketGaps, risks } from "@/data/mock-data";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const radarData = [
  { subject: 'Demand', score: 85 },
  { subject: 'Competition', score: 72 },
  { subject: 'Pain Point', score: 88 },
  { subject: 'Differentiation', score: 78 },
  { subject: 'Monetization', score: 80 },
];

const competitorBarData = mockCompetitors.map((c) => ({
  name: c.name.split(' ')[0],
  score: c.relevanceScore,
}));

export default function ReportPage() {
  const report = mockReports[0];

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
        {/* Report Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-foreground">Validation Report</h1>
              <StatusBadge status="completed" />
            </div>
            <p className="text-sm text-muted-foreground">{report.title} · Generated {report.createdAt}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1.5"><RotateCcw className="h-3.5 w-3.5" /> Regenerate</Button>
            <Button size="sm" className="gap-1.5"><Download className="h-3.5 w-3.5" /> Export Report</Button>
          </div>
        </div>

        {/* Executive Summary */}
        <Card className="border-primary/20">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1 space-y-4">
                <h2 className="text-lg font-bold text-foreground">Executive Summary</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {report.description} Our analysis indicates strong market potential with an opportunity score of {report.opportunityScore}/100.
                  The restaurant inventory management space is growing but underserved for independent operators. AI-powered forecasting
                  with weather and event data represents a unique differentiator that no current competitor offers.
                </p>
                <div className="flex items-center gap-3">
                  <Badge className="bg-success/10 text-success border-success/20 text-sm px-3 py-1" variant="outline">
                    <CheckCircle className="h-3.5 w-3.5 mr-1.5" /> Verdict: Build
                  </Badge>
                </div>
                <p className="text-sm text-foreground">
                  <strong>Recommendation:</strong> <span className="text-muted-foreground">Pursue with an MVP targeting independent restaurants. Focus on weather-aware AI forecasting as the primary differentiator.</span>
                </p>
              </div>
              <div className="shrink-0">
                <ScoreGauge score={report.opportunityScore} size={160} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Score Radar */}
        <InsightCard title="Score Breakdown" icon={BarChart3}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%">
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                  <Radar dataKey="score" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.2} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {radarData.map((item) => (
                <div key={item.subject} className="flex items-center justify-between text-sm">
                  <span className="text-foreground font-medium">{item.subject}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                      <div className={`h-full rounded-full ${item.score >= 75 ? 'bg-success' : item.score >= 50 ? 'bg-warning' : 'bg-destructive'}`} style={{ width: `${item.score}%` }} />
                    </div>
                    <span className="text-muted-foreground w-8 text-right">{item.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </InsightCard>

        {/* Market Validation */}
        <InsightCard title="Market Validation" icon={TrendingUp}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {[
              { label: "Demand", text: "Strong — 74% of surveyed restaurant owners want better inventory tools" },
              { label: "Search Trends", text: "\"Restaurant inventory software\" searches up 43% YoY" },
              { label: "Market Interest", text: "High — sustainability regulations driving adoption" },
              { label: "Timing", text: "Excellent — post-pandemic restaurants actively digitizing operations" },
            ].map((item) => (
              <div key={item.label} className="p-4 rounded-lg bg-muted/50 space-y-1">
                <p className="font-medium text-foreground">{item.label}</p>
                <p className="text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </InsightCard>

        {/* Competitor Summary */}
        <InsightCard title="Competitor Landscape" icon={Users}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            <MetricCard title="Total" value={mockCompetitors.length} />
            <MetricCard title="Direct" value={mockCompetitors.filter(c => c.type === 'direct').length} />
            <MetricCard title="Indirect" value={mockCompetitors.filter(c => c.type === 'indirect').length} />
            <MetricCard title="Saturation" value="Medium" />
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={competitorBarData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </InsightCard>

        {/* Pain Points */}
        <InsightCard title="Pain Points" icon={AlertTriangle}>
          <div className="space-y-3">
            {painPoints.slice(0, 3).map((pp, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <Badge variant={pp.severity === 'High' ? 'destructive' : 'secondary'} className="text-xs shrink-0 mt-0.5">{pp.severity}</Badge>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">{pp.point}</p>
                  <QuoteCard quote={pp.quote} />
                </div>
              </div>
            ))}
          </div>
        </InsightCard>

        {/* Gaps */}
        <InsightCard title="Gap Analysis" icon={Lightbulb}>
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
        <InsightCard title="Risk Analysis" icon={ShieldAlert}>
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
                <h3 className="text-lg font-bold text-foreground">Final Recommendation: Build</h3>
                <p className="text-sm text-muted-foreground">Strong opportunity with clear market gaps</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <p className="font-medium text-foreground">Best Target Niche</p>
                <p className="text-muted-foreground">Independent restaurants (1–5 locations) in urban metros</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-foreground">Unique Value Proposition</p>
                <p className="text-muted-foreground">AI inventory forecasting powered by weather + local events</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-foreground">Launch Strategy</p>
                <p className="text-muted-foreground">Start with 10 restaurants in one city, iterate on accuracy</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-foreground">Next Actions</p>
                <p className="text-muted-foreground">Build MVP, secure pilot partners, validate prediction accuracy</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
