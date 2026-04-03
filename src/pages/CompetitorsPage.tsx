import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, SlidersHorizontal, Users, TrendingUp, DollarSign, Crown, ExternalLink, ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { MetricCard } from "@/components/shared/MetricCard";
import { ScoreBadge } from "@/components/shared/ScoreBadge";
import { mockCompetitors } from "@/data/mock-data";

export default function CompetitorsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");

  const filtered = mockCompetitors
    .filter((c) => {
      if (searchQuery && !c.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (typeFilter !== "all" && c.type !== typeFilter) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "relevance") return b.relevanceScore - a.relevanceScore;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  const directCount = mockCompetitors.filter((c) => c.type === "direct").length;
  const indirectCount = mockCompetitors.filter((c) => c.type === "indirect").length;

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
        <PageHeader
          title="Competitors"
          subtitle="Direct and indirect competitors identified for: AI Inventory Forecasting for Restaurants"
        />

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          <MetricCard title="Total Found" value={mockCompetitors.length} icon={Users} />
          <MetricCard title="Direct" value={directCount} icon={TrendingUp} />
          <MetricCard title="Indirect" value={indirectCount} icon={ArrowRightLeft} />
          <MetricCard title="Avg Pricing" value="$170/mo" icon={DollarSign} />
          <MetricCard title="Top Player" value="WasteNot AI" icon={Crown} />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search competitors…" className="pl-9 text-sm" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[150px] text-sm">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="direct">Direct</SelectItem>
              <SelectItem value="indirect">Indirect</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[160px] text-sm">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">By Relevance</SelectItem>
              <SelectItem value="name">By Name</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Competitor Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map((comp) => (
            <Card key={comp.id} className="hover:shadow-md transition-shadow group">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-muted text-xl shrink-0">
                    {comp.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-foreground">{comp.name}</h3>
                      <Badge variant={comp.type === 'direct' ? 'default' : 'secondary'} className="text-[10px] uppercase tracking-wider">
                        {comp.type}
                      </Badge>
                      <ScoreBadge score={comp.relevanceScore} />
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{comp.website}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{comp.description}</p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-muted-foreground font-medium mb-1">Pricing</p>
                    <p className="text-foreground font-medium">{comp.pricingSummary}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground font-medium mb-1">Target</p>
                    <p className="text-foreground font-medium">{comp.targetAudience}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {comp.features.slice(0, 4).map((f) => (
                    <Badge key={f} variant="outline" className="text-[10px] font-normal">{f}</Badge>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-success font-medium mb-1">Strengths</p>
                    <ul className="space-y-0.5 text-muted-foreground">
                      {comp.strengths.slice(0, 2).map((s) => <li key={s}>• {s}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="text-destructive font-medium mb-1">Weaknesses</p>
                    <ul className="space-y-0.5 text-muted-foreground">
                      {comp.weaknesses.slice(0, 2).map((w) => <li key={w}>• {w}</li>)}
                    </ul>
                  </div>
                </div>
                <div className="flex gap-2 pt-1">
                  <Button size="sm" variant="outline" className="flex-1 text-xs gap-1.5" onClick={() => navigate(`/competitors/${comp.id}`)}>
                    <ExternalLink className="h-3 w-3" /> View Details
                  </Button>
                  <Button size="sm" variant="ghost" className="text-xs gap-1.5">
                    <ArrowRightLeft className="h-3 w-3" /> Compare
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
