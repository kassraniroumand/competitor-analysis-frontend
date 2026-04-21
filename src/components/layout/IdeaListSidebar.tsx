"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock, LayoutGrid, Loader2, Menu, Sparkles, Tag, Trophy, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Sheet, SheetContent, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { mockReports, mockCompetitors } from "@/data/mock-data";

function useStats() {
  return useMemo(() => {
    const completed = mockReports.filter((r) => r.status === "completed");
    const processing = mockReports.filter((r) => r.status === "processing");
    const failed = mockReports.filter((r) => r.status === "failed");
    const avgScore = completed.length
      ? Math.round(completed.reduce((s, r) => s + r.opportunityScore, 0) / completed.length)
      : 0;
    const top = [...completed]
      .sort((a, b) => b.opportunityScore - a.opportunityScore)
      .slice(0, 4);
    const recent = [...mockReports]
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, 3);
    const categoryCounts = mockReports.reduce<Record<string, number>>((acc, r) => {
      acc[r.category] = (acc[r.category] ?? 0) + 1;
      return acc;
    }, {});
    const categories = Object.entries(categoryCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);
    const totalIdeas = mockReports.length;
    const trackedIdeas = new Set(mockCompetitors.map((c) => c.ideaId)).size;
    return {
      total: totalIdeas,
      completed: completed.length,
      processing: processing.length,
      failed: failed.length,
      avgScore,
      top,
      recent,
      categories,
      competitors: mockCompetitors.length,
      trackedIdeas,
    };
  }, []);
}

