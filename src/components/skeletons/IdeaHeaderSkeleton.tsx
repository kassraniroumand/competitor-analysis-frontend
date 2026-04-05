import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function IdeaHeaderSkeleton() {
  return (
    <Card className="border-primary/20">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Skeleton className="h-10 w-10 rounded-lg shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-3 w-full max-w-sm" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-16 rounded-full" />
              <Skeleton className="h-4 w-20 rounded-full" />
            </div>
          </div>
          <div className="text-right space-y-1">
            <Skeleton className="h-3 w-16 ml-auto" />
            <Skeleton className="h-6 w-10 ml-auto" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
