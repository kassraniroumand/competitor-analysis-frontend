"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen, CheckCircle, AlertTriangle, Users, FileText, Menu,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Sheet, SheetContent, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet";
import { ScoreGauge } from "@/components/shared/ScoreGauge";
import { cn } from "@/lib/utils";
import type { IdeaReport } from "@/data/mock-data";

interface IdeaDetailSidebarProps {
  idea: IdeaReport;
}

function useNavItems(idea: IdeaReport) {
  const pathname = usePathname();
  return [
    {
      label: "Overview",
      href: `/ideas/${idea.id}`,
      icon: BookOpen,
      isActive: pathname === `/ideas/${idea.id}`,
    },
    {
      label: "Validation",
      href: `/ideas/${idea.id}/validation`,
      icon: CheckCircle,
      isActive: pathname.startsWith(`/ideas/${idea.id}/validation`),
    },
    {
      label: "Pain Points",
      href: `/ideas/${idea.id}/pain-points`,
      icon: AlertTriangle,
      isActive: pathname.startsWith(`/ideas/${idea.id}/pain-points`),
    },
    {
      label: "Competitors",
      href: `/ideas/${idea.id}/competitors`,
      icon: Users,
      isActive: pathname.startsWith(`/ideas/${idea.id}/competitors`),
    },
    {
      label: "Report",
      href: `/ideas/${idea.id}/report`,
      icon: FileText,
      isActive: pathname.startsWith(`/ideas/${idea.id}/report`),
    },
  ];
}

function SidebarBody({
  idea,
  items,
  onNavigate,
}: {
  idea: IdeaReport;
  items: ReturnType<typeof useNavItems>;
  onNavigate?: () => void;
}) {
  return (
    <>
      <div className="p-4 space-y-4">
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
            onClick={onNavigate}
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
    </>
  );
}

export function IdeaDetailSidebar({ idea }: IdeaDetailSidebarProps) {
  const items = useNavItems(idea);

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-border bg-card/40 sticky top-0 self-start h-[calc(100svh-3.5rem)] overflow-y-auto">
      <SidebarBody idea={idea} items={items} />
    </aside>
  );
}

export function IdeaDetailMobileNav({ idea }: IdeaDetailSidebarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const items = useNavItems(idea);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="lg:hidden fixed bottom-5 right-5 z-40 h-12 w-12 rounded-full shadow-lg"
          aria-label="Open idea sections"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-72 sm:max-w-xs overflow-y-auto">
        <SheetTitle className="sr-only">Idea sections</SheetTitle>
        <SidebarBody idea={idea} items={items} onNavigate={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