function SidebarBody({
  onNavigate,
  size = "default",
}: {
  onNavigate?: () => void;
  size?: "default" | "lg";
}) {
  const isLg = size === "lg";
  const stats = useStats();

  const tiles = [
    { label: "Total", value: stats.total },
    { label: "Done", value: stats.completed },
    { label: "Active", value: stats.processing },
    { label: "Avg", value: stats.avgScore },
  ];

  return (
    <>
      <div className={cn(
        "flex items-center gap-2 border-b border-border",
        isLg ? "px-4 h-12" : "px-4 h-10",
      )}>
        <LayoutGrid className={cn("shrink-0 text-muted-foreground", isLg ? "h-4 w-4" : "h-3.5 w-3.5")} />
        <span className="uppercase tracking-wider text-[11px] font-medium text-muted-foreground">
          Ideas Pipeline
        </span>
      </div>

      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
            Overview
          </p>
          <h2
            className={cn(
              "font-bold text-foreground leading-snug",
              isLg ? "text-lg" : "text-sm",
            )}
          >
            All Ideas
          </h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {stats.completed} validated · {stats.processing} in progress
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {tiles.map((t) => (
            <div
              key={t.label}
              className="rounded-lg bg-muted/60 border border-border p-3"
            >
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                {t.label}
              </p>
              <p
                className={cn(
                  "font-extrabold text-foreground tabular-nums leading-tight",
                  isLg ? "text-2xl" : "text-xl",
                )}
              >
                {t.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div className="p-4 space-y-3">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
          Pipeline Health
        </p>
        <div className="space-y-2">
          <PipelineRow
            icon={<span className="h-1.5 w-1.5 rounded-full bg-success" />}
            label="Completed"
            count={stats.completed}
            total={stats.total}
          />
          <PipelineRow
            icon={<Loader2 className="h-3 w-3 text-warning animate-pulse" />}
            label="Processing"
            count={stats.processing}
            total={stats.total}
          />
          {stats.failed > 0 && (
            <PipelineRow
              icon={<span className="h-1.5 w-1.5 rounded-full bg-destructive" />}
              label="Failed"
              count={stats.failed}
              total={stats.total}
            />
          )}
        </div>
      </div>

      <Separator />

      <nav className={cn("space-y-1", isLg ? "p-3" : "p-3 space-y-0.5")}>
        <p className="px-2 pb-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
          <Trophy className="h-3 w-3" /> Top Scoring
        </p>
        {stats.top.map((idea) => (
          <Link
            key={idea.id}
            href={`/ideas/${idea.id}`}
            onClick={onNavigate}
            className={cn(
              "flex items-center rounded-lg transition-colors text-muted-foreground hover:bg-muted hover:text-foreground",
              isLg ? "gap-3 px-3 py-2.5" : "gap-2.5 px-2 py-2",
            )}
          >
            <span
              className={cn(
                "shrink-0 rounded-md bg-background border border-border flex items-center justify-center font-bold tabular-nums text-foreground",
                isLg ? "h-9 w-9 text-sm" : "h-7 w-7 text-xs",
              )}
            >
              {idea.opportunityScore}
            </span>
            <span
              className={cn(
                "flex-1 min-w-0 font-medium leading-snug line-clamp-2",
                isLg ? "text-sm" : "text-xs",
              )}
            >
              {idea.title}
            </span>
          </Link>
        ))}
      </nav>

      <Separator />

      <div className="p-4 space-y-2.5">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
          <Clock className="h-3 w-3" /> Recently Added
        </p>
        <div className="space-y-2">
          {stats.recent.map((r) => (
            <Link
              key={r.id}
              href={`/ideas/${r.id}`}
              onClick={onNavigate}
              className="block group"
            >
              <p className="text-xs font-medium text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                {r.title}
              </p>
              <p className="text-[10px] text-muted-foreground">{r.createdAt}</p>
            </Link>
          ))}
        </div>
      </div>

      <Separator />

      <div className="p-4 space-y-2.5">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
          <Tag className="h-3 w-3" /> Categories
        </p>
        <div className="flex flex-wrap gap-1.5">
          {stats.categories.map(([cat, count]) => (
            <Badge
              key={cat}
              variant="secondary"
              className="text-[10px] font-normal gap-1.5"
            >
              <span>{cat}</span>
              <span className="text-muted-foreground tabular-nums">{count}</span>
            </Badge>
          ))}
        </div>
      </div>

      <Separator />

      <div className="p-4 space-y-2">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
          <Users className="h-3 w-3" /> Market Coverage
        </p>
        <div className="flex items-baseline gap-1.5">
          <span className={cn("font-extrabold text-foreground tabular-nums", isLg ? "text-2xl" : "text-xl")}>
            {stats.competitors}
          </span>
          <span className="text-xs text-muted-foreground">competitors</span>
        </div>
        <p className="text-[10px] text-muted-foreground">
          Tracked across {stats.trackedIdeas} {stats.trackedIdeas === 1 ? "idea" : "ideas"}
        </p>
      </div>

      <div className="p-4 mt-auto border-t border-border">
        <Badge variant="outline" className="text-[10px] uppercase tracking-wider w-full justify-center py-1.5 gap-1">
          <Sparkles className="h-3 w-3" /> Submit new idea above
        </Badge>
      </div>
    </>
  );
}

function PipelineRow({
  icon,
  label,
  count,
  total,
}: {
  icon: ReactNode;
  label: string;
  count: number;
  total: number;
}) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-1.5 text-[11px]">
        {icon}
        <span className="text-muted-foreground flex-1">{label}</span>
        <span className="font-semibold text-foreground tabular-nums">
          {count}
          <span className="text-muted-foreground font-normal">/{total}</span>
        </span>
      </div>
      <Progress value={pct} className="h-1" />
    </div>
  );
}

export function IdeaListSidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-border bg-card/40 sticky top-0 self-start h-[calc(100svh-3.5rem)] overflow-y-auto">
      <SidebarBody />
    </aside>
  );
}

export function IdeaListMobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="lg:hidden fixed bottom-5 right-5 z-40 h-12 w-12 rounded-full shadow-lg"
          aria-label="Open ideas pipeline"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-[85vw] max-w-sm sm:max-w-sm overflow-y-auto">
        <SheetTitle className="sr-only">Ideas pipeline</SheetTitle>
        <SidebarBody onNavigate={() => setOpen(false)} size="lg" />
      </SheetContent>
    </Sheet>
  );
}
