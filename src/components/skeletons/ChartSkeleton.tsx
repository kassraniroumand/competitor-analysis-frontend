import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ChartSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-5 w-40" />
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[200px] w-full rounded-md" />
      </CardContent>
    </Card>
  );
}
