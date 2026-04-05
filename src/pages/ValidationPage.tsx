import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { IdeaBreadcrumb } from "@/components/shared/IdeaBreadcrumb";
import {
  Search, TrendingUp, TrendingDown, Minus, BarChart3, Globe, MessageCircle,
  CheckCircle2, Lightbulb, ArrowUpRight, Target, Layers, Sparkles
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { MetricCard } from "@/components/shared/MetricCard";
import { ScoreBadge } from "@/components/shared/ScoreBadge";
import { MetricCardSkeleton } from "@/components/skeletons/MetricCardSkeleton";
import { IdeaHeaderSkeleton } from "@/components/skeletons/IdeaHeaderSkeleton";
import { ChartSkeleton } from "@/components/skeletons/ChartSkeleton";
import { TableSkeleton } from "@/components/skeletons/TableSkeleton";
import { InsightCardSkeleton } from "@/components/skeletons/InsightCardSkeleton";
import { useLoadingState } from "@/hooks/use-loading";
import { mockReports } from "@/data/mock-data";
import { mockValidation } from "@/data/validation-data";
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis
} from "recharts";

export default function ValidationPage() {
  const [searchParams] = useSearchParams();
  const isLoading = useLoadingState();
  const [ideaFilter, setIdeaFilter] = useState(searchParams.get("idea") || "all");

  const ideasWithValidation = useMemo(() => {
    const ids = mockValidation.map((v) => v.ideaId);
    return mockReports.filter((r) => ids.includes(r.id));
  }, []);

  const filteredValidation = useMemo(() => {
    if (ideaFilter === "all") return mockValidation;
    return mockValidation.filter((v) => v.ideaId === ideaFilter);
  }, [ideaFilter]);

  const avgDemandScore = Math.round(
    mockValidation.reduce((sum, v) => sum + v.searchDemand.score, 0) / mockValidation.length
  );

  const TrendIcon = ({ trend }: { trend: string }) => {
    if (trend === "up") return <TrendingUp className="h-3.5 w-3.5 text-primary" />;
    if (trend === "down") return <TrendingDown className="h-3.5 w-3.5 text-destructive" />;
    return <Minus className="h-3.5 w-3.5 text-muted-foreground" />;
  };

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
        <IdeaBreadcrumb currentPage="Validation" />
        <PageHeader title="Validation" subtitle="Search demand, market signals, and validation verdicts for your ideas" />

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => <MetricCardSkeleton key={i} />)
          ) : (
            <>
              <MetricCard title="Ideas Validated" value={mockValidation.length} icon={CheckCircle2} />
              <MetricCard title="Avg Demand Score" value={`${avgDemandScore}%`} icon={BarChart3} />
              <MetricCard title="Total Keywords" value={mockValidation.reduce((s, v) => s + v.searchDemand.keywords.length, 0)} icon={Search} />
              <MetricCard title="Community Mentions" value={mockValidation.reduce((s, v) => s + v.communityInterest.redditMentions + v.communityInterest.twitterMentions, 0).toLocaleString()} icon={MessageCircle} />
            </>
          )}
        </div>

        {/* Idea Filter */}
        <div className="flex items-center gap-3">
          <Select value={ideaFilter} onValueChange={setIdeaFilter}>
            <SelectTrigger className="w-[260px] text-sm"><SelectValue placeholder="Filter by idea" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ideas</SelectItem>
              {ideasWithValidation.map((idea) => (
                <SelectItem key={idea.id} value={idea.id}>{idea.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Per-Idea Validation Sections */}
        {isLoading ? (
          <div className="space-y-4">
            <IdeaHeaderSkeleton />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <ChartSkeleton />
              <InsightCardSkeleton lines={5} />
              <TableSkeleton rows={4} />
              <InsightCardSkeleton lines={4} />
            </div>
            <InsightCardSkeleton lines={3} />
          </div>
        ) : (
          filteredValidation.map((validation) => {
            const idea = mockReports.find((r) => r.id === validation.ideaId);
            if (!idea) return null;

            return (
              <div key={validation.ideaId} className="space-y-4">
                {/* Idea Header */}
                <Card className="border-primary/20 bg-primary/[0.02]">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                          <Lightbulb className="h-5 w-5 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <Link to={`/ideas/${idea.id}`} className="font-semibold text-foreground hover:text-primary transition-colors text-base">
                            {idea.title}
                          </Link>
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{idea.description}</p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <Badge variant="secondary" className="text-[10px]">{idea.category}</Badge>
                            <Badge variant={
                              validation.verdict.label === 'Highly Validated' ? 'default' :
                              validation.verdict.label === 'Validated' ? 'secondary' : 'outline'
                            } className="text-[10px]">
                              {validation.verdict.label}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Validation Score</p>
                        <p className="text-2xl font-bold text-primary">{validation.verdict.score}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Trend Chart */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-semibold flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        Search Trend (12 months)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={validation.searchDemand.trendData}>
                            <defs>
                              <linearGradient id={`grad-${validation.ideaId}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                            <XAxis dataKey="month" tick={{ fontSize: 11 }} className="text-muted-foreground" />
                            <YAxis tick={{ fontSize: 11 }} className="text-muted-foreground" />
                            <Tooltip
                              contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid hsl(var(--border))' }}
                              formatter={(value: number) => [value.toLocaleString(), 'Volume']}
                            />
                            <Area type="monotone" dataKey="volume" stroke="hsl(var(--primary))" strokeWidth={2} fill={`url(#grad-${validation.ideaId})`} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">{validation.searchDemand.summary}</p>
                    </CardContent>
                  </Card>

                  {/* Community Interest */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-semibold flex items-center gap-2">
                        <MessageCircle className="h-4 w-4 text-primary" />
                        Community Interest
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="p-3 rounded-lg bg-muted/50">
                          <p className="text-lg font-bold text-foreground">{validation.communityInterest.redditMentions}</p>
                          <p className="text-[10px] text-muted-foreground">Reddit</p>
                        </div>
                        <div className="p-3 rounded-lg bg-muted/50">
                          <p className="text-lg font-bold text-foreground">{validation.communityInterest.twitterMentions.toLocaleString()}</p>
                          <p className="text-[10px] text-muted-foreground">Twitter/X</p>
                        </div>
                        <div className="p-3 rounded-lg bg-muted/50">
                          <p className="text-lg font-bold text-foreground">{validation.communityInterest.forumThreads}</p>
                          <p className="text-[10px] text-muted-foreground">Forums</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {validation.communityInterest.topPlatforms.map((p) => (
                          <div key={p.name} className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground flex items-center gap-1.5">
                              <Globe className="h-3 w-3" /> {p.name}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-foreground">{p.mentions}</span>
                              <Badge variant="outline" className="text-[9px]">{p.sentiment}</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Keyword Volume Table */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-semibold flex items-center gap-2">
                        <Search className="h-4 w-4 text-primary" />
                        Keyword Volume
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs">Keyword</TableHead>
                            <TableHead className="text-xs text-right">Volume</TableHead>
                            <TableHead className="text-xs text-center">Trend</TableHead>
                            <TableHead className="text-xs text-right">Competition</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {validation.searchDemand.keywords.map((kw) => (
                            <TableRow key={kw.term}>
                              <TableCell className="text-xs font-medium">{kw.term}</TableCell>
                              <TableCell className="text-xs text-right font-semibold">{kw.volume.toLocaleString()}</TableCell>
                              <TableCell className="text-center"><TrendIcon trend={kw.trend} /></TableCell>
                              <TableCell className="text-xs text-right">
                                <Badge variant={kw.competition === 'Low' ? 'secondary' : kw.competition === 'Medium' ? 'outline' : 'default'} className="text-[9px]">
                                  {kw.competition}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  {/* Market Size */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-semibold flex items-center gap-2">
                        <Target className="h-4 w-4 text-primary" />
                        Market Size
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { label: 'TAM', value: validation.marketSize.tam },
                          { label: 'SAM', value: validation.marketSize.sam },
                          { label: 'SOM', value: validation.marketSize.som },
                          { label: 'Growth', value: validation.marketSize.growthRate },
                        ].map(({ label, value }) => (
                          <div key={label} className="p-3 rounded-lg bg-muted/50 text-center">
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{label}</p>
                            <p className="text-lg font-bold text-foreground mt-0.5">{value}</p>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-1.5">
                        {validation.marketSize.notes.map((note) => (
                          <p key={note} className="text-xs text-muted-foreground flex items-start gap-1.5">
                            <ArrowUpRight className="h-3 w-3 text-primary mt-0.5 shrink-0" />
                            {note}
                          </p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Validation Verdict */}
                <Card className="border-primary/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      Validation Verdict
                      <ScoreBadge score={validation.verdict.score} />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-foreground leading-relaxed">{validation.verdict.summary}</p>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-2">Recommendations</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {validation.verdict.recommendations.map((rec) => (
                          <div key={rec} className="flex items-start gap-2 text-xs text-muted-foreground p-2 rounded-lg bg-muted/50">
                            <CheckCircle2 className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                            {rec}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Demand Score Breakdown */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold flex items-center gap-2">
                      <Layers className="h-4 w-4 text-primary" />
                      Demand Score Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { label: 'Search Demand', value: validation.searchDemand.score },
                        { label: 'Community Interest', value: validation.communityInterest.score },
                        { label: 'Overall Verdict', value: validation.verdict.score },
                      ].map(({ label, value }) => (
                        <div key={label} className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">{label}</span>
                            <span className="font-semibold text-foreground">{value}%</span>
                          </div>
                          <Progress value={value} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })
        )}
      </div>
    </AppLayout>
  );
}
