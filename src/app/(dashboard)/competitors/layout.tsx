"use client";

import { Suspense, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AppLayout } from "@/components/layout/AppLayout";
import {
  CompetitorDetailMobileNav,
  CompetitorDetailSidebar,
} from "@/components/layout/CompetitorDetailSidebar";
import { mockCompetitors, mockReports } from "@/data/mock-data";

export default function CompetitorsLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const match = pathname.match(/^\/competitors\/([^/]+)/);
  const competitorId = match?.[1];
  const competitor = competitorId
    ? mockCompetitors.find((c) => c.id === competitorId)
    : undefined;
  const idea = competitor
    ? mockReports.find((r) => r.id === competitor.ideaId)
    : undefined;

  return (
    <AppLayout>
      <div className="flex">
        <Suspense fallback={null}>
          {competitor && (
            <CompetitorDetailSidebar competitor={competitor} idea={idea} />
          )}
        </Suspense>
        <div className="flex-1 min-w-0">{children}</div>
      </div>
      <Suspense fallback={null}>
        {competitor && (
          <CompetitorDetailMobileNav competitor={competitor} idea={idea} />
        )}
      </Suspense>
    </AppLayout>
  );
}
