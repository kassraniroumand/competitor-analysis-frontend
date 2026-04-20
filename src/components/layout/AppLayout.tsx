import { useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { TopBar } from "./TopBar";
import { BottomTabBar } from "./BottomTabBar";
import { IdeaContextTabs } from "./IdeaContextTabs";
import { useIsMobile } from "@/hooks/use-mobile";

function SwipeDetector({ children }: { children: React.ReactNode }) {
  const { setOpenMobile, openMobile } = useSidebar();
  const isMobile = useIsMobile();
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!isMobile) return;
    const touch = e.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  }, [isMobile]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!isMobile || !touchStart.current) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStart.current.x;
    const dy = Math.abs(touch.clientY - touchStart.current.y);
    
    if (!openMobile && touchStart.current.x < 30 && dx > 60 && dy < 100) {
      setOpenMobile(true);
    }
    
    touchStart.current = null;
  }, [isMobile, openMobile, setOpenMobile]);

  return (
    <div
      className="min-h-screen flex w-full"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </div>
  );
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const location = useLocation();
  const hideBottomBar = location.pathname === "/ideas" || location.pathname === "/dashboard/idea";

  return (
    <SidebarProvider>
      <SwipeDetector>
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar />
          <IdeaContextTabs />
          <main className={`flex-1 overflow-auto ${isMobile && !hideBottomBar ? "pb-16" : ""} lg:pb-0`}>
            {children}
          </main>
          {isMobile && !hideBottomBar && <BottomTabBar />}
        </div>
      </SwipeDetector>
    </SidebarProvider>
  );
}
