import { useNavigate, useParams } from "react-router-dom";
import {
  RotateCcw, Download, Trash2, FileText, Calendar, User, Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AppLayout } from "@/components/layout/AppLayout";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ScoreGauge } from "@/components/shared/ScoreGauge";
import { PRDSectionCard } from "@/components/prd/PRDSectionCard";
import { PRDTableOfContents } from "@/components/prd/PRDTableOfContents";
import { mockReports } from "@/data/mock-data";
import { generatePRDData } from "@/data/prd-data";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function IdeaDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const report = mockReports.find((r) => r.id === id) || mockReports[0];
  const prdSections = generatePRDData(report);

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }}>Ideas</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{report.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Document Header */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-start gap-6">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <FileText className="h-5 w-5 text-primary" />
                  <h1 className="text-xl font-bold text-foreground">{report.title}</h1>
                  <StatusBadge status={report.status} />
                </div>
                <p className="text-sm text-muted-foreground">Product Requirements Document</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Created {report.createdAt}</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Updated {report.updatedAt}</span>
                  <span className="flex items-center gap-1"><User className="h-3 w-3" /> Product Manager (AI)</span>
                </div>
                {report.keywords && (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <Tag className="h-3 w-3 text-muted-foreground" />
                    {report.keywords.map((kw) => (
                      <Badge key={kw} variant="secondary" className="text-xs">{kw}</Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center gap-3 shrink-0">
                <ScoreGauge score={report.opportunityScore} size={120} />
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <RotateCcw className="h-3.5 w-3.5" /> Regenerate
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <Download className="h-3.5 w-3.5" /> Export
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1.5 text-destructive hover:text-destructive">
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table of Contents */}
        <PRDTableOfContents sections={prdSections} />

        <Separator />

        {/* PRD Sections */}
        <div className="space-y-8">
          {prdSections.map((section) => (
            <div key={section.number} id={`section-${section.number}`}>
              <Card>
                <CardContent className="p-6">
                  <PRDSectionCard
                    number={section.number}
                    title={section.title}
                    subsections={section.subsections}
                  />
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
