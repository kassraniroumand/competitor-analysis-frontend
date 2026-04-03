import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Status = 'processing' | 'completed' | 'failed';

const statusStyles: Record<Status, string> = {
  processing: 'bg-info/10 text-info border-info/20',
  completed: 'bg-success/10 text-success border-success/20',
  failed: 'bg-destructive/10 text-destructive border-destructive/20',
};

const statusLabels: Record<Status, string> = {
  processing: 'Processing',
  completed: 'Completed',
  failed: 'Failed',
};

export function StatusBadge({ status }: { status: Status }) {
  return (
    <Badge variant="outline" className={cn("font-medium text-xs", statusStyles[status])}>
      {status === 'processing' && (
        <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-info animate-pulse inline-block" />
      )}
      {statusLabels[status]}
    </Badge>
  );
}
