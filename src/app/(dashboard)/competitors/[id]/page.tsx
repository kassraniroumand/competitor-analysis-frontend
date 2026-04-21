"use client";

import { useParams, useRouter } from "next/navigation";
import {
  ArrowRightLeft,
  ArrowUpRight,
  CheckCircle,
  ExternalLink,
  Globe,
  MessageSquareQuote,
  Star,
  Target,
  ThumbsDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { PageHeader } from "@/components/shared/PageHeader";
import { InsightCard } from "@/components/shared/InsightCard";
import { QuoteCard } from "@/components/shared/QuoteCard";
import {
  EditorialStatTile, MiniSparkline, MiniBars, MiniDots,
} from "@/components/competitors/EditorialStatTile";
import { mockCompetitors, mockReports } from "@/data/mock-data";

const monoFont = { fontFamily: '"JetBrains Mono", "SF Mono", ui-monospace, monospace' };

export default function Page() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const comp = mockCompetitors.find((c) => c.id === params.id) || mockCompetitors[0];
  const idea = mockReports.find((r) => r.id === comp.ideaId);

  const overlapPct = Math.min(95, Math.max(20, comp.relevanceScore - 10 + (comp.id.length * 3) % 25));
  const mau = ["420K", "1.6M", "210K", "85K", "3.2M"][Number(comp.id.replace(/\D/g, "")) % 5] || "120K";
  const trend = ["+18%", "+31%", "−4%", "+8%", "+22%"][Number(comp.id.replace(/\D/g, "")) % 5] || "+12%";
  const trendPositive = !trend.startsWith("−");
  const host = comp.website.replace(/^https?:\/\//, "");

  const comparisonRows = [
    { aspect: "Target Audience", competitor: comp.targetAudience, idea: idea?.targetAudience || "Independent operators & SMB" },
    { aspect: "Pricing", competitor: comp.pricingSummary, idea: "$49–$149/mo (affordable tier)" },
    { aspect: "Key Features", competitor: comp.features.join(", "), idea: "AI forecasting, domain-specific signals, automation" },
    { aspect: "Positioning", competitor: "Established player, enterprise focus", idea: "AI-first, SMB-friendly" },
    { aspect: "Weaknesses", competitor: comp.weaknesses.join(", "), idea: "New entrant, no brand recognition yet" },
    { aspect: "Market Gap", competitor: "High pricing, limited AI", idea: "Affordable AI with unique data sources" },
  ];

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-4 lg:space-y-6">
        <Breadcrumb className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          <BreadcrumbList className="flex-nowrap whitespace-nowrap">
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/dashboard"
                onClick={(e) => { e.preventDefault(); router.push("/dashboard"); }}
              >
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/dashboard/ideas"
                onClick={(e) => { e.preventDefault(); router.push("/dashboard/ideas"); }}
              >
                Ideas
              </BreadcrumbLink>
            </BreadcrumbItem>
            {idea && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={`/dashboard/ideas/${idea.id}`}
                    onClick={(e) => { e.preventDefault(); router.push(`/dashboard/ideas/${idea.id}`); }}
                    className="max-w-[200px] truncate"
                  >
                    {idea.title}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={`/dashboard/ideas/${idea.id}/competitors`}
                    onClick={(e) => { e.preventDefault(); router.push(`/dashboard/ideas/${idea.id}/competitors`); }}
                  >
                    Competitors
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{comp.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <PageHeader
          title={comp.name}
          subtitle={`${comp.marketSegment} · ${comp.pricingModel}`}
        >
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() => idea && router.push(`/dashboard/ideas/${idea.id}/competitors`)}
          >
            <ArrowRightLeft className="h-3.5 w-3.5" /> Compare
          </Button>
          <Button
            size="sm"
            className="gap-1.5"
            onClick={() => window.open(comp.website, "_blank", "noopener,noreferrer")}
          >
            <ExternalLink className="h-3.5 w-3.5" /> Visit Website
          </Button>
        </PageHeader>

        <div className="rounded-2xl border bg-card p-4 sm:p-6 flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-accent text-accent-foreground text-2xl sm:text-3xl font-semibold shrink-0">
              {comp.logo}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h2 className="font-bold text-foreground text-lg sm:text-xl leading-tight">
                    {comp.name}
                  </h2>
                  <a
                    href={comp.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 mt-0.5"
                    style={monoFont}
                  >
                    {host}
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>
                <span
                  className="flex items-center gap-1 text-[10px] shrink-0 mt-1 text-primary"
                  style={monoFont}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {comp.relevanceScore}% match
                </span>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                <span className="capitalize">{comp.type}</span>
                <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                <span>{comp.pricingSummary}</span>
                <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                <span>{mau} MAU</span>
                <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                <span className={trendPositive ? "text-primary" : "text-destructive"}>{trend}</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-foreground/80 leading-relaxed">{comp.description}</p>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] uppercase tracking-[0.18em] font-medium text-muted-foreground">
                Feature Overlap
              </span>
              <span className="text-sm font-semibold text-foreground" style={monoFont}>
                {overlapPct}
                <span className="text-muted-foreground font-normal">%</span>
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div className="h-full rounded-full bg-primary" style={{ width: `${overlapPct}%` }} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          <EditorialStatTile
            label="Relevance"
            value={comp.relevanceScore}
            meta={<span className="text-primary">high</span>}
            sub={`${comp.type} competitor`}
            visual={<MiniSparkline points={[3, 4, 4, 5, 6, 7, 7, 8, 9]} />}
          />
          <EditorialStatTile
            label="Feature Overlap"
            value={`${overlapPct}%`}
            meta="mapped"
            sub={`${comp.features.length} tracked features`}
            visual={<MiniBars values={[3, 4, 6, 8, 4, 3, 5, 6, 4, 2]} />}
          />
          <EditorialStatTile
            label="Pricing"
            value={comp.pricingSummary.split("–")[0] || comp.pricingSummary}
            meta={comp.pricingModel}
            sub={comp.pricingSummary}
            visual={<MiniDots values={[2, 4, 9, 8, 7, 6, 8, 5, 4, 3]} />}
          />
          <EditorialStatTile
            label="Momentum 90d"
            value={trend}
            meta={<span className={trendPositive ? "text-primary" : "text-destructive"}>{trendPositive ? "↑ heating" : "↓ cooling"}</span>}
            sub={`${mau} MAU`}
            visual={<MiniSparkline points={[2, 3, 3, 4, 3, 4, 5, 6, 8]} />}
          />
        </div>

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
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                  {item.label}
                </p>
                <p className="text-foreground font-medium">{item.value}</p>
              </div>
            ))}
          </div>
        </InsightCard>

        <InsightCard title="Features & Strengths" icon={Star}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                Core Features
              </p>
              <div className="flex flex-wrap gap-1.5">
                {comp.features.map((f) => (
                  <Badge key={f} variant="outline" className="text-xs">{f}</Badge>
                ))}
              </div>
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest pt-2">
                Standout Features
              </p>
              <ul className="text-sm text-muted-foreground space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                  Real-time dashboard with live operational metrics
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                  Automated supplier reordering workflows
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <p className="text-[10px] font-semibold text-success uppercase tracking-widest">
                Strengths
              </p>
              <ul className="text-sm text-muted-foreground space-y-1.5">
                {comp.strengths.map((s) => (
                  <li key={s} className="flex items-start gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-success shrink-0 mt-0.5" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </InsightCard>

        <InsightCard title="Weaknesses & Complaints" icon={ThumbsDown}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <p className="text-[10px] font-semibold text-destructive uppercase tracking-widest">
                Weaknesses
              </p>
              <ul className="text-sm text-muted-foreground space-y-1.5">
                {comp.weaknesses.map((w) => (
                  <li key={w} className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-destructive shrink-0 mt-1.5" />
                    {w}
                  </li>
                ))}
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-destructive shrink-0 mt-1.5" />
                  Users report slow customer support response times
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-destructive shrink-0 mt-1.5" />
                  Limited mobile experience for on-the-go managers
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                User Complaints
              </p>
              <QuoteCard quote={`${comp.name} is powerful but way too expensive for a single-location operator.`} />
              <QuoteCard quote={`The onboarding took us weeks. We almost gave up.`} />
            </div>
          </div>
        </InsightCard>

        <InsightCard title="User Sentiment" icon={MessageSquareQuote}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: "Overall Rating", value: "3.8", color: "text-foreground" },
              { label: "Positive", value: "72%", color: "text-success" },
              { label: "Neutral", value: "18%", color: "text-warning" },
              { label: "Negative", value: "10%", color: "text-destructive" },
            ].map((s) => (
              <div key={s.label} className="rounded-lg bg-muted/50 p-4 text-center">
                <p className={`text-2xl font-bold tabular-nums ${s.color}`}>{s.value}</p>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <QuoteCard quote={`Best-in-class analytics but the price jump from starter to pro is brutal.`} />
            <QuoteCard quote={`Great core product — missing some of the newer AI features I want.`} />
          </div>
        </InsightCard>

        <InsightCard title="Comparison with Your Idea" icon={ArrowRightLeft}>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Aspect</TableHead>
                  <TableHead>{comp.name}</TableHead>
                  <TableHead>{idea ? idea.title : "Your Idea"}</TableHead>
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

        <div className="rounded-2xl border-2 border-success/30 bg-success/5 p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10">
              <Target className="h-5 w-5 text-success" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">Opportunity Against {comp.name}</h3>
              <p className="text-sm text-muted-foreground">Where you can win, and how to differentiate.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                Where You Can Compete
              </p>
              <p className="text-muted-foreground">
                Affordable pricing tier for independent operators that {comp.name} prices out.
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                Key Gap
              </p>
              <p className="text-muted-foreground">
                No competitor uses weather + event data for demand forecasting.
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                Differentiation Angle
              </p>
              <p className="text-muted-foreground">
                Position as the &quot;smart, affordable&quot; alternative with unique AI predictions.
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                Win/Loss Assessment
              </p>
              <p className="text-muted-foreground">
                Strong chance in SMB segment. Enterprise segment is harder to penetrate.
              </p>
            </div>
          </div>
        </div>
    </div>
  );
}