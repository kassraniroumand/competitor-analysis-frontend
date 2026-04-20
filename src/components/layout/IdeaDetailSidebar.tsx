"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  ArrowLeft, BookOpen, CheckCircle, AlertTriangle, Users, FileText,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScoreGauge } from "@/components/shared/ScoreGauge";
import { cn } from "@/lib/utils";
import type { IdeaReport } from "@/data/mock-data";

interface IdeaDetailSidebarProps {
  idea: IdeaReport;
}

export function IdeaDetailSidebar({ idea }: IdeaDetailSidebarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentIdeaParam = searchParams.get("idea");

  const items = [
    {
      label: "Overview",
      href: `/ideas/${idea.id}`,
      icon: BookOpen,
      isActive: pathname === `/ideas/${idea.id}`,
    },
    {
      label: "Validation",
      href: `/validation?idea=${idea.id}`,
      icon: CheckCircle,
      isActive: pathname === "/validation" && currentIdeaParam === idea.id,
    },
    {
      label: "Pain Points",
      href: `/pain-points?idea=${idea.id}`,
      icon: AlertTriangle,
      isActive: pathname === "/pain-points" && currentIdeaParam === idea.id,
    },
    {
      label: "Competitors",
      href: `/ideas/${idea.id}/competitors`,
      icon: Users,
      isActive: pathname.startsWith(`/ideas/${idea.id}/competitors`),
    },
    {
      label: "Report",
      href: `/reports/${idea.id}`,
      icon: FileText,
      isActive: pathname === `/reports/${idea.id}`,
    },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-border bg-card/40 sticky top-14 self-start h-[calc(100svh-3.5rem)] overflow-y-auto">
      <div className="p-4 space-y-4">
        <Link
          href="/ideas"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Ideas
        </Link>

        <div className="space-y-2">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
            Current Idea
          </p>
          <h2 className="text-sm font-bold text-foreground leading-snug line-clamp-3">
            {idea.title}
          </h2>
          <div className="flex flex-wrap gap-1">
            <Badge variant="outline" className="text-[10px] uppercase tracking-wider">
              {idea.category}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/60 border border-border">
          <ScoreGauge score={idea.opportunityScore} size={52} />
          <div>
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Opportunity
            </p>
            <p className="text-lg font-extrabold text-foreground leading-none">
              {idea.opportunityScore}
              <span className="text-xs font-normal text-muted-foreground">/100</span>
            </p>
          </div>
        </div>
      </div>

      <Separator />

      <nav className="p-3 space-y-0.5">
        <p className="px-2 pb-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
          Sections
        </p>
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex items-center gap-2.5 px-2 py-2 rounded-md text-sm font-medium transition-colors",
              item.isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <item.icon className="h-4 w-4 shrink-0" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
