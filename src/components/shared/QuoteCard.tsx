import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function QuoteCard({ quote, className }: { quote: string; className?: string }) {
  return (
    <Card className={cn("bg-muted/50 border-l-2 border-l-primary/30", className)}>
      <CardContent className="p-3">
        <p className="text-sm italic text-muted-foreground leading-relaxed">"{quote}"</p>
      </CardContent>
    </Card>
  );
}
