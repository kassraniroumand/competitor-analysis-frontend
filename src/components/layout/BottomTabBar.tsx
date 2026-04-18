import { CheckCircle, AlertTriangle, Users, FileText } from "lucide-react";
import { useLocation, useNavigate, useParams, matchPath } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Validation", icon: CheckCircle, getPath: () => "/validation" },
  { title: "Pain Points", icon: AlertTriangle, getPath: () => "/pain-points" },
  { title: "Competitors", icon: Users, getPath: (id?: string) => (id ? `/ideas/${id}/competitors` : "/competitors") },
  { title: "Report", icon: FileText, getPath: (id?: string) => (id ? `/reports/${id}` : "/reports/1") },
];

export function BottomTabBar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Try to extract an idea id from common detail routes
  const match =
    matchPath("/ideas/:id/*", location.pathname) ||
    matchPath("/ideas/:id", location.pathname) ||
    matchPath("/reports/:id", location.pathname);
  const ideaId = (match?.params as { id?: string } | undefined)?.id;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t bg-card/95 backdrop-blur-sm safe-area-bottom">
      <div className="grid grid-cols-4 gap-1 px-2 py-2">
        {navItems.map((item) => {
          const path = item.getPath(ideaId);
          const isActive = location.pathname === path || location.pathname.startsWith(path + "/");
          const Icon = item.icon;
          return (
            <button
              key={item.title}
              onClick={() => navigate(path)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 rounded-lg py-2 px-1 transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-semibold">{item.title}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
