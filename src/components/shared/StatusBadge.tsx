import { Badge } from "@/components/ui/badge";

type Status = "processing" | "completed" | "failed";

const statusConfig: Record<Status, { variant: "info" | "success" | "destructive"; label: string }> = {
  processing: { variant: "info", label: "Processing" },
  completed: { variant: "success", label: "Completed" },
  failed: { variant: "destructive", label: "Failed" },
};

export function StatusBadge({ status }: { status: Status }) {
  const config = statusConfig[status];
  return (
    <Badge variant={config.variant} className="text-xs font-medium">
      {status === "processing" && (
        <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current animate-pulse inline-block" />
      )}
      {config.label}
    </Badge>
  );
}
