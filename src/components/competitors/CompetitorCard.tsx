import { useNavigate } from "react-router-dom";
import { ArrowUpRight, Bookmark, Target, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Competitor } from "@/data/mock-data";

interface CompetitorCardProps {
  competitor: Competitor;
}

export function CompetitorCard({ competitor: comp }: CompetitorCardProps) {
  const navigate = useNavigate();

  // Mock supplemental data derived from competitor
  const matchPct = comp.relevanceScore;
  const overlapPct = Math.min(95, Math.max(20, comp.relevanceScore - 10 + (comp.id.length * 3) % 25));
  const mau = ["420K", "1.6M", "210K", "85K", "3.2M"][Number(comp.id) % 5] || "120K";
  const trend = ["+18%", "+31%", "−4%", "+8%", "+22%"][Number(comp.id) % 5] || "+12%";
  const trendPositive = !trend.startsWith("−");
  const monoFont = { fontFamily: '"JetBrains Mono", "SF Mono", ui-monospace, monospace' };

  return (
    <div className="rounded-2xl border bg-card p-6 flex flex-col gap-5 hover:shadow-md transition-all">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground text-lg font-semibold shrink-0">
            {comp.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-foreground text-lg leading-tight">{comp.name}</h3>
            <a
              href={comp.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 mt-0.5"
              style={monoFont}
            >
              {comp.website.replace(/^https?:\/\//, "")} <ArrowUpRight className="h-3 w-3" />
            </a>
            <div className="mt-2">
              <span className="inline-block rounded-md bg-accent text-accent-foreground text-[10px] uppercase tracking-[0.18em] font-semibold px-2 py-1">
                {comp.type}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0" style={monoFont}>
          <span className="h-2 w-2 rounded-full bg-primary" />
          {matchPct}% match
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-foreground/80 leading-relaxed line-clamp-2">{comp.description}</p>

      {/* Feature Overlap bar */}
      <div className="border-b border-dashed pb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] uppercase tracking-[0.18em] font-medium text-muted-foreground">
            Feature Overlap
          </span>
          <span className="text-sm font-semibold text-foreground" style={monoFont}>
            {overlapPct}%
          </span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-primary"
            style={{ width: `${overlapPct}%` }}
          />
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 border-b border-dashed pb-4">
        <Stat label="Pricing" value={comp.pricingSummary} mono />
        <Stat label="MAU" value={mau} mono />
        <Stat
          label="90d Trend"
          value={trend}
          mono
          valueClass={trendPositive ? "text-primary" : "text-destructive"}
        />
      </div>

      {/* Actions */}
      <div className="grid grid-cols-4 gap-2">
        <ActionBtn icon={<Bookmark className="h-3.5 w-3.5" />} label="Watch" />
        <ActionBtn icon={<Target className="h-3.5 w-3.5" />} label="Compare" />
        <ActionBtn icon={<Sparkles className="h-3.5 w-3.5" />} label="Brief" />
        <ActionBtn
          icon={<ArrowUpRight className="h-3.5 w-3.5" />}
          label="Visit"
          onClick={() => navigate(`/competitors/${comp.id}`)}
        />
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  mono,
  valueClass = "text-foreground",
}: {
  label: string;
  value: string;
  mono?: boolean;
  valueClass?: string;
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.18em] font-medium text-muted-foreground">
        {label}
      </p>
      <p
        className={`text-base font-semibold mt-1 ${valueClass}`}
        style={mono ? { fontFamily: '"JetBrains Mono", "SF Mono", ui-monospace, monospace' } : undefined}
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
