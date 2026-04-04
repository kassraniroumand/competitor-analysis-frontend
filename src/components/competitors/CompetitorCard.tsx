import { useNavigate } from "react-router-dom";
import {
  Globe, DollarSign, ExternalLink, ArrowRightLeft,
  Star, BarChart3, Target
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScoreBadge } from "@/components/shared/ScoreBadge";
import { Competitor } from "@/data/mock-data";
// ... keep existing code
      {/* Card Actions */}
      <div className="grid grid-cols-2 border-t">
        <Button
          variant="ghost"
          size="sm"
          className="rounded-none border-r text-xs text-muted-foreground hover:text-primary h-auto py-2.5"
          onClick={() => navigate(`/competitors/${comp.id}`)}
        >
          <ExternalLink className="h-3.5 w-3.5" /> View Details
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="rounded-none text-xs text-muted-foreground hover:text-primary h-auto py-2.5"
        >
          <ArrowRightLeft className="h-3.5 w-3.5" /> Compare
        </Button>
      </div>
    </Card>
  );
}
