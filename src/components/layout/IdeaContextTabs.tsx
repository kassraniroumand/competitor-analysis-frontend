import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Lightbulb, CheckCircle2, AlertTriangle, Users, FileText } from "lucide-react";
import { mockReports } from "@/data/mock-data";
import { cn } from "@/lib/utils";

function getActiveIdeaId(pathname: string, search: string): string | null {
  const ideaMatch = pathname.match(/^\/ideas\/([^/]+)/);
  if (ideaMatch) return ideaMatch[1];
  const reportMatch = pathname.match(/^\/reports\/([^/]+)/);
  if (reportMatch) return reportMatch[1];
  if (pathname.startsWith("/validation") || pathname.startsWith("/pain-points")) {
    const params = new URLSearchParams(search);
    return params.get("idea");
  }
  return null;
}

export function IdeaContextTabs() {
  const location = useLocation();
  const navigate = useNavigate();

  const ideaId = getActiveIdeaId(location.pathname, location.search);
  const idea = useMemo(
    () => (ideaId ? mockReports.find((r) => r.id === ideaId) : null),
    [ideaId]
  );

  if (!idea) return null;

  const tabs = [
    { label: "Overview", icon: Lightbulb, path: `/ideas/${idea.id}` },
    { label: "Validation", icon: CheckCircle2, path: `/validation?idea=${idea.id}` },
    { label: "Pain Points", icon: AlertTriangle, path: `/pain-points?idea=${idea.id}` },
    { label: "Competitors", icon: Users, path: `/ideas/${idea.id}/competitors` },
    { label: "Report", icon: FileText, path: `/reports/${idea.id}` },
  ];

  const isActive = (path: string) => {
    const [pathname, query] = path.split("?");
    if (pathname === `/ideas/${idea.id}`) {
      return location.pathname === pathname;
    }
    if (location.pathname !== pathname) return false;
    if (!query) return true;
    return location.search.includes(query);
  };

  return (
    <div className="border-b bg-background sticky top-0 z-30">
      <div className="px-4 lg:px-6 pt-2">
        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground line-clamp-1">
          {idea.title}
        </p>
      </div>
      <nav className="flex gap-1 px-2 lg:px-4 overflow-x-auto scrollbar-none">
        {tabs.map((tab) => {
          const active = isActive(tab.path);
          return (
            <button
              key={tab.label}
              type="button"
              onClick={() => navigate(tab.path)}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium border-b-2 -mb-px whitespace-nowrap transition-colors",
                active
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              )}
            >
              <tab.icon className="h-3.5 w-3.5" />
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
