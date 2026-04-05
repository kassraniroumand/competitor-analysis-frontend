import { useNavigate } from "react-router-dom";
import { Users, CheckCircle2, AlertTriangle, Eye, Calendar, Tag, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ScoreBadge } from "@/components/shared/ScoreBadge";
import type { IdeaReport } from "@/data/mock-data";

interface IdeaCardProps {
  report: IdeaReport;
  onQuickView?: (report: IdeaReport) => void;
}

export function IdeaCard({ report, onQuickView }: IdeaCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="group relative overflow-hidden transition-all duration-200 hover:shadow-md hover:border-primary/20 flex flex-col">
      {/* Score accent bar */}
      {report.status === "completed" && (
        <div
          className={`absolute top-0 left-0 right-0 h-1 ${
            report.opportunityScore >= 75
              ? "gradient-score-high"
              : report.opportunityScore >= 50
              ? "gradient-score-moderate"
              : "gradient-score-low"
          }`}
        />
      )}

      <CardHeader
        className="p-5 pb-0 cursor-pointer space-y-3"
        onClick={() => onQuickView?.(report)}
      >
        <div className="flex items-center justify-between">
          <StatusBadge status={report.status} />
          {report.status === "completed" && (
            <ScoreBadge score={report.opportunityScore} />
          )}
        </div>
        <div className="space-y-1.5">
          <h3 className="font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {report.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {report.description}
          </p>
        </div>
      </CardHeader>

      <CardContent
        className="p-5 pt-3 flex-1 space-y-3 cursor-pointer"
        onClick={() => onQuickView?.(report)}
      >
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Tag className="h-3 w-3" />
            {report.category}
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {report.createdAt}
          </span>
        </div>

        {report.keywords && report.keywords.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {report.keywords.slice(0, 4).map((kw) => (
              <Badge
                key={kw}
                variant="secondary"
                className="text-[11px] font-normal px-2 py-0"
              >
                {kw}
              </Badge>
            ))}
            {report.keywords.length > 4 && (
              <span className="text-[11px] text-muted-foreground self-center">
                +{report.keywords.length - 4}
              </span>
            )}
          </div>
        )}
      </CardContent>

      <Separator />
      <CardFooter className="p-0">
        <div className="grid grid-cols-5 w-full">
          <Button
            variant="ghost"
            size="sm"
            className="rounded-none text-xs text-muted-foreground hover:text-primary hover:bg-accent h-10 gap-1.5"
            onClick={() => navigate(`/ideas/${report.id}`)}
          >
            <FileText className="h-3.5 w-3.5" />
            <span className="hidden xl:inline">Details</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="rounded-none text-xs text-muted-foreground hover:text-primary hover:bg-accent h-10 gap-1.5 border-l"
            onClick={() => onQuickView?.(report)}
          >
            <Eye className="h-3.5 w-3.5" />
            <span className="hidden xl:inline">Preview</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="rounded-none text-xs text-muted-foreground hover:text-primary hover:bg-accent h-10 gap-1.5 border-l"
            onClick={() => navigate(`/competitors?idea=${report.id}`)}
          >
            <Users className="h-3.5 w-3.5" />
            <span className="hidden xl:inline">Competitors</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="rounded-none text-xs text-muted-foreground hover:text-primary hover:bg-accent h-10 gap-1.5 border-l"
            onClick={() => navigate(`/validation?idea=${report.id}`)}
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span className="hidden xl:inline">Validation</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="rounded-none text-xs text-muted-foreground hover:text-primary hover:bg-accent h-10 gap-1.5 border-l"
            onClick={() => navigate(`/pain-points?idea=${report.id}`)}
          >
            <AlertTriangle className="h-3.5 w-3.5" />
            <span className="hidden xl:inline">Pains</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
