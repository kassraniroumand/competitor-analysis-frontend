import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function getScoreVariant(score: number): "success" | "warning" | "destructive" {
  if (score >= 75) return "success";
  if (score >= 50) return "warning";
  return "destructive";
}

function getScoreLabel(score: number) {
  if (score >= 75) return "High";
  if (score >= 50) return "Moderate";
  return "Low";
}

export function ScoreBadge({ score, showLabel = false, size = "sm" }: { score: number; showLabel?: boolean; size?: "sm" | "lg" }) {
  const variant = getScoreVariant(score);
  return (
    <Badge
      variant={variant}
      className={cn(
        "font-semibold",
        size === "lg" && "px-4 py-1.5 text-sm"
      )}
    >
      <span>{score}</span>
      {showLabel && <span className="font-normal ml-1">/ 100 · {getScoreLabel(score)}</span>}
    </Badge>
  );
}
