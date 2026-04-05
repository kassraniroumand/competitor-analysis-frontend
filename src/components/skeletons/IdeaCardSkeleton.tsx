import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export function IdeaCardSkeleton() {
  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader className="space-y-3 pb-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-10 rounded-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-3 pt-0">
        <div className="flex items-center gap-3">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-20" />
        </div>
        <div className="flex gap-1.5">
          <Skeleton className="h-5 w-14 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-12 rounded-full" />
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="p-0">
        <div className="grid grid-cols-5 w-full">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={`flex items-center justify-center h-10 ${i > 0 ? "border-l" : ""}`}>
              <Skeleton className="h-3.5 w-3.5 rounded" />
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
