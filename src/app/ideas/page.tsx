"use client";

import { useState, useMemo } from "react";
import { Lightbulb, Search, Sparkles, ArrowUpDown, X, Plus, CheckCircle2, Loader2, AlertCircle, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/shared/PageHeader";
import { IdeaCard } from "@/components/ideas/IdeaCard";
import { NewAnalysisDialog } from "@/components/ideas/NewAnalysisDialog";
import { IdeaQuickView } from "@/components/ideas/IdeaQuickView";
import { IdeaCardSkeleton } from "@/components/skeletons/IdeaCardSkeleton";
import { useLoadingState } from "@/hooks/use-loading";
import { mockReports, type IdeaReport } from "@/data/mock-data";

const STATUS_FILTERS = [
  { value: "all", label: "All", icon: LayoutGrid },
  { value: "completed", label: "Done", icon: CheckCircle2 },
  { value: "processing", label: "Active", icon: Loader2 },
  { value: "failed", label: "Failed", icon: AlertCircle },
] as const;

export default function Page() {
  const isLoading = useLoadingState();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [quickViewReport, setQuickViewReport] = useState<IdeaReport | null>(null);

  const filteredReports = useMemo(() => {
    return mockReports
      .filter((r) => {
        if (searchQuery && !r.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        if (statusFilter !== "all" && r.status !== statusFilter) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "newest") return b.createdAt.localeCompare(a.createdAt);
        if (sortBy === "oldest") return a.createdAt.localeCompare(b.createdAt);
        if (sortBy === "highest") return b.opportunityScore - a.opportunityScore;
        if (sortBy === "lowest") return a.opportunityScore - b.opportunityScore;
        return 0;
      });
  }, [searchQuery, statusFilter, sortBy]);

  const statusCounts = useMemo(() => {
    const counts = { all: mockReports.length, completed: 0, processing: 0, failed: 0 } as Record<string, number>;
    mockReports.forEach((r) => {
      counts[r.status] = (counts[r.status] ?? 0) + 1;
    });
    return counts;
  }, []);

  const hasActiveFilters = !!searchQuery || statusFilter !== "all";

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto space-y-6">
        <PageHeader
          title="Ideas"
          subtitle="Submit startup ideas and explore validation reports"
        />

        <div className="-mx-4 lg:mx-0 px-4 lg:px-0 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-2 min-w-max">
            {STATUS_FILTERS.map((s) => {
              const isActive = statusFilter === s.value;
              const count = statusCounts[s.value] ?? 0;
              return (
                <button
                  key={s.value}
                  onClick={() => setStatusFilter(s.value)}
                  className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-card hover:bg-muted"
                  }`}
                >
                  <s.icon className="h-3.5 w-3.5" />
                  {s.label}
                  <span className="text-muted-foreground tabular-nums">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-2 space-y-2">
          <div className="flex flex-col md:flex-row gap-2">
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search ideas, themes, audiences…"
                className="pl-9 text-sm border-0 bg-secondary/50 focus-visible:ring-1 focus-visible:ring-primary/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[160px] text-xs border-0 bg-secondary/50 gap-1.5 shrink-0">
                <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
                <SelectItem value="highest">Highest score</SelectItem>
                <SelectItem value="lowest">Lowest score</SelectItem>
              </SelectContent>
            </Select>

            <Button
              onClick={() => setDialogOpen(true)}
              className="gap-2 shrink-0 shadow-sm"
            >
              <Plus className="h-4 w-4" />
              New Analysis
            </Button>
          </div>

          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 px-1">
              <span className="text-xs text-muted-foreground">
                {filteredReports.length} {filteredReports.length === 1 ? "result" : "results"}
              </span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary max-w-[200px]"
                >
                  <span className="truncate">&quot;{searchQuery}&quot;</span>
                  <X className="h-3 w-3 shrink-0" />
                </button>
              )}
              {statusFilter !== "all" && (
                <button
                  onClick={() => setStatusFilter("all")}
                  className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                >
                  {STATUS_FILTERS.find((s) => s.value === statusFilter)?.label ?? statusFilter}
                  <X className="h-3 w-3" />
                </button>
              )}
              <button
                onClick={() => { setSearchQuery(""); setStatusFilter("all"); }}
                className="ml-auto text-xs text-muted-foreground hover:text-foreground"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {!isLoading && !searchQuery && statusFilter === "all" && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">{filteredReports.length}</span>{" "}
              {filteredReports.length === 1 ? "idea" : "ideas"}
            </p>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <IdeaCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredReports.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredReports.map((report) => (
              <IdeaCard key={report.id} report={report} onQuickView={setQuickViewReport} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-16">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent">
                  <Lightbulb className="h-8 w-8 text-accent-foreground" />
                </div>
                <div className="space-y-1.5">
                  <CardTitle className="text-lg">No ideas found</CardTitle>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    {searchQuery || statusFilter !== "all"
                      ? "Try adjusting your search or filters."
                      : "Submit your first startup idea and get a comprehensive validation report."}
                  </p>
                </div>
                {!searchQuery && statusFilter === "all" && (
                  <Button className="gap-2 mt-2" onClick={() => setDialogOpen(true)}>
                    <Sparkles className="h-4 w-4" />
                    Analyze your first idea
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        <IdeaQuickView
          report={quickViewReport}
          open={!!quickViewReport}
          onOpenChange={(open) => { if (!open) setQuickViewReport(null); }}
        />

        <NewAnalysisDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          triggerButton={false}
        />
    </div>
  );
}
