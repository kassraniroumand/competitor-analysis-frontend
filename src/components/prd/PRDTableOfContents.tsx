import type { PRDSection } from "@/data/prd-data";

interface PRDTableOfContentsProps {
  sections: PRDSection[];
}

export function PRDTableOfContents({ sections }: PRDTableOfContentsProps) {
  return (
    <div className="p-4 rounded-lg bg-muted/50 space-y-2">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Table of Contents</p>
      <nav className="space-y-1">
        {sections.map((section) => (
          <a
            key={section.number}
            href={`#section-${section.number}`}
            className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {section.number}. {section.title}
          </a>
        ))}
      </nav>
    </div>
  );
}
