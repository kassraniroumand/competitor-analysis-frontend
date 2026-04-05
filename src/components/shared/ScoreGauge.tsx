import { cn } from "@/lib/utils";

function getScoreInfo(score: number) {
  if (score >= 75) return { color: 'text-success', strokeColor: 'hsl(var(--success))', trackColor: 'hsl(var(--muted))', label: 'High Opportunity' };
  if (score >= 50) return { color: 'text-warning', strokeColor: 'hsl(var(--warning))', trackColor: 'hsl(var(--muted))', label: 'Moderate Opportunity' };
  return { color: 'text-destructive', strokeColor: 'hsl(var(--destructive))', trackColor: 'hsl(var(--muted))', label: 'Low Opportunity' };
}

export function ScoreGauge({ score, size = 120 }: { score: number; size?: number }) {
  const info = getScoreInfo(score);
  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={info.trackColor}
            strokeWidth="8"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={info.strokeColor}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            style={{ transition: 'stroke-dashoffset 1s ease-out' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("text-3xl font-bold", info.color)}>{score}</span>
          <span className="text-[10px] text-muted-foreground font-medium">/ 100</span>
        </div>
      </div>
      <span className={cn("text-sm font-semibold", info.color)}>{info.label}</span>
    </div>
  );
}
