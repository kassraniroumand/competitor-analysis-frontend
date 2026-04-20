import { ReactNode } from "react";

interface EditorialStatTileProps {
  label: string;
  value: ReactNode;
  meta?: ReactNode;
  sub?: ReactNode;
  visual: ReactNode;
}

export function EditorialStatTile({ label, value, meta, sub, visual }: EditorialStatTileProps) {
  return (
    <div className="rounded-2xl border bg-card px-6 pt-5 pb-4 flex flex-col min-h-[180px]">
      <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-medium">
        {label}
      </p>
      <div className="mt-3 flex items-baseline justify-between gap-3">
        <span
          className="text-5xl leading-none text-foreground"
          style={{ fontFamily: '"Cormorant Garamond", "Times New Roman", Georgia, serif', fontWeight: 500 }}
        >
          {value}
        </span>
        {meta && (
          <span className="text-xs text-muted-foreground font-mono whitespace-nowrap">
            {meta}
          </span>
        )}
      </div>
      {sub && (
        <p className="mt-2 text-xs text-muted-foreground font-mono">{sub}</p>
      )}
      <div className="mt-auto pt-4">{visual}</div>
    </div>
  );
}

/* -------- Mini visuals -------- */

export function MiniSparkline({ points, color = "hsl(var(--primary))" }: { points: number[]; color?: string }) {
  const w = 240;
  const h = 36;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const step = w / (points.length - 1);
  const coords = points.map((p, i) => [i * step, h - ((p - min) / range) * h] as const);
  const path = coords.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${path} L${w},${h} L0,${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-9" preserveAspectRatio="none">
      <path d={area} fill={color} fillOpacity="0.12" />
      <path d={path} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MiniBars({ values }: { values: number[] }) {
  const max = Math.max(...values);
  return (
    <div className="flex items-end gap-1 h-9">
      {values.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm bg-foreground/55"
          style={{ height: `${(v / max) * 100}%`, opacity: 0.4 + (v / max) * 0.5 }}
        />
      ))}
    </div>
  );
}

export function MiniDots({ values }: { values: number[] }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  return (
    <div className="relative h-9">
      <div className="absolute left-0 right-0 top-1/2 border-t border-dotted border-foreground/30" />
      <div className="absolute inset-0 flex items-center justify-between">
        {values.map((v, i) => {
          const size = 6 + ((v - min) / range) * 8;
          return (
            <div
              key={i}
              className="rounded-full bg-foreground/70"
              style={{ width: size, height: size, opacity: 0.5 + ((v - min) / range) * 0.4 }}
            />
          );
        })}
      </div>
    </div>
  );
}
