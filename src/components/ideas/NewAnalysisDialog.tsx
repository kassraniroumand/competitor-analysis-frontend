import { useState } from "react";
import { Sparkles, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

interface NewAnalysisDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerButton?: boolean;
}

export function NewAnalysisDialog({ open, onOpenChange, triggerButton = true }: NewAnalysisDialogProps) {
  const [ideaText, setIdeaText] = useState("");

  const handleSubmit = () => {
    toast.success("Idea submitted for analysis!", {
      description: ideaText.length > 80 ? ideaText.slice(0, 80) + "…" : ideaText,
    });
    setIdeaText("");
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {triggerButton && (
        <SheetTrigger asChild>
          <Button size="lg" className="gap-2 text-base px-6 shadow-sm">
            <Plus className="h-5 w-5" />
            New Analysis
          </Button>
        </SheetTrigger>
      )}
      <SheetContent side="right" className="w-[66vw] sm:max-w-none p-6 overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="h-5 w-5 text-primary" />
            Analyze a New Idea
          </SheetTitle>
          <SheetDescription>
            Describe your startup idea and we'll generate a comprehensive validation report with competitor analysis.
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-4 py-6">
          <div className="space-y-2">
            <Label htmlFor="idea">Your Idea</Label>
            <Textarea
              id="idea"
              placeholder="Example: AI tool that helps restaurants forecast inventory and reduce food waste"
              className="min-h-[100px] resize-none text-sm"
              value={ideaText}
              onChange={(e) => setIdeaText(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="audience">Target Audience</Label>
              <Input id="audience" placeholder="e.g. Restaurant owners" className="text-sm" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="market">Market / Industry</Label>
              <Input id="market" placeholder="e.g. FoodTech" className="text-sm" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="geography">Geography</Label>
              <Input id="geography" placeholder="e.g. North America" className="text-sm" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="model">Business Model</Label>
              <Input id="model" placeholder="e.g. SaaS subscription" className="text-sm" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="keywords">Keywords</Label>
            <Input id="keywords" placeholder="e.g. AI, inventory, food waste (comma-separated)" className="text-sm" />
          </div>
        </div>
        <SheetFooter className="gap-2 sm:gap-0">
          <SheetClose asChild>
            <Button variant="outline" onClick={() => setIdeaText("")}>
              Cancel
            </Button>
          </SheetClose>
          <Button className="gap-2" disabled={!ideaText.trim()} onClick={handleSubmit}>
            <Sparkles className="h-4 w-4" />
            Analyze Idea
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
