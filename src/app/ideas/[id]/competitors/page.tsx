"use client";

import { Suspense } from "react";
import { CompetitorsPageContent } from "@/components/ideas/content/CompetitorsContent";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <CompetitorsPageContent />
    </Suspense>
  );
}
