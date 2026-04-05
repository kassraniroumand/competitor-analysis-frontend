import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CompetitorCardSkeleton() {
  return (
    <Card className="flex flex-col overflow-hidden">
      <CardContent className="p-5 space-y-4 flex-1">
        <div className="flex items-start gap-3">
          <Skeleton className="h-12 w-12 rounded-xl shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-4 w-14 rounded-full" />
            </div>
            <Skeleton className="h-3 w-36" />
          </div>
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-1.5">
              <Skeleton className="h-3 w-14" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
        <div className="flex gap-1.5">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
          <Skeleton className="h-5 w-18 rounded-full" />
        </div>
      </CardContent>
      <div className="grid grid-cols-2 border-t">
        <div className="flex items-center justify-center h-10">
          <Skeleton className="h-3 w-20" />
        </div>
        <div className="flex items-center justify-center h-10 border-l">
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </Card>
  );
}
