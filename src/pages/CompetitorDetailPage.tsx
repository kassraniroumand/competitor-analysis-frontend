import { useNavigate, useParams } from "react-router-dom";
import { ExternalLink, Globe, Users as UsersIcon, DollarSign, Star, ThumbsUp, ThumbsDown, MessageSquareQuote, Target, Zap, ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AppLayout } from "@/components/layout/AppLayout";
import { InsightCard } from "@/components/shared/InsightCard";
import { ScoreBadge } from "@/components/shared/ScoreBadge";
import { QuoteCard } from "@/components/shared/QuoteCard";
import { mockCompetitors } from "@/data/mock-data";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function CompetitorDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const comp = mockCompetitors.find((c) => c.id === id) || mockCompetitors[0];

  const comparisonRows = [
    { aspect: "Target Audience", competitor: comp.targetAudience, idea: "Independent restaurant owners & small chains" },
    { aspect: "Pricing", competitor: comp.pricingSummary, idea: "$49–$149/mo (affordable tier)" },
    { aspect: "Key Features", competitor: comp.features.join(", "), idea: "AI forecasting, weather data, event calendar, waste tracking" },
    { aspect: "Positioning", competitor: "Established player, enterprise focus", idea: "AI-first, SMB-friendly, weather-aware" },
    { aspect: "Weaknesses", competitor: comp.weaknesses.join(", "), idea: "New entrant, no brand recognition yet" },
    { aspect: "Market Gap", competitor: "High pricing, limited AI", idea: "Affordable AI with unique data sources" },
  ];

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/competitors" onClick={(e) => { e.preventDefault(); navigate("/competitors"); }}>Competitors</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>{comp.name}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Hero */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-muted text-3xl shrink-0">{comp.logo}</div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl font-bold text-foreground">{comp.name}</h1>
                  <Badge variant={comp.type === 'direct' ? 'default' : 'secondary'} className="text-xs uppercase">{comp.type}</Badge>
                  <ScoreBadge score={comp.relevanceScore} showLabel />
                </div>
                <p className="text-sm text-muted-foreground">{comp.description}</p>
                <p className="text-xs text-muted-foreground">{comp.website}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button size="sm" className="gap-1.5"><ExternalLink className="h-3.5 w-3.5" /> Visit Website</Button>
                <Button size="sm" variant="outline" className="gap-1.5"><ArrowRightLeft className="h-3.5 w-3.5" /> Compare</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Overview */}
        <InsightCard title="Overview" icon={Globe}>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            {[
              { label: "Target Users", value: comp.targetAudience },
              { label: "Market Category", value: comp.marketSegment },
              { label: "Geography", value: "North America" },
              { label: "Pricing Model", value: comp.pricingModel },
              { label: "Pricing Range", value: comp.pricingSummary },
              { label: "Founded", value: "2020" },
            ].map((item) => (
              <div key={item.label} className="space-y-1">
                <p className="text-xs text-muted-foreground font-medium">{item.label}</p>
                <p className="text-foreground font-medium">{item.value}</p>
              </div>
            ))}
          </div>
        </InsightCard>

        {/* Features */}
        <InsightCard title="Features & Strengths" icon={Star}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">Core Features</p>
              <div className="flex flex-wrap gap-1.5">
                {comp.features.map((f) => <Badge key={f} variant="outline" className="text-xs">{f}</Badge>)}
              </div>
              <p className="text-sm font-medium text-foreground mt-4">Standout Features</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Real-time dashboard with live inventory metrics</li>
                <li>• Automated supplier reordering workflows</li>
              </ul>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium text-success">Strengths</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                {comp.strengths.map((s) => <li key={s}>• {s}</li>)}
              </ul>
            </div>
          </div>
        </InsightCard>

        {/* Weaknesses */}
        <InsightCard title="Weaknesses & Complaints" icon={ThumbsDown}>
          <div className="space-y-4">
            <ul className="text-sm text-muted-foreground space-y-1.5">
              {comp.weaknesses.map((w) => <li key={w}>• {w}</li>)}
              <li>• Users report slow customer support response times</li>
              <li>• Limited mobile experience for on-the-go managers</li>
            </ul>
            <Separator />
            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">User Complaints</p>
              <QuoteCard quote={`"${comp.name} is powerful but way too expensive for a single-location restaurant."`} />
              <QuoteCard quote={`"The onboarding took us weeks. We almost gave up."`} />
            </div>
          </div>
        </InsightCard>

        {/* Sentiment */}
        <InsightCard title="User Sentiment" icon={MessageSquareQuote}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-center">
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-2xl font-bold text-foreground">3.8</p>
              <p className="text-xs text-muted-foreground">Overall Rating</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-2xl font-bold text-success">72%</p>
              <p className="text-xs text-muted-foreground">Positive</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-2xl font-bold text-warning">18%</p>
              <p className="text-xs text-muted-foreground">Neutral</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-2xl font-bold text-destructive">10%</p>
              <p className="text-xs text-muted-foreground">Negative</p>
            </div>
          </div>
        </InsightCard>

        {/* Comparison Table */}
        <InsightCard title="Comparison with Your Idea" icon={ArrowRightLeft}>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Aspect</TableHead>
                  <TableHead>{comp.name}</TableHead>
                  <TableHead>Your Idea</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonRows.map((row) => (
                  <TableRow key={row.aspect}>
                    <TableCell className="font-medium text-foreground">{row.aspect}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{row.competitor}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{row.idea}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </InsightCard>

        {/* Opportunity */}
        <Card className="border-2 border-primary/20 bg-accent/30">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-bold text-foreground">Opportunity Against {comp.name}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <p className="font-medium text-foreground">Where You Can Compete</p>
                <p className="text-muted-foreground">Affordable pricing tier for independent restaurants that {comp.name} prices out.</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-foreground">Key Gap</p>
                <p className="text-muted-foreground">No competitor uses weather + event data for demand forecasting.</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-foreground">Differentiation Angle</p>
                <p className="text-muted-foreground">Position as the "smart, affordable" alternative with unique AI predictions.</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-foreground">Win/Loss Assessment</p>
                <p className="text-muted-foreground">Strong chance of winning SMB segment. Enterprise segment is harder to penetrate.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
