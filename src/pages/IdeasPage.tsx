import { useState, useMemo } from "react";
import { Lightbulb, Search, SlidersHorizontal, Sparkles, LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { IdeaCard } from "@/components/ideas/IdeaCard";
import { NewAnalysisDialog } from "@/components/ideas/NewAnalysisDialog";
import { IdeaQuickView } from "@/components/ideas/IdeaQuickView";
import { mockReports, type IdeaReport } from "@/data/mock-data";

export default function IdeasPage() {
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

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Ideas", value: stats.total, accent: false },
            { label: "Completed", value: stats.completed, accent: false },
            { label: "Processing", value: stats.processing, accent: false },
            { label: "Avg. Score", value: stats.avgScore, accent: true },
          ].map((stat) => (
            <Card key={stat.label} className="p-4 flex flex-col gap-1">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {stat.label}
              </span>
              <span
                className={`text-2xl font-bold ${
                  stat.accent ? "text-primary" : "text-foreground"
                }`}
              >
                {stat.value}
              </span>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search ideas…"
              className="pl-9 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px] text-sm">
              <SlidersHorizontal className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[160px] text-sm">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest first</SelectItem>
              <SelectItem value="oldest">Oldest first</SelectItem>
              <SelectItem value="highest">Highest score</SelectItem>
              <SelectItem value="lowest">Lowest score</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">{filteredReports.length}</span>{" "}
            {filteredReports.length === 1 ? "idea" : "ideas"}
          </p>
        </div>

        {/* Reports Grid */}
        {filteredReports.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredReports.map((report) => (
              <IdeaCard key={report.id} report={report} onQuickView={setQuickViewReport} />
            ))}
          </div>
        ) : (
          <Card className="p-16">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent">
                <Lightbulb className="h-8 w-8 text-accent-foreground" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-semibold text-foreground">No ideas found</h3>
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
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
