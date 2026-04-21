"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowBigDown,
  ArrowBigUp,
  ArrowUpRight,
  ExternalLink,
  Flame,
  MessageSquare,
  Search,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  discoverCategories,
  discoverSources,
  discoveredIdeas,
  SOURCE_META,
  type DiscoveredIdea,
  type IdeaSource,
} from "@/data/discover-data";

const monoFont = {
  fontFamily: '"JetBrains Mono", "SF Mono", ui-monospace, monospace',
};

export default function DiscoverPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [source, setSource] = useState<"All" | IdeaSource>("All");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("trending");

  const filtered = useMemo(() => {
    return discoveredIdeas
      .filter((d) => {
        if (source !== "All" && d.source !== source) return false;
        if (category !== "All" && d.category !== category) return false;
        if (search) {
          const q = search.toLowerCase();
          const hay = `${d.title} ${d.summary} ${d.tags.join(" ")}`.toLowerCase();
          if (!hay.includes(q)) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "trending") return b.trendingScore - a.trendingScore;
        if (sortBy === "upvotes") return b.upvotes - a.upvotes;
        if (sortBy === "comments") return b.comments - a.comments;
        return 0;
      });
  }, [search, source, category, sortBy]);

  const sourceCounts = useMemo(() => {
    const map = new Map<string, number>();
    discoveredIdeas.forEach((d) => map.set(d.source, (map.get(d.source) ?? 0) + 1));
    return map;
  }, []);

  const hasActiveFilters = search || source !== "All" || category !== "All";

  return (
    <AppLayout>
      <div className="p-4 lg:p-8 max-w-6xl mx-auto space-y-6">
        <PageHeader
          title="Discover"
          subtitle="Aggregated signals and trending ideas from around the web"
        >
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => router.push("/dashboard/ideas")}
          >
            <Sparkles className="h-4 w-4" />
            Back to Ideas
          </Button>
        </PageHeader>

        <div className="-mx-4 lg:mx-0 px-4 lg:px-0 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-2 min-w-max">
            <button
              onClick={() => setSource("All")}
              className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all ${
                source === "All"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card hover:bg-muted"
              }`}
            >
              <Flame className="h-3.5 w-3.5" />
              All sources
              <span className="text-muted-foreground tabular-nums">
                {discoveredIdeas.length}
              </span>
            </button>
            {(discoverSources.filter((s) => s !== "All") as IdeaSource[]).map((s) => {
              const meta = SOURCE_META[s];
              const count = sourceCounts.get(s) ?? 0;
              return (
                <button
                  key={s}
                  onClick={() => setSource(s)}
                  className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all ${
                    source === s
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-card hover:bg-muted"
                  }`}
                >
                  <span
                    className={`text-[10px] font-bold ${meta.color}`}
                    style={monoFont}
                  >
                    {meta.badge}
                  </span>
                  <span>{s}</span>
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
                placeholder="Search signals, keywords, tags…"
                className="pl-9 text-sm border-0 bg-secondary/50 focus-visible:ring-1 focus-visible:ring-primary/30"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full md:w-[180px] text-xs border-0 bg-secondary/50 shrink-0">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {discoverCategories.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[160px] text-xs border-0 bg-secondary/50 shrink-0">
                <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="trending">Trending</SelectItem>
                <SelectItem value="upvotes">Most upvoted</SelectItem>
                <SelectItem value="comments">Most discussed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 px-1">
              <span className="text-xs text-muted-foreground">
                {filtered.length} {filtered.length === 1 ? "signal" : "signals"}
              </span>
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary max-w-[200px]"
                >
                  <span className="truncate">&quot;{search}&quot;</span>
                  <X className="h-3 w-3 shrink-0" />
                </button>
              )}
              {source !== "All" && (
                <button
                  onClick={() => setSource("All")}
                  className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                >
                  {source}
                  <X className="h-3 w-3" />
                </button>
              )}
              {category !== "All" && (
                <button
                  onClick={() => setCategory("All")}
                  className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                >
                  {category}
                  <X className="h-3 w-3" />
                </button>
              )}
              <button
                onClick={() => {
                  setSearch("");
                  setSource("All");
                  setCategory("All");
                }}
                className="ml-auto text-xs text-muted-foreground hover:text-foreground"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((d) => (
              <SignalCard key={d.id} idea={d} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-16">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent">
                  <Flame className="h-7 w-7 text-accent-foreground" />
                </div>
                <div className="space-y-1">
                  <p className="text-base font-semibold">No signals match</p>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    Try a different source or clear the filters to see more.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}

function SignalCard({ idea }: { idea: DiscoveredIdea }) {
  const meta = SOURCE_META[idea.source];

  return (
    <div className="group rounded-2xl border bg-card p-4 sm:p-5 flex flex-col gap-3 hover:shadow-md transition-all">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className={`text-[10px] font-bold ${meta.color} shrink-0`}
            style={monoFont}
          >
            {meta.badge}
          </span>
          <span className="text-xs font-medium text-foreground truncate">
            {idea.sourceHandle}
          </span>
          <span className="h-1 w-1 rounded-full bg-muted-foreground/40 shrink-0" />
          <span className="text-[11px] text-muted-foreground truncate" style={monoFont}>
            {idea.author}
          </span>
        </div>
        <span
          className="flex items-center gap-1 text-[10px] text-muted-foreground shrink-0"
          style={monoFont}
        >
          {idea.postedAt}
        </span>
      </div>

      <div className="space-y-1.5">
        <h3 className="font-bold text-foreground text-base leading-snug line-clamp-2">
          {idea.title}
        </h3>
        <p className="text-sm text-foreground/80 leading-relaxed line-clamp-3">
          {idea.summary}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        {idea.tags.map((t) => (
          <Badge key={t} variant="secondary" className="text-[10px] font-normal">
            {t}
          </Badge>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3 pt-1">
        <VoteControl baseUpvotes={idea.upvotes} />
        <div className="flex items-center gap-3 text-xs text-muted-foreground" style={monoFont}>
          <span className="flex items-center gap-1">
            <MessageSquare className="h-3.5 w-3.5" />
            <span className="tabular-nums">{formatCount(idea.comments)}</span>
          </span>
          <span className="flex items-center gap-1 text-primary">
            <Flame className="h-3.5 w-3.5" />
            <span className="tabular-nums">{idea.trendingScore}</span>
          </span>
        </div>
      </div>

      <div className="flex gap-2 pt-1">
        <Button variant="outline" size="sm" className="flex-1 gap-1.5 text-xs" asChild>
          <Link href={idea.sourceUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-3.5 w-3.5" />
            View source
          </Link>
        </Button>
        <Button size="sm" className="flex-1 gap-1.5 text-xs" asChild>
          <Link href={`/dashboard/ideas?from=${idea.id}`}>
            Analyze
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

function formatCount(n: number): string {
  if (n < 0) return `-${formatCount(-n)}`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}

function VoteControl({ baseUpvotes }: { baseUpvotes: number }) {
  const [vote, setVote] = useState<"up" | "down" | null>(null);
  const delta = vote === "up" ? 1 : vote === "down" ? -1 : 0;
  const count = baseUpvotes + delta;

  const toggle = (next: "up" | "down") => {
    setVote((prev) => (prev === next ? null : next));
  };

  const countColor =
    vote === "up"
      ? "text-primary"
      : vote === "down"
      ? "text-destructive"
      : "text-foreground";

  return (
    <div className="inline-flex items-center gap-1">
      <button
        type="button"
        onClick={() => toggle("up")}
        aria-label="Upvote"
        aria-pressed={vote === "up"}
        className={`group flex h-9 items-center gap-1.5 rounded-full px-3 text-sm font-semibold transition-all active:scale-95 ${
          vote === "up"
            ? "bg-primary/15 text-primary ring-1 ring-primary/30"
            : "bg-secondary/60 text-muted-foreground hover:bg-primary/10 hover:text-primary"
        }`}
      >
        <ArrowBigUp
          className={`h-4 w-4 transition-transform group-hover:-translate-y-0.5 ${
            vote === "up" ? "fill-primary" : ""
          }`}
        />
        <span className={`tabular-nums ${countColor}`} style={monoFont}>
          {formatCount(count)}
        </span>
      </button>
      <button
        type="button"
        onClick={() => toggle("down")}
        aria-label="Downvote"
        aria-pressed={vote === "down"}
        className={`group flex h-9 w-9 items-center justify-center rounded-full transition-all active:scale-95 ${
          vote === "down"
            ? "bg-destructive/15 text-destructive ring-1 ring-destructive/30"
            : "bg-secondary/60 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
        }`}
      >
        <ArrowBigDown
          className={`h-4 w-4 transition-transform group-hover:translate-y-0.5 ${
            vote === "down" ? "fill-destructive" : ""
          }`}
        />
      </button>
    </div>
  );
}
