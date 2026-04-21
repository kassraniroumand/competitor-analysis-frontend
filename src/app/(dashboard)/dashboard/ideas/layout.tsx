"use client";

import { Suspense, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AppLayout } from "@/components/layout/AppLayout";
import { IdeaDetailMobileNav, IdeaDetailSidebar } from "@/components/layout/IdeaDetailSidebar";
import { IdeaListMobileNav, IdeaListSidebar } from "@/components/layout/IdeaListSidebar";
import { mockReports } from "@/data/mock-data";

export default function IdeasLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const match = pathname.match(/^\/dashboard\/ideas\/([^/]+)/);
  const ideaId = match?.[1];
  const idea = ideaId ? mockReports.find((r) => r.id === ideaId) : undefined;

  return (
    <AppLayout>
      <div className="flex">
        <Suspense fallback={null}>
          {idea ? <IdeaDetailSidebar idea={idea} /> : <IdeaListSidebar />}
        </Suspense>
        <div className="flex-1 min-w-0">{children}</div>
      </div>
      <Suspense fallback={null}>
        {idea ? <IdeaDetailMobileNav idea={idea} /> : <IdeaListMobileNav />}
      </Suspense>
    </AppLayout>
  );
}
