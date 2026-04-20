"use client";

import { useRouter } from "next/navigation";
import { ArrowUpRight, Eye, Users, AlertTriangle } from "lucide-react";
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

  return (
    <div className="rounded-2xl border bg-card p-6 flex flex-col gap-5 hover:shadow-md transition-all">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground text-lg font-semibold shrink-0">
            {report.title.charAt(0)}
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-foreground text-lg leading-tight line-clamp-2">
              {report.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5" style={monoFont}>
              {report.category}
            </p>
            <div className="mt-2">
              <span className="inline-block rounded-md bg-accent text-accent-foreground text-[10px] uppercase tracking-[0.18em] font-semibold px-2 py-1">
                {report.businessModel || "Idea"}
              </span>
            </div>
          </div>
        </div>
        <div className={`flex items-center gap-1.5 text-xs shrink-0 ${statusColor}`} style={monoFont}>
          <span className="h-2 w-2 rounded-full bg-current" />
          {statusLabel}
        </div>
      </div>

      <p className="text-sm text-foreground/80 leading-relaxed line-clamp-2">
        {report.description}
      </p>

      {report.status === "completed" && (
        <div className="border-b border-dashed pb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-[0.18em] font-medium text-muted-foreground">
              Opportunity Score
            </span>
            <span className="text-sm font-semibold text-foreground" style={monoFont}>
              {score}
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <div className="h-full rounded-full bg-primary" style={{ width: `${score}%` }} />
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 border-b border-dashed pb-4">
        <Stat label="Industry" value={report.industry || "—"} />
        <Stat label="Geo" value={report.geography || "—"} />
        <Stat label="Created" value={report.createdAt} mono />
      </div>

      <div className="grid grid-cols-4 gap-2">
        <ActionBtn
          icon={<Eye className="h-3.5 w-3.5" />}
          label="View"
          onClick={() => onQuickView?.(report)}
        />
        <ActionBtn
          icon={<Users className="h-3.5 w-3.5" />}
          label="Comp"
          onClick={() => router.push(`/ideas/${report.id}/competitors`)}
        />
        <ActionBtn
          icon={<AlertTriangle className="h-3.5 w-3.5" />}
          label="Pains"
          onClick={() => router.push(`/pain-points?idea=${report.id}`)}
        />
        <ActionBtn
          icon={<ArrowUpRight className="h-3.5 w-3.5" />}
          label="Report"
          onClick={() => router.push(`/ideas/${report.id}`)}
        />
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] uppercase tracking-[0.18em] font-medium text-muted-foreground">
        {label}
      </p>
      <p
        className="text-sm font-semibold mt-1 text-foreground truncate"
        style={mono ? monoFont : undefined}
      >
        {value}
      </p>
    </div>
  );
}

function ActionBtn({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      className="h-9 text-xs gap-1.5 font-normal"
    >
      {icon}
      {label}
    </Button>
  );
}
