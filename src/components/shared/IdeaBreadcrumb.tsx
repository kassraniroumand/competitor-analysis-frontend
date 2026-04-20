"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { mockReports } from "@/data/mock-data";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface IdeaBreadcrumbProps {
  currentPage: string;
}

export function IdeaBreadcrumb({ currentPage }: IdeaBreadcrumbProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const pathIdeaId = pathname.match(/^\/ideas\/([^/]+)/)?.[1];
  const ideaId = pathIdeaId || searchParams.get("idea");
  const idea = ideaId ? mockReports.find((r) => r.id === ideaId) : null;

  return (
    <Breadcrumb className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
      <BreadcrumbList className="flex-nowrap whitespace-nowrap">
        <BreadcrumbItem>
          <BreadcrumbLink href="/" onClick={(e) => { e.preventDefault(); router.push("/"); }}>
            Dashboard
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/ideas" onClick={(e) => { e.preventDefault(); router.push("/ideas"); }}>
            Ideas
          </BreadcrumbLink>
        </BreadcrumbItem>
        {idea && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/ideas/${idea.id}`}
                onClick={(e) => { e.preventDefault(); router.push(`/ideas/${idea.id}`); }}
                className="max-w-[200px] truncate"
              >
                {idea.title}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{currentPage}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
