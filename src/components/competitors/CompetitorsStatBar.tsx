import { Crown, Users, ArrowRightLeft } from "lucide-react";
import { Competitor } from "@/data/mock-data";

interface CompetitorsStatBarProps {
  filtered: Competitor[];
  directCount: number;
  indirectCount: number;
}

export function CompetitorsStatBar({ filtered, directCount, indirectCount }: CompetitorsStatBarProps) {
  const strongest = filtered.length > 0
    ? filtered.reduce((best, c) => c.relevanceScore > best.relevanceScore ? c : best, filtered[0])
    : null;

  return (
    <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
      <StatChip
        icon={<Users className="h-3.5 w-3.5 text-primary" />}
        label="Total"
        value={String(filtered.length)}
      />
      <StatChip
        icon={<ArrowRightLeft className="h-3.5 w-3.5 text-primary" />}
        label="Direct / Indirect"
        value={`${directCount} / ${indirectCount}`}
      />
      {strongest && (
        <StatChip
          icon={<Crown className="h-3.5 w-3.5 text-warning" />}
          label="Top Player"
          value={strongest.name}
        />
      )}
    </div>
  );
}

function StatChip({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border bg-card px-3.5 py-2.5 shrink-0">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
        {icon}
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium leading-none">{label}</p>
        <p className="text-sm font-bold text-foreground mt-0.5">{value}</p>
      </div>
    </div>
  );
}
