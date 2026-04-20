"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { IdeaBreadcrumb } from "@/components/shared/IdeaBreadcrumb";
import {
  Search, Users, Plus, SlidersHorizontal,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/PageHeader";
import { CompetitorCard } from "@/components/competitors/CompetitorCard";
import { CompetitorsStatBar } from "@/components/competitors/CompetitorsStatBar";
import {
  EditorialStatTile, MiniSparkline, MiniBars, MiniDots,
} from "@/components/competitors/EditorialStatTile";
import { CompetitorCardSkeleton } from "@/components/skeletons/CompetitorCardSkeleton";
import { useLoadingState } from "@/hooks/use-loading";
import { useIsMobile } from "@/hooks/use-mobile";
import { mockCompetitors, mockReports } from "@/data/mock-data";

export function CompetitorsPageContent() {
  const searchParams = useSearchParams();
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
  const strongest = filtered.length > 0
    ? filtered.reduce((best, c) => c.relevanceScore > best.relevanceScore ? c : best, filtered[0])
    : null;

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-4 lg:space-y-6">
        <IdeaBreadcrumb currentPage="Competitors" />
        <PageHeader
          title="Competitors"
          subtitle="Direct and indirect competitors identified for this idea"
        />

        {isMobile && (
          <CompetitorsStatBar
            filtered={filtered}
            directCount={directCount}
            indirectCount={indirectCount}
          />
        )}

        {!isMobile && (
          <div className="grid grid-cols-4 gap-4">
            <EditorialStatTile
              label="Tracked"
              value={filtered.length}
              meta={<span className="text-primary">+3</span>}
              sub={`${directCount} direct · ${indirectCount} indirect`}
              visual={<MiniSparkline points={[3, 4, 5, 5, 6, 7, 7, 9, 11]} />}
            />
            <EditorialStatTile
              label="Avg Overlap"
              value="56%"
              meta="stable"
              sub="range 22 – 86%"
              visual={<MiniBars values={[3, 4, 6, 8, 4, 3, 5, 6, 4, 2]} />}
            />
            <EditorialStatTile
              label="Pricing"
              value="$0…"
              meta="med $12"
              sub="your band $9 – $14"
              visual={<MiniDots values={[2, 4, 9, 8, 7, 6, 8, 5, 4, 3]} />}
            />
            <EditorialStatTile
              label="Momentum 90d"
              value="4"
              meta={<span className="text-primary">↑ heating</span>}
              sub={strongest ? `${strongest.name} +31%` : "Foodvisor +31%"}
              visual={<MiniSparkline points={[2, 3, 3, 4, 3, 4, 5, 6, 8]} />}
            />
          </div>
        )}

        <div className="flex gap-2 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
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
          {(!isMobile || showFilters) && (
            <>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[130px] text-sm h-10">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="direct">Direct</SelectItem>
                  <SelectItem value="indirect">Indirect</SelectItem>
                </SelectContent>
              </Select>
              <Select value={ideaFilter} onValueChange={setIdeaFilter}>
                <SelectTrigger className="w-[140px] text-sm h-10">
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
                <SelectTrigger className="w-[130px] text-sm h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>
            </>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => <CompetitorCardSkeleton key={i} />)}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filtered.map((comp) => (
                <CompetitorCard key={comp.id} competitor={comp} />
              ))}
            </div>

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
          </>
        )}
    </div>
  );
}

