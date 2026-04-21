"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle,
  Menu,
  ThumbsDown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Sheet, SheetContent, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet";
import { ScoreGauge } from "@/components/shared/ScoreGauge";
import { cn } from "@/lib/utils";
import type { Competitor, IdeaReport } from "@/data/mock-data";

const monoFont = { fontFamily: '"JetBrains Mono", "SF Mono", ui-monospace, monospace' };

interface CompetitorDetailSidebarProps {
  competitor: Competitor;
  idea?: IdeaReport;
}

function SidebarBody({
  competitor,
  idea,
  onNavigate,
  size = "default",
}: CompetitorDetailSidebarProps & {
  onNavigate?: () => void;
  size?: "default" | "lg";
}) {
  const isLg = size === "lg";
  const host = competitor.website.replace(/^https?:\/\//, "");
  const backHref = idea ? `/dashboard/ideas/${idea.id}/competitors` : "/dashboard/ideas";
  const backLabel = idea ? "Competitors" : "Ideas";

  return (
    <>
      <Link
        href={backHref}
        onClick={onNavigate}
        className={cn(
          "flex items-center gap-2 border-b border-border text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors",
          isLg ? "px-4 h-12 text-sm font-medium" : "px-4 h-10 text-xs font-medium",
        )}
      >
        <ArrowLeft className={cn("shrink-0", isLg ? "h-4 w-4" : "h-3.5 w-3.5")} />
        <span className="uppercase tracking-wider text-[11px]">{backLabel}</span>
      </Link>

      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
            Current Competitor
          </p>
          <div className="flex items-start gap-2.5">
            <div
              className={cn(
                "flex items-center justify-center rounded-lg bg-accent text-accent-foreground font-semibold shrink-0",
                isLg ? "h-11 w-11 text-xl" : "h-9 w-9 text-base",
              )}
            >
              {competitor.logo}
            </div>
            <div className="min-w-0 flex-1">
              <h2
                className={cn(
                  "font-bold text-foreground leading-snug line-clamp-2",
                  isLg ? "text-base" : "text-sm",
                )}
              >
                {competitor.name}
              </h2>
              <a
                href={competitor.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 mt-0.5 truncate max-w-full"
                style={monoFont}
              >
                <span className="truncate">{host}</span>
                <ArrowUpRight className="h-3 w-3 shrink-0" />
              </a>
            </div>
          </div>
          <div className="flex flex-wrap gap-1 pt-1">
            <Badge variant="outline" className="text-[10px] uppercase tracking-wider capitalize">
              {competitor.type}
            </Badge>
            <Badge variant="outline" className="text-[10px] uppercase tracking-wider">
              {competitor.pricingModel}
            </Badge>
          </div>
        </div>

        <div className="flex flex-col items-center gap-1 p-3 rounded-lg bg-muted/60 border border-border">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest self-start">
            Relevance
          </p>
          <ScoreGauge score={competitor.relevanceScore} size={isLg ? 84 : 64} />
        </div>
      </div>

      <Separator />

      <div className={cn("space-y-3", isLg ? "p-4" : "p-3")}>
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
          Quick Facts
        </p>
        <dl className="space-y-2 text-xs">
          <div>
            <dt className="text-[10px] text-muted-foreground uppercase tracking-wider">
              Segment
            </dt>
            <dd className="text-foreground font-medium leading-snug">
              {competitor.marketSegment}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] text-muted-foreground uppercase tracking-wider">
              Pricing
            </dt>
            <dd className="text-foreground font-medium leading-snug">
              {competitor.pricingSummary}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] text-muted-foreground uppercase tracking-wider">
              Target
            </dt>
            <dd className="text-foreground font-medium leading-snug line-clamp-2">
              {competitor.targetAudience}
            </dd>
          </div>
        </dl>
      </div>

      {idea && (
        <>
          <Separator />
          <div className={cn("space-y-2", isLg ? "p-4" : "p-3")}>
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
              Versus
            </p>
            <Link
              href={`/dashboard/ideas/${idea.id}`}
              onClick={onNavigate}
              className="block rounded-lg border border-border bg-card p-2.5 hover:border-primary/50 hover:bg-muted/40 transition-colors"
            >
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                Your Idea
              </p>
              <p className="text-sm font-semibold text-foreground leading-snug line-clamp-2">
                {idea.title}
              </p>
            </Link>
          </div>
        </>
      )}

      <Separator />

      <div className={cn("grid grid-cols-1 gap-3", isLg ? "p-4" : "p-3")}>
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5">
            <CheckCircle className="h-3 w-3 text-success shrink-0" />
            <p className="text-[10px] font-semibold text-success uppercase tracking-widest">
              Strengths
            </p>
          </div>
          <ul className="text-xs text-muted-foreground space-y-1">
            {competitor.strengths.slice(0, 3).map((s) => (
              <li key={s} className="flex items-start gap-1.5 leading-snug">
                <span className="h-1 w-1 rounded-full bg-success shrink-0 mt-1.5" />
                <span className="line-clamp-2">{s}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5">
            <ThumbsDown className="h-3 w-3 text-destructive shrink-0" />
            <p className="text-[10px] font-semibold text-destructive uppercase tracking-widest">
              Weaknesses
            </p>
          </div>
          <ul className="text-xs text-muted-foreground space-y-1">
            {competitor.weaknesses.slice(0, 3).map((w) => (
              <li key={w} className="flex items-start gap-1.5 leading-snug">
                <span className="h-1 w-1 rounded-full bg-destructive shrink-0 mt-1.5" />
                <span className="line-clamp-2">{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export function CompetitorDetailSidebar({ competitor, idea }: CompetitorDetailSidebarProps) {
  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-border bg-card/40 sticky top-0 self-start h-[calc(100svh-3.5rem)] overflow-y-auto">
      <SidebarBody competitor={competitor} idea={idea} />
    </aside>
  );
}

export function CompetitorDetailMobileNav({ competitor, idea }: CompetitorDetailSidebarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          className="lg:hidden fixed bottom-5 right-5 z-40 h-12 rounded-full px-5 gap-2 shadow-lg"
          aria-label="View competitor details"
        >
          <Menu className="h-5 w-5" />
          <span className="text-sm font-medium">Competitor info</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-[85vw] max-w-sm sm:max-w-sm overflow-y-auto">
        <SheetTitle className="sr-only">Competitor details</SheetTitle>
        <SidebarBody
          competitor={competitor}
          idea={idea}
          onNavigate={() => setOpen(false)}
          size="lg"
        />
      </SheetContent>
    </Sheet>
  );
}
