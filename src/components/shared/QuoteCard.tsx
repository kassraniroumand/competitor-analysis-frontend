import { cn } from "@/lib/utils";

export function QuoteCard({ quote, className }: { quote: string; className?: string }) {
  return (
    <blockquote className={cn(
      "border-l-2 border-primary/30 pl-4 py-1 text-sm italic text-muted-foreground",
      className
    )}>
      {quote}
    </blockquote>
  );
}
