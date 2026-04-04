import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lightbulb, Search, SlidersHorizontal, Sparkles, Trash2, RotateCcw, ExternalLink, X, Users, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ScoreBadge } from "@/components/shared/ScoreBadge";
import { mockReports } from "@/data/mock-data";

export default function IdeasPage() {
  const navigate = useNavigate();
  const [ideaText, setIdeaText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const filteredReports = mockReports
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

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
        <PageHeader
          title="Ideas"
          subtitle="Submit a startup idea and review previous analysis reports"
        />

        {/* New Idea Input */}
        <Card className="border-2 border-dashed border-primary/20 bg-accent/30">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Sparkles className="h-5 w-5 text-primary" />
              Analyze a New Idea
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Example: AI tool that helps restaurants forecast inventory and reduce food waste"
              className="min-h-[100px] resize-none bg-card text-sm"
              value={ideaText}
              onChange={(e) => setIdeaText(e.target.value)}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <Input placeholder="Target audience (optional)" className="bg-card text-sm" />
              <Input placeholder="Market / Industry (optional)" className="bg-card text-sm" />
              <Input placeholder="Geography (optional)" className="bg-card text-sm" />
              <Input placeholder="Business model (optional)" className="bg-card text-sm" />
              <Input placeholder="Keywords (optional)" className="bg-card text-sm" />
            </div>
            <div className="flex gap-2">
              <Button className="gap-2">
                <Sparkles className="h-4 w-4" />
                Analyze Idea
              </Button>
              <Button variant="outline" onClick={() => setIdeaText("")}>
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search reports…"
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

        {/* Reports List */}
        {filteredReports.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredReports.map((report) => (
              <Card
                key={report.id}
                className="hover:shadow-lg transition-all group flex flex-col overflow-hidden"
              >
                <div
                  className="p-5 flex flex-col flex-1 space-y-3 cursor-pointer"
                  onClick={() => navigate(`/ideas/${report.id}`)}
                >
                  <div className="flex items-center justify-between gap-2">
                    <StatusBadge status={report.status} />
                    {report.status === 'completed' && (
                      <ScoreBadge score={report.opportunityScore} />
                    )}
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                      {report.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{report.description}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="secondary" className="text-xs font-normal">{report.category}</Badge>
                    <span className="text-xs text-muted-foreground ml-auto">{report.createdAt}</span>
                  </div>
                </div>
                <div className="grid grid-cols-4 border-t">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-none border-r text-xs text-muted-foreground hover:text-primary h-auto py-2.5"
                    onClick={() => navigate(`/ideas/${report.id}`)}
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> Details
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-none border-r text-xs text-muted-foreground hover:text-primary h-auto py-2.5"
                    onClick={() => navigate(`/competitors?idea=${report.id}`)}
                  >
                    <Users className="h-3.5 w-3.5" /> Competitors
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-none border-r text-xs text-muted-foreground hover:text-primary h-auto py-2.5"
                    onClick={() => navigate(`/validation?idea=${report.id}`)}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" /> Validation
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-none text-xs text-muted-foreground hover:text-primary h-auto py-2.5"
                    onClick={() => navigate(`/pain-points?idea=${report.id}`)}
                  >
                    <AlertTriangle className="h-3.5 w-3.5" /> Pain Points
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent">
                <Lightbulb className="h-7 w-7 text-accent-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">No idea reports yet</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Submit your first startup idea above and get a comprehensive validation report.
              </p>
              <Button className="gap-2 mt-2">
                <Sparkles className="h-4 w-4" />
                Analyze your first idea
              </Button>
            </div>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
