import { useRef, useCallback } from "react";
import { TopBar } from "./TopBar";
import { BottomTabBar } from "./BottomTabBar";
import { useIsMobile } from "@/hooks/use-mobile";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col w-full">
      <TopBar />
      <main className="flex-1 overflow-auto pb-16 lg:pb-0">
        {children}
      </main>
      {isMobile && <BottomTabBar />}
    </div>
  );
}
