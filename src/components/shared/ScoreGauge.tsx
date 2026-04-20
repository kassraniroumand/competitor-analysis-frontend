import { cn } from "@/lib/utils";

function getScoreInfo(score: number) {
  if (score >= 75) return { color: 'text-success', strokeColor: 'var(--success)', trackColor: 'var(--muted)', label: 'High Opportunity' };
  if (score >= 50) return { color: 'text-warning', strokeColor: 'var(--warning)', trackColor: 'var(--muted)', label: 'Moderate Opportunity' };
  return { color: 'text-destructive', strokeColor: 'var(--destructive)', trackColor: 'var(--muted)', label: 'Low Opportunity' };
}

export function ScoreGauge({
  score,
  size = 120,
  className,
}: {
  score: number;
  size?: number;
  className?: string;
}) {
  const info = getScoreInfo(score);
  const VB = 100;
  const STROKE = 8;
  const radius = (VB - STROKE) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  return (
    <div className={cn("flex flex-col items-center gap-2 justify-center w-full", className)}>
      <div className="relative aspect-square w-full" style={{ maxWidth: size }}>
        <svg
          className="h-full w-full"
          viewBox={`0 0 ${VB} ${VB}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <g transform={`rotate(-90 ${VB / 2} ${VB / 2})`}>
            <circle
              cx={VB / 2}
              cy={VB / 2}
              r={radius}
              fill="none"
              stroke={info.trackColor}
              strokeWidth={STROKE}
            />
            <circle
              cx={VB / 2}
              cy={VB / 2}
              r={radius}
              fill="none"
              stroke={info.strokeColor}
              strokeWidth={STROKE}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - progress}
              style={{ transition: "stroke-dashoffset 1s ease-out" }}
            />
          </g>
          <text
            x={VB / 2}
            y={VB / 2}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="26"
            fontWeight="700"
            className={info.color}
            fill="currentColor"
          >
            {score}
          </text>
          <text
            x={VB / 2}
            y={VB / 2 + 16}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="9"
            className="fill-muted-foreground"
          >
            / 100
          </text>
        </svg>
      </div>
      <span className={cn("text-sm font-semibold text-center", info.color)}>
        {info.label}
      </span>
    </div>
  );
}
