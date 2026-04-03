import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  Search, Users, TrendingUp, DollarSign, Crown, ExternalLink,
  ArrowRightLeft, Globe, Star, BarChart3, Layers, Target, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { MetricCard } from "@/components/shared/MetricCard";
import { ScoreBadge } from "@/components/shared/ScoreBadge";
import { mockCompetitors, mockReports } from "@/data/mock-data";

export default function CompetitorsPage() {
  const navigate = useNavigate();
  const { id: ideaId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [pricingFilter, setPricingFilter] = useState("all");
  const [segmentFilter, setSegmentFilter] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");

  const idea = ideaId ? mockReports.find((r) => r.id === ideaId) : mockReports[0];

  const filtered = mockCompetitors
    .filter((c) => {
      if (searchQuery && !c.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (typeFilter !== "all" && c.type !== typeFilter) return false;
      if (pricingFilter !== "all" && c.pricingModel.toLowerCase().replace(/\s+/g, '-') !== pricingFilter) return false;
      if (segmentFilter !== "all" && c.marketSegment.toLowerCase().replace(/\s+/g, '-') !== segmentFilter) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "relevance") return b.relevanceScore - a.relevanceScore;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "pricing") return a.pricingSummary.localeCompare(b.pricingSummary);
      return 0;
    });

  const directCount = mockCompetitors.filter((c) => c.type === "direct").length;
  const indirectCount = mockCompetitors.filter((c) => c.type === "indirect").length;
  const topPlayer = mockCompetitors.reduce((a, b) => a.relevanceScore > b.relevanceScore ? a : b);

  const segments = [...new Set(mockCompetitors.map((c) => c.marketSegment))];
  const pricingModels = [...new Set(mockCompetitors.map((c) => c.pricingModel))];

  // Comparison insights
  const avgFeatureOverlap = 72;
  const avgPricingOverlap = 58;
  const avgAudienceOverlap = 65;
  const differentiationChance = 78;

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">Ideas</Link>
          <span>/</span>
          {idea && (
            <>
              <Link to={`/ideas/${idea.id}`} className="hover:text-primary transition-colors truncate max-w-[200px]">
                {idea.title}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-foreground font-medium">Competitors</span>
        </nav>

        {/* Header */}
        <div>
          <PageHeader
            title="Competitors"
            subtitle={`Direct and indirect competitors identified for: ${idea?.title || 'Your Idea'}`}
          />
          {idea && (
            <div className="mt-2 flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">{idea.category}</Badge>
              <span className="text-xs text-muted-foreground">·</span>
              <span className="text-xs text-muted-foreground">{idea.targetAudience}</span>
            </div>
          )}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          <MetricCard title="Total Found" value={mockCompetitors.length} icon={Users} />
          <MetricCard title="Direct" value={directCount} icon={TrendingUp} />
          <MetricCard title="Indirect" value={indirectCount} icon={ArrowRightLeft} />
          <MetricCard title="Avg Pricing" value="$170/mo" icon={DollarSign} />
          <MetricCard title="Top Player" value={topPlayer.name} icon={Crown} />
        </div>

        {/* Quick Comparison Insights */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Layers className="h-4 w-4 text-primary" />
              Quick Comparison Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Feature Overlap</span>
                  <span className="font-semibold text-foreground">{avgFeatureOverlap}%</span>
                </div>
                <Progress value={avgFeatureOverlap} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Pricing Overlap</span>
                  <span className="font-semibold text-foreground">{avgPricingOverlap}%</span>
                </div>
                <Progress value={avgPricingOverlap} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Audience Overlap</span>
                  <span className="font-semibold text-foreground">{avgAudienceOverlap}%</span>
                </div>
                <Progress value={avgAudienceOverlap} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground flex items-center gap-1"><Zap className="h-3 w-3" /> Differentiation</span>
                  <span className="font-semibold text-primary">{differentiationChance}%</span>
                </div>
                <Progress value={differentiationChance} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search competitors…" className="pl-9 text-sm" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
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
          <Select value={pricingFilter} onValueChange={setPricingFilter}>
            <SelectTrigger className="w-[160px] text-sm">
              <SelectValue placeholder="Pricing Model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Pricing</SelectItem>
              {pricingModels.map((p) => (
                <SelectItem key={p} value={p.toLowerCase().replace(/\s+/g, '-')}>{p}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={segmentFilter} onValueChange={setSegmentFilter}>
            <SelectTrigger className="w-[170px] text-sm">
              <SelectValue placeholder="Market Segment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Segments</SelectItem>
              {segments.map((s) => (
                <SelectItem key={s} value={s.toLowerCase().replace(/\s+/g, '-')}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[160px] text-sm">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">By Relevance</SelectItem>
              <SelectItem value="name">By Name</SelectItem>
              <SelectItem value="pricing">By Pricing</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Competitor Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map((comp) => (
            <Card key={comp.id} className="hover:shadow-lg transition-all group flex flex-col overflow-hidden">
              <CardContent className="p-5 space-y-4 flex-1">
                {/* Header: Logo + Name + Badges */}
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-xl shrink-0">
                    {comp.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-foreground text-base">{comp.name}</h3>
                      <Badge variant={comp.type === 'direct' ? 'default' : 'secondary'} className="text-[10px] uppercase tracking-wider">
                        {comp.type}
                      </Badge>
                      <ScoreBadge score={comp.relevanceScore} />
                    </div>
                    <a href={comp.website} className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 mt-0.5">
                      <Globe className="h-3 w-3" /> {comp.website}
                    </a>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">{comp.description}</p>

                {/* Pricing + Target + Segment */}
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div>
                    <p className="text-muted-foreground font-medium mb-1 flex items-center gap-1">
                      <DollarSign className="h-3 w-3" /> Pricing
                    </p>
                    <p className="text-foreground font-semibold">{comp.pricingSummary}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground font-medium mb-1 flex items-center gap-1">
                      <Target className="h-3 w-3" /> Target
                    </p>
                    <p className="text-foreground font-semibold">{comp.targetAudience}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground font-medium mb-1 flex items-center gap-1">
                      <BarChart3 className="h-3 w-3" /> Segment
                    </p>
                    <p className="text-foreground font-semibold">{comp.marketSegment}</p>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-1.5">Top Features</p>
                  <div className="flex flex-wrap gap-1.5">
                    {comp.features.slice(0, 4).map((f) => (
                      <Badge key={f} variant="outline" className="text-[10px] font-normal">{f}</Badge>
                    ))}
                  </div>
                </div>

                {/* Strengths & Weaknesses */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="font-medium mb-1.5 flex items-center gap-1 text-emerald-600">
                      <Star className="h-3 w-3" /> Strengths
                    </p>
                    <ul className="space-y-0.5 text-muted-foreground">
                      {comp.strengths.slice(0, 2).map((s) => <li key={s} className="flex items-start gap-1"><span className="text-emerald-500 mt-0.5">•</span> {s}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium mb-1.5 flex items-center gap-1 text-destructive">
                      <Star className="h-3 w-3" /> Weaknesses
                    </p>
                    <ul className="space-y-0.5 text-muted-foreground">
                      {comp.weaknesses.slice(0, 2).map((w) => <li key={w} className="flex items-start gap-1"><span className="text-destructive mt-0.5">•</span> {w}</li>)}
                    </ul>
                  </div>
                </div>
              </CardContent>

              {/* Card Actions */}
              <div className="grid grid-cols-2 border-t">
                <button
                  className="flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-muted-foreground hover:text-primary hover:bg-accent/50 transition-colors border-r"
                  onClick={() => navigate(`/competitors/${comp.id}`)}
                >
                  <ExternalLink className="h-3.5 w-3.5" /> View Details
                </button>
                <button
                  className="flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-muted-foreground hover:text-primary hover:bg-accent/50 transition-colors"
                >
                  <ArrowRightLeft className="h-3.5 w-3.5" /> Compare
                </button>
              </div>
            </Card>
          ))}
        </div>

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
      </div>
    </AppLayout>
  );
}
