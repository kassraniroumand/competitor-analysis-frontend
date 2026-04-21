"use client";

import { CheckCircle, AlertTriangle, Users } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const navItems = [
  { title: "Validation", icon: CheckCircle, slug: "validation" },
  { title: "Pain Points", icon: AlertTriangle, slug: "pain-points" },
  { title: "Competitors", icon: Users, slug: "competitors" },
];

function extractIdeaId(pathname: string): string | undefined {
  const ideaMatch = pathname.match(/^\/ideas\/([^/]+)/);
  return ideaMatch?.[1];
}

export function BottomTabBar() {
  const pathname = usePathname();
  const router = useRouter();

  const ideaId = extractIdeaId(pathname);
  if (!ideaId) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t bg-card/95 backdrop-blur-md safe-area-bottom">
      <div className="flex items-center gap-2 px-3 py-3 overflow-x-auto scrollbar-hide">
        {navItems.map((item) => {
          const path = `/ideas/${ideaId}/${item.slug}`;
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
