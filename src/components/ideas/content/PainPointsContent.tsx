"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { IdeaBreadcrumb } from "@/components/shared/IdeaBreadcrumb";
import {
  AlertTriangle, MessageSquareQuote, Lightbulb, Wrench, Sparkles,
  BarChart3, Filter, Flame, ArrowUpRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/shared/PageHeader";
import { ScoreBadge } from "@/components/shared/ScoreBadge";
import { QuoteCard } from "@/components/shared/QuoteCard";
import { MetricCardSkeleton } from "@/components/skeletons/MetricCardSkeleton";
import { IdeaHeaderSkeleton } from "@/components/skeletons/IdeaHeaderSkeleton";
import { ChartSkeleton } from "@/components/skeletons/ChartSkeleton";
import { InsightCardSkeleton } from "@/components/skeletons/InsightCardSkeleton";
import { useLoadingState } from "@/hooks/use-loading";
import { mockReports } from "@/data/mock-data";
import { mockPainPoints } from "@/data/painpoints-data";
import {
  Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis
} from "recharts";

const severityVariant: Record<string, "destructive" | "warning" | "secondary" | "success"> = {
  Critical: "destructive",
  High: "warning",
  Medium: "secondary",
  Low: "success",
};

export function PainPointsPageContent({ ideaId }: { ideaId?: string } = {}) {
  const searchParams = useSearchParams();
  const isLoading = useLoadingState();
  const [ideaFilter, setIdeaFilter] = useState(ideaId || searchParams.get("idea") || "all");
  const [severityFilter, setSeverityFilter] = useState("all");

  const ideasWithPainPoints = useMemo(() => {
    const ids = [...new Set(mockPainPoints.map((p) => p.ideaId))];
    return mockReports.filter((r) => ids.includes(r.id));
  }, []);

  const filtered = useMemo(() => {
    return mockPainPoints.filter((p) => {
      if (ideaFilter !== "all" && p.ideaId !== ideaFilter) return false;
      if (severityFilter !== "all" && p.severity.toLowerCase() !== severityFilter) return false;
      return true;
    });
  }, [ideaFilter, severityFilter]);

  const groupedByIdea = useMemo(() => {
    const groups: Record<string, typeof filtered> = {};
    filtered.forEach((p) => {
      if (!groups[p.ideaId]) groups[p.ideaId] = [];
      groups[p.ideaId].push(p);
    });
    return groups;
  }, [filtered]);

  const categoryData = useMemo(() => {
    const cats: Record<string, number> = {};
    filtered.forEach((p) => {
      cats[p.category] = (cats[p.category] || 0) + p.mentions;
    });
    return Object.entries(cats)
      .map(([name, mentions]) => ({ name, mentions }))
      .sort((a, b) => b.mentions - a.mentions);
  }, [filtered]);

  const totalMentions = filtered.reduce((s, p) => s + p.mentions, 0);
  const criticalCount = filtered.filter((p) => p.severity === 'Critical').length;

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
        <IdeaBreadcrumb currentPage="Pain Points" />
        <PageHeader title="Pain Points" subtitle="User complaints, workarounds, and feature requests across your ideas" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => <MetricCardSkeleton key={i} />)
          ) : (
            [
              { label: "Total Pain Points", value: filtered.length, icon: AlertTriangle, color: "bg-foreground text-background", iconBg: "bg-background/15" },
              { label: "Critical Issues", value: criticalCount, icon: Flame, color: "bg-destructive text-destructive-foreground", iconBg: "bg-destructive-foreground/20" },
              { label: "Total Mentions", value: totalMentions.toLocaleString(), icon: MessageSquareQuote, color: "bg-secondary text-foreground", iconBg: "bg-background" },
              { label: "Categories", value: categoryData.length, icon: BarChart3, color: "bg-accent text-accent-foreground", iconBg: "bg-background" },
            ].map((stat) => (
              <div key={stat.label} className={`rounded-2xl p-4 ${stat.color}`}>
                <div className="flex items-center justify-between">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${stat.iconBg}`}>
                    <stat.icon className="h-4 w-4" />
                  </div>
                  <span className="text-2xl font-bold tabular-nums">{stat.value}</span>
                </div>
                <p className="mt-3 text-xs font-medium opacity-70 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Select value={ideaFilter} onValueChange={setIdeaFilter}>
            <SelectTrigger className="w-[260px] text-sm"><SelectValue placeholder="Filter by idea" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ideas</SelectItem>
              {ideasWithPainPoints.map((idea) => (
                <SelectItem key={idea.id} value={idea.id}>{idea.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={severityFilter} onValueChange={setSeverityFilter}>
            <SelectTrigger className="w-[160px] text-sm"><SelectValue placeholder="Severity" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            <ChartSkeleton />
            <IdeaHeaderSkeleton />
            <InsightCardSkeleton lines={6} />
            <InsightCardSkeleton lines={6} />
          </div>
        ) : (
          <>
            {categoryData.length > 0 && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <Filter className="h-4 w-4 text-primary" />
                    Complaint Categories by Mentions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={categoryData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={false} />
                        <XAxis type="number" tick={{ fontSize: 11 }} className="text-muted-foreground" />
                        <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={120} className="text-muted-foreground" />
                        <Tooltip
                          contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid hsl(var(--border))' }}
                          formatter={(value: number) => [value.toLocaleString(), 'Mentions']}
                        />
                        <Bar dataKey="mentions" radius={[0, 4, 4, 0]}>
                          {categoryData.map((_, i) => (
                            <Cell key={i} fill={`hsl(var(--chart-${(i % 5) + 1}))`} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            )}

            {Object.entries(groupedByIdea).map(([ideaId, painPoints]) => {
              const idea = mockReports.find((r) => r.id === ideaId);
              if (!idea) return null;

              return (
                <div key={ideaId} className="space-y-4">
                  <Card className="border-primary/20 bg-primary/[0.02]">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                          <Lightbulb className="h-5 w-5 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <Link href={`/dashboard/ideas/${idea.id}`} className="font-semibold text-foreground hover:text-primary transition-colors text-base">
                            {idea.title}
                          </Link>
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{idea.description}</p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <Badge variant="secondary" className="text-[10px]">{idea.category}</Badge>
                            <span className="text-[10px] text-muted-foreground">{painPoints.length} pain points</span>
                            <ScoreBadge score={idea.opportunityScore} />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-3 pl-0 lg:pl-4">
                    {painPoints.sort((a, b) => b.mentions - a.mentions).map((pp) => (
                      <Card key={pp.id} className="overflow-hidden">
                        <CardContent className="p-5 space-y-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-foreground text-sm">{pp.point}</h3>
                              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                                <Badge variant="outline" className="text-[10px]">{pp.category}</Badge>
                                <Badge variant={severityVariant[pp.severity] || "secondary"} className="text-[10px]">
                                  {pp.severity}
                                </Badge>
                                <span className="text-[10px] text-muted-foreground">Frequency: {pp.frequency}</span>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <p className="text-lg font-bold text-foreground">{pp.mentions.toLocaleString()}</p>
                              <p className="text-[10px] text-muted-foreground">mentions</p>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-[10px]">
                              <span className="text-muted-foreground">Pain Severity</span>
                              <span className="font-medium">{pp.severity}</span>
                            </div>
                            <Progress
                              value={pp.severity === 'Critical' ? 95 : pp.severity === 'High' ? 75 : pp.severity === 'Medium' ? 50 : 25}
                              className="h-1.5"
                            />
                          </div>

                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
                              <MessageSquareQuote className="h-3 w-3" /> User Quotes
                            </p>
                            <div className="space-y-2">
                              {pp.quotes.map((q) => (
                                <QuoteCard key={q} quote={q} />
                              ))}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
                                <Wrench className="h-3 w-3" /> Common Workarounds
                              </p>
                              <ul className="space-y-1">
                                {pp.workarounds.map((w) => (
                                  <li key={w} className="text-xs text-muted-foreground flex items-start gap-1.5">
                                    <span className="text-muted-foreground mt-0.5">•</span> {w}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
                                <Sparkles className="h-3 w-3 text-primary" /> Feature Requests
                              </p>
                              <ul className="space-y-1">
                                {pp.featureRequests.map((fr) => (
                                  <li key={fr} className="text-xs text-muted-foreground flex items-start gap-1.5">
                                    <ArrowUpRight className="h-3 w-3 text-primary mt-0.5 shrink-0" /> {fr}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}

            {filtered.length === 0 && (
              <Card className="p-12">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent">
                    <AlertTriangle className="h-7 w-7 text-accent-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">No pain points found</h3>
                  <p className="text-sm text-muted-foreground max-w-sm">Try adjusting your filters.</p>
                </div>
              </Card>
            )}
          </>
        )}
    </div>
  );
}

