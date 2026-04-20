import { useNavigate } from "react-router-dom";
import { Users, CheckCircle2, AlertTriangle, Calendar, Tag, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
      <CardHeader
        className="cursor-pointer space-y-3 pb-3"
        onClick={() => onQuickView?.(report)}
      >
        <div className="flex items-center justify-between">
          <StatusBadge status={report.status} />
          {report.status === "completed" && (
            <ScoreBadge score={report.opportunityScore} />
          )}
        </div>
        <div className="space-y-1.5">
          <CardTitle className="text-base leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {report.title}
          </CardTitle>
          <CardDescription className="line-clamp-2 leading-relaxed">
            {report.description}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent
        className="flex-1 space-y-3 cursor-pointer pt-0"
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

      <CardFooter className="px-4 pb-4 pt-3 border-t bg-muted/30">
        <div className="grid grid-cols-2 gap-2.5 w-full">
          {[
            { label: "Validation", icon: CheckCircle2, path: `/validation?idea=${report.id}`, color: "bg-emerald-500 hover:bg-emerald-600 border-emerald-700" },
            { label: "Pain Points", icon: AlertTriangle, path: `/pain-points?idea=${report.id}`, color: "bg-rose-500 hover:bg-rose-600 border-rose-700" },
            { label: "Competitors", icon: Users, path: `/ideas/${report.id}/competitors`, color: "bg-blue-500 hover:bg-blue-600 border-blue-700" },
            { label: "Report", icon: FileText, path: `/reports/${report.id}`, color: "bg-violet-500 hover:bg-violet-600 border-violet-700" },
          ].map((action) => (
            <button
              key={action.label}
              type="button"
              onClick={() => navigate(action.path)}
              className={`${action.color} text-white inline-flex items-center justify-center gap-2 h-11 px-3 rounded-lg text-xs font-bold uppercase tracking-wide border-b-4 shadow-md hover:shadow-lg active:translate-y-0.5 active:border-b-2 transition-all`}
            >
              <action.icon className="h-4 w-4" />
              {action.label}
            </button>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
