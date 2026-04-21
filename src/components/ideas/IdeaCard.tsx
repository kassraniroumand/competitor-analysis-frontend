"use client";

import { useRouter } from "next/navigation";
import { ArrowUpRight, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { IdeaReport } from "@/data/mock-data";

interface IdeaCardProps {
  report: IdeaReport;
  onQuickView?: (report: IdeaReport) => void;
}

const monoFont = { fontFamily: '"JetBrains Mono", "SF Mono", ui-monospace, monospace' };

export function IdeaCard({ report, onQuickView }: IdeaCardProps) {
  const router = useRouter();
  const score = report.opportunityScore;
  const statusLabel =
    report.status === "completed" ? "ready" : report.status === "processing" ? "live" : "failed";
  const statusColor =
    report.status === "completed"
      ? "text-primary"
      : report.status === "processing"
      ? "text-warning"
      : "text-destructive";

  const meta = [report.industry, report.geography, report.createdAt].filter(Boolean);

  return (
    <div
      className="rounded-2xl border bg-card p-4 sm:p-6 flex flex-col gap-4 hover:shadow-md transition-all cursor-pointer"
      onClick={() => router.push(`/ideas/${report.id}`)}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground text-base sm:text-lg font-semibold shrink-0">
          {report.title.charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-foreground text-base sm:text-lg leading-tight line-clamp-2">
              {report.title}
            </h3>
            <span
              className={`flex items-center gap-1 text-[10px] shrink-0 mt-1 ${statusColor}`}
              style={monoFont}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              {statusLabel}
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground mt-0.5" style={monoFont}>
            {report.category}
          </p>
        </div>
      </div>

      <p className="text-sm text-foreground/80 leading-relaxed line-clamp-2">
        {report.description}
      </p>

      {report.status === "completed" && (
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] uppercase tracking-[0.18em] font-medium text-muted-foreground">
              Opportunity
            </span>
            <span className="text-sm font-semibold text-foreground" style={monoFont}>
              {score}
              <span className="text-muted-foreground font-normal">/100</span>
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <div className="h-full rounded-full bg-primary" style={{ width: `${score}%` }} />
          </div>
        </div>
      )}

      {meta.length > 0 && (
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
          {meta.map((m, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />}
              <span>{m}</span>
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-2 pt-1">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 gap-1.5 text-xs"
          onClick={(e) => {
            e.stopPropagation();
            onQuickView?.(report);
          }}
        >
          <Eye className="h-3.5 w-3.5" />
          Quick view
        </Button>
        <Button
          size="sm"
          className="flex-1 gap-1.5 text-xs"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/ideas/${report.id}`);
          }}
        >
          Open
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
