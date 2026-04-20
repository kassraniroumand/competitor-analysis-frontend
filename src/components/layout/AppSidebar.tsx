import { LayoutDashboard, Lightbulb, FileText, Settings, ChevronDown, CheckCircle2, AlertTriangle, Users, ChevronRight } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { mockReports } from "@/data/mock-data";

const workspaceItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Ideas", url: "/ideas", icon: Lightbulb },
];

const accountItems = [
  { title: "Settings", url: "/settings", icon: Settings },
];

function getActiveIdeaId(pathname: string, search: string): string | null {
  // /ideas/:id..., /reports/:id
  const ideaMatch = pathname.match(/^\/ideas\/([^/]+)/);
  if (ideaMatch) return ideaMatch[1];
  const reportMatch = pathname.match(/^\/reports\/([^/]+)/);
  if (reportMatch) return reportMatch[1];
  // /validation?idea=X, /pain-points?idea=X
  if (pathname.startsWith("/validation") || pathname.startsWith("/pain-points")) {
    const params = new URLSearchParams(search);
    return params.get("idea");
  }
  return null;
}

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const navigate = useNavigate();

  const activeIdeaId = getActiveIdeaId(location.pathname, location.search);
  const activeIdea = useMemo(
    () => mockReports.find((r) => r.id === activeIdeaId) ?? null,
    [activeIdeaId]
  );

  const ideaSubItems = activeIdea
    ? [
        { title: "Overview", icon: Lightbulb, path: `/ideas/${activeIdea.id}` },
        { title: "Validation", icon: CheckCircle2, path: `/validation?idea=${activeIdea.id}` },
        { title: "Pain Points", icon: AlertTriangle, path: `/pain-points?idea=${activeIdea.id}` },
        { title: "Competitors", icon: Users, path: `/ideas/${activeIdea.id}/competitors` },
        { title: "Report", icon: FileText, path: `/reports/${activeIdea.id}` },
      ]
    : [];

  const isSubActive = (path: string) => {
    const [pathname, query] = path.split("?");
    if (location.pathname !== pathname) return false;
    if (!query) return true;
    return location.search.includes(query);
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="p-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shrink-0">
            <Lightbulb className="h-4 w-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="text-base font-bold text-foreground tracking-tight">
              IdeaProbe
            </span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive =
                  item.url === "/ideas"
                    ? location.pathname === "/ideas"
                    : location.pathname.startsWith(item.url);

                // Render Ideas with expandable sub-section when an idea is active
                if (item.url === "/ideas" && activeIdea) {
                  return (
                    <Collapsible key={item.title} defaultOpen className="group/collapsible">
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            tooltip={item.title}
                            className="w-full"
                          >
                            <item.icon className="h-4 w-4 shrink-0" />
                            <span className="flex-1 text-left">{item.title}</span>
                            <ChevronRight className="h-3.5 w-3.5 shrink-0 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton
                                onClick={() => navigate("/ideas")}
                                isActive={location.pathname === "/ideas"}
                                className="cursor-pointer"
                              >
                                <span className="text-muted-foreground">All ideas</span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          </SidebarMenuSub>
                          <div className="mt-1 px-2">
                            <p className="px-2 pb-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground line-clamp-1">
                              {activeIdea.title}
                            </p>
                          </div>
                          <SidebarMenuSub>
                            {ideaSubItems.map((sub) => (
                              <SidebarMenuSubItem key={sub.title}>
                                <SidebarMenuSubButton
                                  onClick={() => navigate(sub.path)}
                                  isActive={isSubActive(sub.path)}
                                  className="cursor-pointer"
                                >
                                  <sub.icon className="h-3.5 w-3.5 shrink-0" />
                                  <span>{sub.title}</span>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                }

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                    >
                      <NavLink
                        to={item.url}
                        end={item.url === "/dashboard"}
                        className="flex items-center gap-3"
                        activeClassName=""
                      >
                        <item.icon className="h-4 w-4 shrink-0" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start gap-2 px-2 h-10">
              <Avatar className="h-7 w-7 shrink-0">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                  JD
                </AvatarFallback>
              </Avatar>
              {!collapsed && (
                <>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-foreground leading-none">Jane Doe</p>
                    <p className="text-[11px] text-muted-foreground">jane@example.com</p>
                  </div>
                  <ChevronDown className="h-3 w-3 text-muted-foreground shrink-0" />
                </>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="start" className="w-48">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
