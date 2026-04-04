import { useNavigate } from "react-router-dom";
import {
  Globe, DollarSign, ExternalLink, ArrowRightLeft,
  Star, BarChart3, Target
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScoreBadge } from "@/components/shared/ScoreBadge";
import { Competitor } from "@/data/mock-data";

interface CompetitorCardProps {
  competitor: Competitor;
}

export function CompetitorCard({ competitor: comp }: CompetitorCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="hover:shadow-lg transition-all group flex flex-col overflow-hidden">
      <CardContent className="p-5 space-y-4 flex-1">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-xl shrink-0">
            {comp.logo}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-foreground text-base">{comp.name}</h3>
              <Badge variant={comp.type === 'direct' ? 'default' : 'secondary'} className="text-[10px] uppercase tracking-wider">
                {comp.type}
              </Badge>
              <ScoreBadge score={comp.relevanceScore} />
            </div>
            <a href={comp.website} className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 mt-0.5">
              <Globe className="h-3 w-3" /> {comp.website}
            </a>
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">{comp.description}</p>

        {/* Pricing + Target + Segment */}
        <div className="grid grid-cols-3 gap-3 text-xs">
          <div>
            <p className="text-muted-foreground font-medium mb-1 flex items-center gap-1">
              <DollarSign className="h-3 w-3" /> Pricing
            </p>
            <p className="text-foreground font-semibold">{comp.pricingSummary}</p>
          </div>
          <div>
            <p className="text-muted-foreground font-medium mb-1 flex items-center gap-1">
              <Target className="h-3 w-3" /> Target
            </p>
            <p className="text-foreground font-semibold">{comp.targetAudience}</p>
          </div>
          <div>
            <p className="text-muted-foreground font-medium mb-1 flex items-center gap-1">
              <BarChart3 className="h-3 w-3" /> Segment
            </p>
            <p className="text-foreground font-semibold">{comp.marketSegment}</p>
          </div>
        </div>

        {/* Features */}
        <div>
          <p className="text-xs text-muted-foreground font-medium mb-1.5">Top Features</p>
          <div className="flex flex-wrap gap-1.5">
            {comp.features.slice(0, 4).map((f) => (
              <Badge key={f} variant="outline" className="text-[10px] font-normal">{f}</Badge>
            ))}
          </div>
        </div>

        {/* Strengths & Weaknesses */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <p className="font-medium mb-1.5 flex items-center gap-1 text-primary">
              <Star className="h-3 w-3" /> Strengths
            </p>
            <ul className="space-y-0.5 text-muted-foreground">
              {comp.strengths.slice(0, 2).map((s) => (
                <li key={s} className="flex items-start gap-1"><span className="text-primary mt-0.5">•</span> {s}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-medium mb-1.5 flex items-center gap-1 text-destructive">
              <Star className="h-3 w-3" /> Weaknesses
            </p>
            <ul className="space-y-0.5 text-muted-foreground">
              {comp.weaknesses.slice(0, 2).map((w) => (
                <li key={w} className="flex items-start gap-1"><span className="text-destructive mt-0.5">•</span> {w}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>

      {/* Card Actions */}
      <div className="grid grid-cols-2 border-t">
        <button
          className="flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-muted-foreground hover:text-primary hover:bg-accent/50 transition-colors border-r"
          onClick={() => navigate(`/competitors/${comp.id}`)}
        >
          <ExternalLink className="h-3.5 w-3.5" /> View Details
        </button>
        <button
          className="flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-muted-foreground hover:text-primary hover:bg-accent/50 transition-colors"
        >
          <ArrowRightLeft className="h-3.5 w-3.5" /> Compare
        </button>
      </div>
    </Card>
  );
}
