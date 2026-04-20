"use client";

import { useParams } from "next/navigation";
import { ReportPageContent } from "@/components/ideas/content/ReportContent";

export default function Page() {
  const params = useParams<{ id: string }>();
  return <ReportPageContent ideaId={params.id} />;
}
