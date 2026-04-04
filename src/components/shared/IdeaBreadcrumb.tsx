import { Link, useSearchParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { mockReports } from "@/data/mock-data";

interface IdeaBreadcrumbProps {
  currentPage: string;
}

export function IdeaBreadcrumb({ currentPage }: IdeaBreadcrumbProps) {
  const [searchParams] = useSearchParams();
  const ideaId = searchParams.get("idea");
  const idea = ideaId ? mockReports.find((r) => r.id === ideaId) : null;

  return (
    <nav className="flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap">
      <Link to="/" className="hover:text-foreground transition-colors">
        Dashboard
      </Link>
      <ChevronRight className="h-3.5 w-3.5 shrink-0" />
      <Link to="/ideas" className="hover:text-foreground transition-colors">
        Ideas
      </Link>
      {idea && (
        <>
          <ChevronRight className="h-3.5 w-3.5 shrink-0" />
          <Link
            to={`/ideas/${idea.id}`}
            className="hover:text-foreground transition-colors max-w-[200px] truncate"
          >
            {idea.title}
          </Link>
        </>
      )}
      <ChevronRight className="h-3.5 w-3.5 shrink-0" />
      <span className="text-foreground font-medium">{currentPage}</span>
    </nav>
  );
}
