import { CheckCircle, AlertTriangle, Users, FileText } from "lucide-react";
import { useLocation, useNavigate, matchPath } from "react-router-dom";
import { Button } from "@/components/ui/button";

const navItems = [
  { title: "Validation", icon: CheckCircle, getPath: () => "/validation" },
  { title: "Pain Points", icon: AlertTriangle, getPath: () => "/pain-points" },
  { title: "Competitors", icon: Users, getPath: (id?: string) => (id ? `/ideas/${id}/competitors` : "/competitors") },
  { title: "Report", icon: FileText, getPath: (id?: string) => (id ? `/reports/${id}` : "/reports/1") },
];

export function BottomTabBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const match =
    matchPath("/ideas/:id/*", location.pathname) ||
    matchPath("/ideas/:id", location.pathname) ||
    matchPath("/reports/:id", location.pathname);
  const ideaId = (match?.params as { id?: string } | undefined)?.id;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t bg-card/95 backdrop-blur-md safe-area-bottom">
      <div className="flex items-center gap-2 px-3 py-3 overflow-x-auto scrollbar-hide">
        {navItems.map((item) => {
          const path = item.getPath(ideaId);
          const isActive = location.pathname === path || location.pathname.startsWith(path + "/");
          const Icon = item.icon;
          return (
            <Button
              key={item.title}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => navigate(path)}
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
