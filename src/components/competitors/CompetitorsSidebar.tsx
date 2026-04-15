import { Crown, Layers } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Competitor } from "@/data/mock-data";

interface CompetitorsSidebarProps {
  filtered: Competitor[];
  directCount: number;
  indirectCount: number;
}

export function CompetitorsSidebar({ filtered, directCount, indirectCount }: CompetitorsSidebarProps) {
  const strongest = filtered.length > 0
    ? filtered.reduce((best, c) => c.relevanceScore > best.relevanceScore ? c : best, filtered[0])
    : null;

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-5 space-y-5">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Total Found</p>
            <p className="text-4xl font-extrabold text-foreground">{filtered.length}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Direct / Indirect</p>
            <p className="text-2xl font-bold text-foreground">
              <span className="text-primary">{directCount}</span>
              <span className="text-muted-foreground mx-1">/</span>
              {indirectCount}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Avg Pricing</p>
            <p className="text-2xl font-bold text-foreground">$49<span className="text-sm text-muted-foreground font-normal">/mo</span></p>
          </div>
        </CardContent>
      </Card>

      {strongest && (
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-5 space-y-1">
            <p className="text-[10px] uppercase tracking-widest opacity-70 font-medium flex items-center gap-1">
              <Crown className="h-3 w-3" /> Strongest Player
            </p>
            <p className="text-lg font-bold">{strongest.name}</p>
            <p className="text-xs opacity-80">★ {strongest.relevanceScore} Relevance Score</p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-5 space-y-4">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium flex items-center gap-1.5">
            <Layers className="h-3 w-3" /> Feature Comparison
            <Badge variant="outline" className="text-[9px] ml-auto">Summary</Badge>
          </p>
          <div className="space-y-3">
            <div>
              <p className="text-[10px] text-muted-foreground mb-0.5">Pricing Parity</p>
              <p className="text-lg font-bold text-foreground">82% <span className="text-xs font-normal text-muted-foreground">Similar</span></p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground mb-0.5">Tech Stack Match</p>
              <p className="text-lg font-bold text-foreground">45% <span className="text-xs font-normal text-muted-foreground">Shared</span></p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground mb-0.5">Customer Segment</p>
              <p className="text-sm font-semibold text-foreground">Enterprise Heavy</p>
              <p className="text-[10px] text-muted-foreground">~70% sells to SMB</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
