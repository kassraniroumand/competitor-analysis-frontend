import { useNavigate, useSearchParams } from "react-router-dom";
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
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const ideaId = searchParams.get("idea");
  const idea = ideaId ? mockReports.find((r) => r.id === ideaId) : null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
            Dashboard
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/ideas" onClick={(e) => { e.preventDefault(); navigate("/ideas"); }}>
            Ideas
          </BreadcrumbLink>
        </BreadcrumbItem>
        {idea && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/ideas/${idea.id}`}
                onClick={(e) => { e.preventDefault(); navigate(`/ideas/${idea.id}`); }}
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
