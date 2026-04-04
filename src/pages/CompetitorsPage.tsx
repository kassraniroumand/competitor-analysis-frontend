import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Search, Users, TrendingUp, ArrowRightLeft, Layers, Zap, Lightbulb
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { MetricCard } from "@/components/shared/MetricCard";
import { ScoreBadge } from "@/components/shared/ScoreBadge";
import { CompetitorCard } from "@/components/competitors/CompetitorCard";
import { mockCompetitors, mockReports } from "@/data/mock-data";

export default function CompetitorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [ideaFilter, setIdeaFilter] = useState("all");

  // Get ideas that have competitors
  const ideasWithCompetitors = useMemo(() => {
    const ideaIds = [...new Set(mockCompetitors.map((c) => c.ideaId))];
    return mockReports.filter((r) => ideaIds.includes(r.id));
  }, []);

  // Filter competitors
  const filtered = useMemo(() => {
    return mockCompetitors.filter((c) => {
      if (searchQuery && !c.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (typeFilter !== "all" && c.type !== typeFilter) return false;
      if (ideaFilter !== "all" && c.ideaId !== ideaFilter) return false;
      return true;
    });
  }, [searchQuery, typeFilter, ideaFilter]);

  // Group by idea
  const groupedByIdea = useMemo(() => {
    const groups: Record<string, typeof filtered> = {};
    filtered.forEach((c) => {
      if (!groups[c.ideaId]) groups[c.ideaId] = [];
      groups[c.ideaId].push(c);
    });
    return groups;
  }, [filtered]);

  const directCount = filtered.filter((c) => c.type === "direct").length;
  const indirectCount = filtered.filter((c) => c.type === "indirect").length;

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <PageHeader
          title="Competitors"
          subtitle="All competitors discovered across your validated ideas"
        />

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <MetricCard title="Total Competitors" value={filtered.length} icon={Users} />
          <MetricCard title="Direct" value={directCount} icon={TrendingUp} />
          <MetricCard title="Indirect" value={indirectCount} icon={ArrowRightLeft} />
          <MetricCard title="Ideas Analyzed" value={ideasWithCompetitors.length} icon={Lightbulb} />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search competitors…" className="pl-9 text-sm" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          <Select value={ideaFilter} onValueChange={setIdeaFilter}>
            <SelectTrigger className="w-[220px] text-sm">
              <SelectValue placeholder="Filter by idea" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ideas</SelectItem>
              {ideasWithCompetitors.map((idea) => (
                <SelectItem key={idea.id} value={idea.id}>{idea.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[140px] text-sm">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="direct">Direct</SelectItem>
              <SelectItem value="indirect">Indirect</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Grouped Competitor Sections */}
        {Object.entries(groupedByIdea).map(([ideaId, competitors]) => {
          const idea = mockReports.find((r) => r.id === ideaId);
          if (!idea) return null;

          const ideaDirect = competitors.filter((c) => c.type === "direct").length;
          const ideaIndirect = competitors.filter((c) => c.type === "indirect").length;
          const topScore = Math.max(...competitors.map((c) => c.relevanceScore));

          return (
            <div key={ideaId} className="space-y-4">
              {/* Idea Reference Header */}
              <Card className="border-primary/20 bg-primary/[0.02]">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                        <Lightbulb className="h-5 w-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <Link
                          to={`/ideas/${idea.id}`}
                          className="font-semibold text-foreground hover:text-primary transition-colors text-base"
                        >
                          {idea.title}
                        </Link>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{idea.description}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <Badge variant="secondary" className="text-[10px]">{idea.category}</Badge>
                          <span className="text-[10px] text-muted-foreground">{ideaDirect} direct · {ideaIndirect} indirect</span>
                          <ScoreBadge score={idea.opportunityScore} />
                        </div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Top Relevance</p>
                      <p className="text-lg font-bold text-primary">{topScore}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Competitor Cards Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pl-0 lg:pl-4">
                {competitors
                  .sort((a, b) => b.relevanceScore - a.relevanceScore)
                  .map((comp) => (
                    <CompetitorCard key={comp.id} competitor={comp} />
                  ))}
              </div>
            </div>
          );
        })}

        {/* Empty State */}
        {filtered.length === 0 && (
          <Card className="p-12">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent">
                <Users className="h-7 w-7 text-accent-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">No competitors found</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Try adjusting your filters or search query.
              </p>
            </div>
          </Card>
        )}

        {/* Quick Comparison Insights */}
        {filtered.length > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Layers className="h-4 w-4 text-primary" />
                Overall Comparison Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Feature Overlap', value: 72 },
                  { label: 'Pricing Overlap', value: 58 },
                  { label: 'Audience Overlap', value: 65 },
                ].map(({ label, value }) => (
                  <div key={label} className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="font-semibold text-foreground">{value}%</span>
                    </div>
                    <Progress value={value} className="h-2" />
                  </div>
                ))}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground flex items-center gap-1"><Zap className="h-3 w-3" /> Differentiation</span>
                    <span className="font-semibold text-primary">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
