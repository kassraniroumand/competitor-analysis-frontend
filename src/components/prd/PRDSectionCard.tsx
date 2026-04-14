import { Badge } from "@/components/ui/badge";
import type { PRDSubsection } from "@/data/prd-data";

interface PRDSectionCardProps {
  number: string;
  title: string;
  subsections: PRDSubsection[];
}

export function PRDSectionCard({ number, title, subsections }: PRDSectionCardProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Badge variant="outline" className="text-xs font-mono shrink-0">
          §{number}
        </Badge>
        <h2 className="text-lg font-bold text-foreground">{title}</h2>
      </div>

      <div className="space-y-4 pl-2 border-l-2 border-border ml-3">
        {subsections.map((sub) => (
          <div key={sub.number} className="pl-4 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-muted-foreground">{sub.number}</span>
              <h3 className="text-sm font-semibold text-foreground">{sub.title}</h3>
            </div>

            {sub.content && (
              <p className="text-sm text-muted-foreground leading-relaxed">{sub.content}</p>
            )}

            {sub.items && (
              <ul className="space-y-1.5">
                {sub.items.map((item, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-1.5 shrink-0 h-1.5 w-1.5 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {sub.keyValue && (
              <div className="space-y-2">
                {sub.keyValue.map((kv, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <span className="font-medium text-foreground shrink-0 min-w-[100px]">{kv.key}:</span>
                    <span className="text-muted-foreground">{kv.value}</span>
                  </div>
                ))}
              </div>
            )}

            {sub.highlight && (
              <div className="p-3 rounded-lg bg-accent/50">
                <p className="font-medium text-accent-foreground text-sm">{sub.highlight.label}</p>
                <p className="text-sm text-muted-foreground mt-1">{sub.highlight.text}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
