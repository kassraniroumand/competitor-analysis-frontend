import { useNavigate } from "react-router-dom";
import { Globe, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Competitor } from "@/data/mock-data";

interface CompetitorCardProps {
  competitor: Competitor;
}

export function CompetitorCard({ competitor: comp }: CompetitorCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="hover:shadow-md transition-all">
      <CardContent className="p-5 space-y-4">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted text-xl shrink-0">
            {comp.logo}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-foreground text-base">{comp.name}</h3>
              <Badge variant={comp.type === 'direct' ? 'default' : 'secondary'} className="text-[10px] uppercase tracking-wider">
                {comp.type}
              </Badge>
            </div>
            <a href={comp.website} className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 mt-0.5">
              <Globe className="h-3 w-3" /> {comp.website.replace('https://', '')}
            </a>
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">{comp.description}</p>

        {/* Strengths & Weaknesses side by side */}
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <p className="font-semibold text-foreground mb-1.5 uppercase tracking-wider text-[10px]">Strengths</p>
            <ul className="space-y-1 text-muted-foreground">
              {comp.strengths.slice(0, 3).map((s) => (
                <li key={s} className="flex items-start gap-1.5">
                  <span className="text-primary mt-0.5 shrink-0">•</span>
                  <span className="line-clamp-1">{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-foreground mb-1.5 uppercase tracking-wider text-[10px]">Weaknesses</p>
            <ul className="space-y-1 text-muted-foreground">
              {comp.weaknesses.slice(0, 3).map((w) => (
                <li key={w} className="flex items-start gap-1.5">
                  <span className="text-destructive mt-0.5 shrink-0">•</span>
                  <span className="line-clamp-1">{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer: Pricing + View Details */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="text-xs">
            <p className="text-muted-foreground uppercase tracking-wider text-[10px] font-medium">Pricing</p>
            <p className="text-foreground font-semibold">{comp.pricingSummary}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="text-xs gap-1.5 h-8"
            onClick={() => navigate(`/competitors/${comp.id}`)}
          >
            View Details
            <ExternalLink className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
