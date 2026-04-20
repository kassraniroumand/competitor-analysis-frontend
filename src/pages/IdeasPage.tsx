import { useState, useMemo } from "react";
import { Lightbulb, Search, SlidersHorizontal, Sparkles, ArrowUpDown, X, TrendingUp, CheckCircle2, Loader2, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { IdeaCard } from "@/components/ideas/IdeaCard";
import { NewAnalysisDialog } from "@/components/ideas/NewAnalysisDialog";
import { IdeaQuickView } from "@/components/ideas/IdeaQuickView";
import { MetricCardSkeleton } from "@/components/skeletons/MetricCardSkeleton";
import { EditorialStatTile, MiniSparkline, MiniBars, MiniDots } from "@/components/competitors/EditorialStatTile";
import { IdeaCardSkeleton } from "@/components/skeletons/IdeaCardSkeleton";
import { useLoadingState } from "@/hooks/use-loading";
import { mockReports, type IdeaReport } from "@/data/mock-data";

export default function IdeasPage() {
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

  const stats = useMemo(() => {
    const completed = mockReports.filter((r) => r.status === "completed");
    const avgScore = completed.length
      ? Math.round(completed.reduce((sum, r) => sum + r.opportunityScore, 0) / completed.length)
      : 0;
    return {
      total: mockReports.length,
      completed: completed.length,
      processing: mockReports.filter((r) => r.status === "processing").length,
      avgScore,
    };
  }, []);

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
        <PageHeader
          title="Ideas"
          subtitle="Submit startup ideas and explore validation reports"
        >
          <NewAnalysisDialog open={dialogOpen} onOpenChange={setDialogOpen} />
        </PageHeader>

        {/* Editorial stat tiles — scrollable on mobile, grid on desktop */}
        <div className="-mx-6 lg:mx-0 px-6 lg:px-0 overflow-x-auto lg:overflow-visible scrollbar-hide">
          <div className="flex lg:grid lg:grid-cols-4 gap-4 min-w-max lg:min-w-0">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="w-[78vw] sm:w-[42vw] lg:w-auto shrink-0 lg:shrink">
                  <MetricCardSkeleton />
                </div>
              ))
            ) : (
              <>
                <div className="w-[78vw] sm:w-[42vw] lg:w-auto shrink-0 lg:shrink">
                  <EditorialStatTile
                    label="Total Ideas"
                    value={stats.total}
                    meta={<span className="text-primary">+{stats.processing}</span>}
                    sub={`${stats.completed} done · ${stats.processing} active`}
                    visual={<MiniSparkline points={[1, 2, 2, 3, 3, 4, 4, 5, stats.total]} />}
                  />
                </div>
                <div className="w-[78vw] sm:w-[42vw] lg:w-auto shrink-0 lg:shrink">
                  <EditorialStatTile
                    label="Completed"
                    value={stats.completed}
                    meta="ready"
                    sub={`${Math.round((stats.completed / Math.max(stats.total, 1)) * 100)}% of total`}
                    visual={<MiniBars values={[2, 3, 4, 3, 5, 4, 6, 5, 7, stats.completed]} />}
                  />
                </div>
                <div className="w-[78vw] sm:w-[42vw] lg:w-auto shrink-0 lg:shrink">
                  <EditorialStatTile
                    label="In Progress"
                    value={stats.processing}
                    meta="live"
                    sub="avg 12 min to result"
                    visual={<MiniDots values={[3, 4, 5, 6, 4, 5, 7, 5, 6, 4]} />}
                  />
                </div>
                <div className="w-[78vw] sm:w-[42vw] lg:w-auto shrink-0 lg:shrink">
                  <EditorialStatTile
                    label="Avg Score"
                    value={stats.avgScore}
                    meta={<span className="text-primary">↑ trending</span>}
                    sub="across all completed ideas"
                    visual={<MiniSparkline points={[55, 60, 62, 68, 70, 72, 75, 78, stats.avgScore]} />}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="rounded-2xl border border-border bg-card p-2">
          <div className="flex flex-col sm:flex-row gap-2">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search ideas…"
                className="pl-9 text-sm border-0 bg-secondary/50 focus-visible:ring-1 focus-visible:ring-primary/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              {/* Status pills */}
              <div className="flex items-center gap-1 rounded-xl bg-secondary/50 p-1">
                {[
                  { value: "all", label: "All" },
                  { value: "completed", label: "Done" },
                  { value: "processing", label: "Active" },
                  { value: "failed", label: "Failed" },
                ].map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setStatusFilter(s.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      statusFilter === s.value
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px] text-xs border-0 bg-secondary/50 gap-1.5">
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
            </div>
          </div>

          {/* Active filter chips */}
          {(searchQuery || statusFilter !== "all") && (
            <div className="flex items-center gap-2 mt-2 px-1">
              <span className="text-xs text-muted-foreground">
                {filteredReports.length} {filteredReports.length === 1 ? "result" : "results"}
              </span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                >
                  "{searchQuery}"
                  <X className="h-3 w-3" />
                </button>
              )}
              {statusFilter !== "all" && (
                <button
                  onClick={() => setStatusFilter("all")}
                  className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                >
                  {statusFilter}
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Results count — only show when no active filters */}
        {!isLoading && !searchQuery && statusFilter === "all" && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">{filteredReports.length}</span>{" "}
              {filteredReports.length === 1 ? "idea" : "ideas"}
            </p>
          </div>
        )}

        {/* Reports Grid */}
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
      </div>
    </AppLayout>
  );
}
