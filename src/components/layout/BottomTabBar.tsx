import { LayoutDashboard, Lightbulb, FileText, Settings } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Ideas", url: "/ideas", icon: Lightbulb },
  { title: "Reports", url: "/reports/1", icon: FileText },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function BottomTabBar() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t bg-card/95 backdrop-blur-sm safe-area-bottom">
      <div className="flex items-center justify-around h-14">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.url);
          return (
            <NavLink
              key={item.title}
              to={item.url}
              className="flex flex-col items-center gap-0.5 px-3 py-1.5 text-muted-foreground transition-colors"
              activeClassName="text-primary"
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.title}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
