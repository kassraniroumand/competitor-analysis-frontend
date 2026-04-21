"use client";

import { Suspense } from "react";
import { useParams } from "next/navigation";
import { PainPointsPageContent } from "@/components/ideas/content/PainPointsContent";

export default function Page() {
  const params = useParams<{ id: string }>();
  return (
    <Suspense fallback={null}>
      <PainPointsPageContent ideaId={params.id} />
    </Suspense>
  );
}
