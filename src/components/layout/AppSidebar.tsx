"use client";

import { LayoutDashboard, Lightbulb, FileText, Settings, ChevronDown } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { usePathname } from "next/navigation";
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
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const workspaceItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Ideas", url: "/ideas", icon: Lightbulb },
];

const accountItems = [
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = usePathname();

  const renderItem = (item: { title: string; url: string; icon: typeof LayoutDashboard }) => {
    const isActive =
      item.url === "/ideas"
        ? pathname === "/ideas" || pathname.startsWith("/ideas/")
        : pathname.startsWith(item.url);
    return (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
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
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{workspaceItems.map(renderItem)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{accountItems.map(renderItem)}</SidebarMenu>
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
