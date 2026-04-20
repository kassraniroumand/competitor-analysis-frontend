"use client";

import { CheckCircle, AlertTriangle, Users, FileText } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const navItems = [
  { title: "Validation", icon: CheckCircle, getPath: () => "/validation" },
  { title: "Pain Points", icon: AlertTriangle, getPath: () => "/pain-points" },
  { title: "Competitors", icon: Users, getPath: (id?: string) => (id ? `/ideas/${id}/competitors` : "/competitors") },
  { title: "Report", icon: FileText, getPath: (id?: string) => (id ? `/reports/${id}` : "/reports/1") },
];

function extractIdeaId(pathname: string): string | undefined {
  const ideaMatch = pathname.match(/^\/ideas\/([^/]+)/);
  if (ideaMatch) return ideaMatch[1];
  const reportMatch = pathname.match(/^\/reports\/([^/]+)/);
  if (reportMatch) return reportMatch[1];
  return undefined;
}

export function BottomTabBar() {
  const pathname = usePathname();
  const router = useRouter();

  const ideaId = extractIdeaId(pathname);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t bg-card/95 backdrop-blur-md safe-area-bottom">
      <div className="flex items-center gap-2 px-3 py-3 overflow-x-auto scrollbar-hide">
        {navItems.map((item) => {
          const path = item.getPath(ideaId);
          const isActive = pathname === path || pathname.startsWith(path + "/");
          const Icon = item.icon;
          return (
            <Button
              key={item.title}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => router.push(path)}
              className="h-10 rounded-full px-4 gap-1.5 font-semibold shrink-0 shadow-sm"
            >
              <Icon className="h-4 w-4" />
              <span className="text-xs">{item.title}</span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
}
