"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Clock, Newspaper, Search, X } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockNews, newsCategories, type SaaSNewsItem } from "@/data/news-data";

type CategoryFilter = SaaSNewsItem["category"] | "All";

const monoFont = {
  fontFamily: '"JetBrains Mono", "SF Mono", ui-monospace, monospace',
};

const CATEGORY_BADGE: Record<SaaSNewsItem["category"], string> = {
  Funding: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  Product: "bg-primary/10 text-primary border-primary/20",
  Trend: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  Acquisition: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  Launch: "bg-amber-500/10 text-amber-600 border-amber-500/20",
};

export default function Page() {
  const [active, setActive] = useState<CategoryFilter>("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const items = useMemo(() => {
    const filtered = mockNews.filter((n) => {
      if (active !== "All" && n.category !== active) return false;
      if (search) {
        const q = search.toLowerCase();
        const hay = `${n.title} ${n.summary} ${n.tags.join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    return filtered.sort((a, b) => {
      if (sortBy === "newest") return b.publishedAt.localeCompare(a.publishedAt);
      if (sortBy === "oldest") return a.publishedAt.localeCompare(b.publishedAt);
      if (sortBy === "shortest") return a.readTimeMin - b.readTimeMin;
      if (sortBy === "longest") return b.readTimeMin - a.readTimeMin;
      return 0;
    });
  }, [active, search, sortBy]);

  const categoryCounts = useMemo(() => {
    const map = new Map<string, number>();
    mockNews.forEach((n) => map.set(n.category, (map.get(n.category) ?? 0) + 1));
    return map;
  }, []);

  const featured = items[0];
  const rest = items.slice(1);
  const hasActiveFilters = search || active !== "All";

  return (
    <AppLayout>
      <div className="p-4 lg:p-8 max-w-6xl mx-auto space-y-6">
        <PageHeader
          title="News"
          subtitle="Funding, launches, and trends shaping SaaS"
        />

        <div className="-mx-4 lg:mx-0 px-4 lg:px-0 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-2 min-w-max">
            <button
              onClick={() => setActive("All")}
              className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all ${
                active === "All"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card hover:bg-muted"
              }`}
            >
              <Newspaper className="h-3.5 w-3.5" />
              All
              <span className="text-muted-foreground tabular-nums">
                {mockNews.length}
              </span>
            </button>
            {newsCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all ${
                  active === cat
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card hover:bg-muted"
                }`}
              >
                <span>{cat}</span>
                <span className="text-muted-foreground tabular-nums">
                  {categoryCounts.get(cat) ?? 0}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-2 space-y-2">
          <div className="flex flex-col md:flex-row gap-2">
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search news, tags…"
                className="pl-9 text-sm border-0 bg-secondary/50 focus-visible:ring-1 focus-visible:ring-primary/30"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[170px] text-xs border-0 bg-secondary/50 shrink-0">
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
                <SelectItem value="shortest">Shortest read</SelectItem>
                <SelectItem value="longest">Longest read</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 px-1">
              <span className="text-xs text-muted-foreground">
                {items.length} {items.length === 1 ? "story" : "stories"}
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
              {active !== "All" && (
                <button
                  onClick={() => setActive("All")}
                  className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                >
                  {active}
                  <X className="h-3 w-3" />
                </button>
              )}
              <button
                onClick={() => {
                  setSearch("");
                  setActive("All");
                }}
                className="ml-auto text-xs text-muted-foreground hover:text-foreground"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {featured && !hasActiveFilters && (
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr]">
                <div className="flex h-48 items-center justify-center bg-gradient-to-br from-accent via-accent to-accent/60 text-7xl lg:h-full">
                  {featured.imageEmoji}
                </div>
                <div className="p-5 lg:p-8 space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge
                      variant="outline"
                      className={`text-[10px] font-medium ${CATEGORY_BADGE[featured.category]}`}
                    >
                      {featured.category}
                    </Badge>
                    <span className="text-[11px] text-muted-foreground" style={monoFont}>
                      {featured.source}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                    <span className="text-[11px] text-muted-foreground" style={monoFont}>
                      {featured.publishedAt}
                    </span>
                  </div>
                  <h2 className="text-xl lg:text-2xl font-bold leading-tight tracking-tight">
                    {featured.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {featured.summary}
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <div
                      className="flex items-center gap-1.5 text-xs text-muted-foreground"
                      style={monoFont}
                    >
                      <Clock className="h-3 w-3" />
                      {featured.readTimeMin} min read
                    </div>
                    <Button asChild size="sm" className="gap-1.5 text-xs">
                      <Link href={featured.url} target="_blank" rel="noopener noreferrer">
                        Read story
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(hasActiveFilters ? items : rest).map((item) => (
              <Link
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="h-full rounded-2xl border bg-card p-4 sm:p-5 flex flex-col gap-3 hover:shadow-md transition-all">
                  <div className="flex h-24 items-center justify-center rounded-xl bg-gradient-to-br from-accent via-accent to-accent/50 text-4xl">
                    {item.imageEmoji}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge
                      variant="outline"
                      className={`text-[10px] font-medium ${CATEGORY_BADGE[item.category]}`}
                    >
                      {item.category}
                    </Badge>
                    <span className="text-[11px] text-muted-foreground truncate" style={monoFont}>
                      {item.source}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                    {item.summary}
                  </p>
                  <div
                    className="flex items-center justify-between pt-1 mt-auto text-[11px] text-muted-foreground"
                    style={monoFont}
                  >
                    <span>{item.publishedAt}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {item.readTimeMin} min
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center gap-3 py-16 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent">
                <Newspaper className="h-7 w-7 text-accent-foreground" />
              </div>
              <div className="space-y-1">
                <p className="text-base font-semibold">No stories match</p>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Try a different category or clear your filters.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
