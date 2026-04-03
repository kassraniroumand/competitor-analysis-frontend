import { cn } from "@/lib/utils";

function getScoreColor(score: number) {
  if (score >= 75) return { bg: 'bg-success/10', text: 'text-success', label: 'High' };
  if (score >= 50) return { bg: 'bg-warning/10', text: 'text-warning', label: 'Moderate' };
  return { bg: 'bg-destructive/10', text: 'text-destructive', label: 'Low' };
}

export function ScoreBadge({ score, showLabel = false, size = 'sm' }: { score: number; showLabel?: boolean; size?: 'sm' | 'lg' }) {
  const style = getScoreColor(score);
  return (
    <div className={cn("inline-flex items-center gap-1.5 rounded-full font-semibold", style.bg, style.text,
      size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-4 py-1.5 text-sm'
    )}>
      <span>{score}</span>
      {showLabel && <span className="font-normal">/ 100 · {style.label}</span>}
    </div>
  );
}
