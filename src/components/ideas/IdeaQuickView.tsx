"use client";

import { useRouter } from "next/navigation";
import {
  Target, Users, Globe, Briefcase, TrendingUp, AlertTriangle,
  Lightbulb, CheckCircle, ExternalLink, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ScoreBadge } from "@/components/shared/ScoreBadge";
import { ScoreGauge } from "@/components/shared/ScoreGauge";
import { QuoteCard } from "@/components/shared/QuoteCard";
import type { IdeaReport } from "@/data/mock-data";
import { scoreBreakdown, painPoints, marketGaps } from "@/data/mock-data";

interface IdeaQuickViewProps {
  report: IdeaReport | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const breakdownItems = [
  { label: "Demand", score: scoreBreakdown.demand, icon: TrendingUp },
  { label: "Competition", score: scoreBreakdown.competition, icon: Users },
  { label: "Pain Point", score: scoreBreakdown.painPoint, icon: AlertTriangle },
  { label: "Differentiation", score: scoreBreakdown.differentiation, icon: Zap },
  { label: "Monetization", score: scoreBreakdown.monetization, icon: Briefcase },
];

export function IdeaQuickView({ report, open, onOpenChange }: IdeaQuickViewProps) {
  const router = useRouter();

  if (!report) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg p-0 flex flex-col">
        <SheetHeader className="p-6 pb-0">
          <div className="flex items-center gap-2 mb-2">
            <StatusBadge status={report.status} />
            {report.status === "completed" && (
              <ScoreBadge score={report.opportunityScore} />
            )}
          </div>
          <SheetTitle className="text-lg leading-snug text-left">
            {report.title}
          </SheetTitle>
          <p className="text-sm text-muted-foreground text-left">{report.description}</p>
        </SheetHeader>

        <ScrollArea className="flex-1 px-6 pb-6">
          <div className="space-y-6 pt-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                { label: "Audience", value: report.targetAudience, icon: Target },
                { label: "Industry", value: report.industry, icon: Briefcase },
                { label: "Geography", value: report.geography, icon: Globe },
                { label: "Model", value: report.businessModel, icon: Briefcase },
              ].map((item) => (
                <div key={item.label} className="space-y-0.5">
                  <p className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                    <item.icon className="h-3 w-3" />
                    {item.label}
                  </p>
                  <p className="text-foreground font-medium text-sm">{item.value || "—"}</p>
                </div>
              ))}
            </div>

            {report.keywords && report.keywords.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {report.keywords.map((kw) => (
                  <Badge key={kw} variant="secondary" className="text-xs font-normal">
                    {kw}
                  </Badge>
                ))}
              </div>
            )}

            <Separator />

            {report.status === "completed" && (
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Opportunity Score
                </h4>
                <div className="flex justify-center">
                  <ScoreGauge score={report.opportunityScore} size={120} />
                </div>
                <div className="space-y-2.5">
                  {breakdownItems.map((item) => (
                    <div key={item.label} className="flex items-center gap-2.5">
                      <item.icon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      <span className="text-xs text-foreground w-24 shrink-0">{item.label}</span>
                      <div className="flex-1">
                        <Progress value={item.score} className="h-1.5" />
                      </div>
                      <span className="text-xs font-medium text-muted-foreground w-8 text-right">
                        {item.score}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Separator />

            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-warning" />
                Top Pain Points
              </h4>
              {painPoints.slice(0, 3).map((pp, i) => (
                <div key={i} className="space-y-1.5 pb-3 border-b border-border last:border-0 last:pb-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm text-foreground">{pp.point}</p>
                    <Badge variant="secondary" className="text-[10px] shrink-0">{pp.severity}</Badge>
                  </div>
                  <QuoteCard quote={pp.quote} />
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-primary" />
                Market Gaps
              </h4>
              {marketGaps.slice(0, 3).map((gap, i) => (
                <div key={i} className="p-3 rounded-lg bg-accent/30 space-y-0.5">
                  <p className="text-sm font-medium text-foreground">{gap.gap}</p>
                  <p className="text-xs text-muted-foreground">{gap.description}</p>
                </div>
              ))}
            </div>

            <Separator />

            {report.status === "completed" && (
              <div className="p-4 rounded-lg border-2 border-success/30 bg-success/5 space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="font-semibold text-foreground text-sm">Verdict: Build</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Strong demand signals with clear gaps in the market. Independent restaurants are underserved, and weather + event data provides strong differentiation.
                </p>
              </div>
            )}

            <Button
              className="w-full gap-2"
              onClick={() => {
                onOpenChange(false);
                router.push(`/dashboard/ideas/${report.id}`);
              }}
            >
              <ExternalLink className="h-4 w-4" />
              View Full Report
            </Button>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
