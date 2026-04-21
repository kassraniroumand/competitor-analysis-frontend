"use client";

import { useParams } from "next/navigation";
import {
  Briefcase,
  AlertTriangle, Zap, Lightbulb,
  Shield, Rocket, CheckCircle, MessageSquare, Search,
  HelpCircle,
  Target, BarChart3, Globe, Layers,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { mockReports, painPoints, marketGaps } from "@/data/mock-data";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { IdeaBreadcrumb } from "@/components/shared/IdeaBreadcrumb";

export default function Page() {
  const params = useParams<{ id: string }>();
  const report = mockReports.find((r) => r.id === params.id) || mockReports[0];

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-4 lg:space-y-6">

      <IdeaBreadcrumb currentPage="Validation" />
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-primary" /> Executive Summary
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {report.description}
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          By targeting underserved independent businesses, this solution can capture significant market share before larger players adapt. The combination of AI-driven insights with domain-specific data provides a defensible competitive advantage.
        </p>
      </section>

        <Card>
          <CardContent className="p-5 space-y-4">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" /> Idea Strategic Summary
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Original Idea Text</p>
                <p className="text-sm text-foreground italic leading-relaxed">&quot;{report.description.slice(0, 120)}…&quot;</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Rewritten Positioning</p>
                <p className="text-sm text-foreground leading-relaxed">
                  &quot;An AI-powered co-pilot that transforms raw data into actionable insights in real-time, bridging the gap between manual effort and intelligent automation.&quot;
                </p>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Target Customer</p>
                <p className="text-sm font-semibold text-foreground mt-0.5">{report.targetAudience || "—"}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Problem Solved</p>
                <p className="text-sm text-foreground mt-0.5">High manual overhead and inconsistency in operations across large-scale portfolios.</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Market Category</p>
                <p className="text-sm font-semibold text-foreground mt-0.5">{report.category}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-5 space-y-4">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" /> Strategic Rationale
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Shield className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Competitive Moat</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">First-mover advantage in AI-assisted precision vs. generic competitors.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Zap className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Velocity Escalation</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">Reduction of &quot;time-to-value&quot; by 55% for high-frequency operational workflows.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" /> Market Context
                </h2>
                <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">SaaS Vertical</Badge>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                The target sector shows meaningful year-over-year growth with a persistent
                automation gap among established incumbents, leaving room for a more focused,
                AI-native alternative.
              </p>

              <div className="p-3 rounded-lg bg-muted/50 border border-border">
                <p className="text-xs text-muted-foreground italic leading-relaxed">
                  &quot;The largest gap in current architecture is the lack of semantic intelligence between research and production layers.&quot; — Gartner 2024
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <Card>
          <CardContent className="p-5 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" /> Market Intelligence
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">Real-time competitive landscape and user behavioral analytics.</p>
              </div>
              <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">Global Insights Engine</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                  <Search className="h-3 w-3" /> Search & Trends
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Rising search interest across core keywords suggests growing top-of-funnel demand.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {(report.keywords || ["AI", "automation", "optimization"]).slice(0, 3).map((kw) => (
                    <Badge key={kw} variant="secondary" className="text-xs">#{kw}</Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                  <MessageSquare className="h-3 w-3" /> Social Sentiment
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="h-4 w-4 rounded-full bg-success" />
                  <span className="h-4 w-4 rounded-full bg-success" />
                  <span className="h-4 w-4 rounded-full bg-warning" />
                  <Badge variant="secondary" className="text-[10px] uppercase ml-1">Cross-Platform</Badge>
                </div>
                <p className="text-xs text-muted-foreground italic leading-relaxed">
                  &quot;Growing frustration with manual workflows; users seeking seamless AI-integrated solutions.&quot;
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                  <Layers className="h-3 w-3" /> Tool Landscape
                </p>
                <p className="text-xs font-semibold text-foreground">Incumbent Review Summary</p>
                <div className="flex gap-4">
                  <div>
                    <p className="text-[10px] text-success font-semibold uppercase">Likes</p>
                    <p className="text-xs text-muted-foreground">Fast generation speed</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-destructive font-semibold uppercase">Dislikes</p>
                    <p className="text-xs text-muted-foreground">Generic output quality</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                  <AlertTriangle className="h-3 w-3" /> Key Pain Points
                </p>
                <ul className="space-y-1.5">
                  {painPoints.slice(0, 3).map((pp, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-destructive shrink-0 mt-1.5" />
                      {pp.point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h2 className="text-lg font-bold text-foreground">Minimum Viable Product (MVP)</h2>
                <p className="text-xs text-muted-foreground">Implementation roadmap for initial deployment.</p>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-[10px] uppercase tracking-wider font-semibold">Phase 1: Alpha</Badge>
                <Badge variant="secondary" className="text-[10px] uppercase tracking-wider font-semibold">Est. 6 Weeks</Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                  <CheckCircle className="h-3 w-3 text-primary" /> Core Features
                </p>
                <ul className="space-y-2">
                  {marketGaps.slice(0, 2).map((g, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-foreground">
                      <CheckCircle className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                      {g.gap}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                  <Rocket className="h-3 w-3 text-primary" /> Launch Requirements
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-xs text-foreground">
                    <CheckCircle className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                    API Integration with existing platform sandbox environment.
                  </li>
                  <li className="flex items-start gap-2 text-xs text-foreground">
                    <CheckCircle className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                    Compliance audit for data retention policies.
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 space-y-3">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" /> Most Asked Questions
            </h2>
            <p className="text-xs text-muted-foreground">Common inquiries regarding the integration and workflow.</p>

            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  q: "How does it handle nuances in domain-specific workflows?",
                  a: "The system uses a 'domain-context' injection layer that feeds historical high-performing data and style guides into the AI model, ensuring the output aligns with established operational standards.",
                },
                {
                  q: "What is the fallback mechanism for low-confidence outputs?",
                  a: "If the model's confidence score falls below a set threshold, outputs are flagged for 'Mandatory Manual Review' in the system, and alternative suggestions are provided for the operator to choose from.",
                },
                {
                  q: "Can we customize the processing pipeline per use-case?",
                  a: `Yes. The MVP includes specific templates for different verticals (${report.industry || "various industries"}), allowing for unique configuration limits and operational structures.`,
                },
              ].map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

    </div>
  );
}
