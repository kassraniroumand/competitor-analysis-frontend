import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { IdeaBreadcrumb } from "@/components/shared/IdeaBreadcrumb";
import {
  Search, Users, TrendingUp, ArrowRightLeft, Layers, Zap, Lightbulb,
  Crown, DollarSign, Plus
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { ScoreBadge } from "@/components/shared/ScoreBadge";
import { CompetitorCard } from "@/components/competitors/CompetitorCard";
import { CompetitorCardSkeleton } from "@/components/skeletons/CompetitorCardSkeleton";
import { useLoadingState } from "@/hooks/use-loading";
import { mockCompetitors, mockReports } from "@/data/mock-data";

export default function CompetitorsPage() {
  const [searchParams] = useSearchParams();
  const isLoading = useLoadingState();
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [ideaFilter, setIdeaFilter] = useState(searchParams.get("idea") || "all");
  const [sortBy, setSortBy] = useState("relevance");

  const ideasWithCompetitors = useMemo(() => {
    const ideaIds = [...new Set(mockCompetitors.map((c) => c.ideaId))];
    return mockReports.filter((r) => ideaIds.includes(r.id));
  }, []);

  const filtered = useMemo(() => {
    let result = mockCompetitors.filter((c) => {
      if (searchQuery && !c.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (typeFilter !== "all" && c.type !== typeFilter) return false;
      if (ideaFilter !== "all" && c.ideaId !== ideaFilter) return false;
      return true;
    });

    if (sortBy === "relevance") {
      result = [...result].sort((a, b) => b.relevanceScore - a.relevanceScore);
    } else if (sortBy === "name") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [searchQuery, typeFilter, ideaFilter, sortBy]);

  const directCount = filtered.filter((c) => c.type === "direct").length;
  const indirectCount = filtered.filter((c) => c.type === "indirect").length;

  const strongest = filtered.length > 0
    ? filtered.reduce((best, c) => c.relevanceScore > best.relevanceScore ? c : best, filtered[0])
    : null;

  // Mock comparison metrics
  const avgPricing = "$49";
  const featureOverlap = 82;
  const techStackMatch = 45;
  const customerSegment = "Enterprise Heavy";

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
        <IdeaBreadcrumb currentPage="Competitors" />
        <PageHeader
          title="Competitors"
          subtitle="Direct and indirect competitors identified for this idea"
        />

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* ─── Left Sidebar ─── */}
          <div className="space-y-4">
            {/* Summary Stats */}
            <Card>
              <CardContent className="p-5 space-y-5">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Total Found</p>
                  <p className="text-4xl font-extrabold text-foreground">{filtered.length}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Direct / Indirect</p>
                  <p className="text-2xl font-bold text-foreground">
                    <span className="text-primary">{directCount}</span>
                    <span className="text-muted-foreground mx-1">/</span>
                    {indirectCount}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Avg Pricing</p>
                  <p className="text-2xl font-bold text-foreground">{avgPricing}<span className="text-sm text-muted-foreground font-normal">/mo</span></p>
                </div>
              </CardContent>
            </Card>

            {/* Strongest Player */}
            {strongest && (
              <Card className="bg-primary text-primary-foreground">
                <CardContent className="p-5 space-y-1">
                  <p className="text-[10px] uppercase tracking-widest opacity-70 font-medium flex items-center gap-1">
                    <Crown className="h-3 w-3" /> Strongest Player
                  </p>
                  <p className="text-lg font-bold">{strongest.name}</p>
                  <p className="text-xs opacity-80">★ {strongest.relevanceScore} Relevance Score</p>
                </CardContent>
              </Card>
            )}

            {/* Feature Comparison Summary */}
            <Card>
              <CardContent className="p-5 space-y-4">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium flex items-center gap-1.5">
                  <Layers className="h-3 w-3" /> Feature Comparison
                  <Badge variant="outline" className="text-[9px] ml-auto">Summary</Badge>
                </p>

                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] text-muted-foreground mb-0.5">Pricing Parity</p>
                    <p className="text-lg font-bold text-foreground">{featureOverlap}% <span className="text-xs font-normal text-muted-foreground">Similar</span></p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground mb-0.5">Tech Stack Match</p>
                    <p className="text-lg font-bold text-foreground">{techStackMatch}% <span className="text-xs font-normal text-muted-foreground">Shared</span></p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground mb-0.5">Customer Segment</p>
                    <p className="text-sm font-semibold text-foreground">{customerSegment}</p>
                    <p className="text-[10px] text-muted-foreground">~70% sells to SMB</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ─── Main Content ─── */}
          <div className="space-y-4">
            {/* Filters Row */}
            <div className="flex flex-col sm:flex-row gap-3 flex-wrap items-start">
              <div className="relative flex-1 min-w-[180px]">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search competitors…"
                  className="pl-9 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[130px] text-sm"><SelectValue placeholder="All Types" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="direct">Direct</SelectItem>
                  <SelectItem value="indirect">Indirect</SelectItem>
                </SelectContent>
              </Select>
              <Select value={ideaFilter} onValueChange={setIdeaFilter}>
                <SelectTrigger className="w-[130px] text-sm"><SelectValue placeholder="Any Idea" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Idea</SelectItem>
                  {ideasWithCompetitors.map((idea) => (
                    <SelectItem key={idea.id} value={idea.id}>{idea.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Sort by</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[130px] text-sm h-8"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Competitor Cards */}
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => <CompetitorCardSkeleton key={i} />)}
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map((comp) => (
                  <CompetitorCard key={comp.id} competitor={comp} />
                ))}

                {filtered.length === 0 && (
                  <Card className="p-12">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent">
                        <Users className="h-7 w-7 text-accent-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">No competitors found</h3>
                      <p className="text-sm text-muted-foreground max-w-sm">Try adjusting your filters or search query.</p>
                    </div>
                  </Card>
                )}

                {/* Add Competitor CTA */}
                {filtered.length > 0 && (
                  <div className="flex flex-col items-center py-6 space-y-2">
                    <Button variant="outline" size="lg" className="rounded-full h-12 w-12 p-0">
                      <Plus className="h-5 w-5" />
                    </Button>
                    <p className="text-sm font-semibold text-foreground">Add Competitor</p>
                    <p className="text-xs text-muted-foreground text-center max-w-[200px]">
                      Missing someone? Add a new competitor to track manually.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
