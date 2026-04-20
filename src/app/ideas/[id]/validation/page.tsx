"use client";

import { Suspense } from "react";
import { useParams } from "next/navigation";
import { ValidationPageContent } from "@/components/ideas/content/ValidationContent";

export default function Page() {
  const params = useParams<{ id: string }>();
  return (
    <Suspense fallback={null}>
      <ValidationPageContent ideaId={params.id} />
    </Suspense>
  );
}
