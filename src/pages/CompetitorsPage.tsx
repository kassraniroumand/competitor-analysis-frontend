import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { IdeaBreadcrumb } from "@/components/shared/IdeaBreadcrumb";
import { Search, Users, Plus, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { CompetitorCard } from "@/components/competitors/CompetitorCard";
import { CompetitorsSidebar } from "@/components/competitors/CompetitorsSidebar";
import { CompetitorsStatBar } from "@/components/competitors/CompetitorsStatBar";
import { CompetitorCardSkeleton } from "@/components/skeletons/CompetitorCardSkeleton";
import { useLoadingState } from "@/hooks/use-loading";
import { useIsMobile } from "@/hooks/use-mobile";
import { mockCompetitors, mockReports } from "@/data/mock-data";

export default function CompetitorsPage() {
  const [searchParams] = useSearchParams();
  const isLoading = useLoadingState();
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [ideaFilter, setIdeaFilter] = useState(searchParams.get("idea") || "all");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);

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

  return (
    <AppLayout>
      <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-4 lg:space-y-6">
        <IdeaBreadcrumb currentPage="Competitors" />
        <PageHeader
          title="Competitors"
          subtitle="Direct and indirect competitors identified for this idea"
        />

        {/* Mobile: horizontal stat chips */}
        {isMobile && (
          <CompetitorsStatBar
            filtered={filtered}
            directCount={directCount}
            indirectCount={indirectCount}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* Desktop sidebar */}
          {!isMobile && (
            <CompetitorsSidebar
              filtered={filtered}
              directCount={directCount}
              indirectCount={indirectCount}
            />
          )}

          {/* Main Content */}
          <div className="space-y-3 lg:space-y-4">
            {/* Search + filter toggle */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search competitors…"
                  className="pl-9 text-sm h-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {isMobile && (
                <Button
                  variant={showFilters ? "default" : "outline"}
                  size="icon"
                  className="h-10 w-10 shrink-0"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Filters - always visible on desktop, toggleable on mobile */}
            {(!isMobile || showFilters) && (
              <div className="flex flex-wrap gap-2">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[120px] text-sm h-9">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="direct">Direct</SelectItem>
                    <SelectItem value="indirect">Indirect</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={ideaFilter} onValueChange={setIdeaFilter}>
                  <SelectTrigger className="w-[120px] text-sm h-9">
                    <SelectValue placeholder="Any Idea" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Idea</SelectItem>
                    {ideasWithCompetitors.map((idea) => (
                      <SelectItem key={idea.id} value={idea.id}>{idea.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[120px] text-sm h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Competitor Cards */}
            {isLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => <CompetitorCardSkeleton key={i} />)}
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map((comp) => (
                  <CompetitorCard key={comp.id} competitor={comp} />
                ))}

                {filtered.length === 0 && (
                  <Card className="p-10">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent">
                        <Users className="h-6 w-6 text-accent-foreground" />
                      </div>
                      <h3 className="text-base font-semibold text-foreground">No competitors found</h3>
                      <p className="text-sm text-muted-foreground max-w-sm">Try adjusting your filters or search query.</p>
                    </div>
                  </Card>
                )}

                {filtered.length > 0 && (
                  <div className="flex flex-col items-center py-4 space-y-1.5">
                    <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                      <Plus className="h-4 w-4" />
                    </Button>
                    <p className="text-xs font-semibold text-foreground">Add Competitor</p>
                    <p className="text-[11px] text-muted-foreground text-center max-w-[180px]">
                      Missing someone? Add a new competitor manually.
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
