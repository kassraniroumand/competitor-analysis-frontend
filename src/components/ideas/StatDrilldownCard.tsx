import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DrilldownDetail {
  label: string;
  value: string;
  progress?: number;
}

interface StatDrilldownCardProps {
  label: string;
  value: string;
  icon: React.ElementType;
  details: DrilldownDetail[];
  summary: string;
}

export function StatDrilldownCard({ label, value, icon: Icon, details, summary }: StatDrilldownCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card
        className="group cursor-pointer transition-all duration-200 hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5 active:translate-y-0"
        onClick={() => setOpen(true)}
      >
        <CardContent className="p-4 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent shrink-0 transition-colors group-hover:bg-primary/10">
            <Icon className="h-4 w-4 text-accent-foreground transition-colors group-hover:text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">{label}</p>
            <p className="text-sm font-semibold text-foreground truncate">{value}</p>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground/40 shrink-0 transition-all group-hover:text-primary group-hover:translate-x-0.5" />
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-base">{label}</DialogTitle>
                <Badge variant="secondary" className="mt-1 text-xs">{value}</Badge>
              </div>
            </div>
          </DialogHeader>

          <p className="text-sm text-muted-foreground leading-relaxed">{summary}</p>

          <div className="space-y-3 mt-2">
            {details.map((detail) => (
              <div key={detail.label} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-foreground">{detail.label}</span>
                  <span className="text-xs text-muted-foreground">{detail.value}</span>
                </div>
                {detail.progress !== undefined && (
                  <Progress value={detail.progress} className="h-1.5" />
                )}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
