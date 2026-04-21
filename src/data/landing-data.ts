import {
  Lightbulb, Search, BarChart3, Target, Zap,
  TrendingUp, Users, Shield, Star,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import showcaseScreen from "@/assets/showcase-screen.jpg";
import showcaseCompetitors from "@/assets/showcase-competitors.jpg";
import showcaseScoring from "@/assets/showcase-scoring.jpg";
import showcasePainpoints from "@/assets/showcase-painpoints.jpg";
import showcaseReports from "@/assets/showcase-reports.jpg";

export interface ShowcaseItem {
  label: string;
  description: string;
  image: string;
  icon: LucideIcon;
  stat: string;
  statLabel: string;
}

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface MoreFeatureItem {
  title: string;
  description: string;
}

export interface ValuePropItem {
  title: string;
  desc: string;
}

export const showcaseItems: ShowcaseItem[] = [
  { label: "Submit your idea", description: "Describe your startup concept in a few sentences — our AI takes it from there.", image: showcaseScreen, icon: Lightbulb, stat: "30 sec", statLabel: "avg. input time" },
  { label: "AI scans the market", description: "We analyze competitors, search trends, community signals, and pricing data in real time.", image: showcaseCompetitors, icon: Search, stat: "50+", statLabel: "data sources" },
  { label: "Discover pain points", description: "Surface real user complaints, feature requests, and unmet needs from across the web.", image: showcaseScoring, icon: Target, stat: "1,200+", statLabel: "signals analyzed" },
  { label: "Get your score", description: "Receive an opportunity score out of 100, factoring in market size, competition, and timing.", image: showcasePainpoints, icon: BarChart3, stat: "0–100", statLabel: "opportunity score" },
  { label: "Act on insights", description: "Download a full validation report with actionable recommendations and next steps.", image: showcaseReports, icon: Zap, stat: "PDF", statLabel: "exportable report" },
];

export const features: FeatureItem[] = [
  { icon: TrendingUp, title: "Save Weeks of Research", description: "What takes consultants 2–4 weeks, IdeaProbe delivers in under 2 minutes with real data — not guesswork." },
  { icon: Shield, title: "Reduce Startup Risk", description: "Catch fatal flaws before you invest. 70% of startups fail from no market need — validate first." },
  { icon: Users, title: "Built for Teams", description: "Share reports, compare ideas side-by-side, and align your team on data-driven decisions." },
  { icon: BarChart3, title: "Quantified Confidence", description: "Every idea scored across 12 dimensions. No more gut feelings — just clear, comparable metrics." },
  { icon: Zap, title: "Always Up-to-Date", description: "Live data from search trends, communities, and market signals — never based on stale training data." },
  { icon: Star, title: "Investor-Ready Output", description: "Export polished validation reports that prove market demand to investors and stakeholders." },
];

export const testimonials: Testimonial[] = [
  { quote: "IdeaProbe saved us months of research. We validated 5 ideas in a single afternoon and knew exactly which one to pursue.", author: "Sarah K.", role: "Startup Founder", company: "Launchpad" },
  { quote: "Simple, fast, and the competitor analysis alone is worth it. We found gaps nobody else was covering.", author: "Marcus T.", role: "Product Manager", company: "Browserbase" },
  { quote: "IdeaProbe turned our fragmented validation process into a single, reliable system that delivers insights in minutes.", author: "Elena R.", role: "Head of Strategy", company: "Origami" },
  { quote: "I wanted to actually see how the market moves, not read static reports. IdeaProbe felt like the only tool that could handle that.", author: "James L.", role: "CEO & Founder", company: "NovaTech" },
  { quote: "The pain point discovery feature alone justified the switch. We uncovered needs our competitors completely missed.", author: "Priya M.", role: "Growth Lead", company: "ScaleUp" },
];

export const moreFeaturesData: MoreFeatureItem[] = [
  { title: "Deep Market Research", description: "Analyze search demand, keyword trends, and community signals to validate real market need — powered by AI that scans thousands of data points in seconds." },
  { title: "Competitor Intelligence", description: "Map direct and indirect competitors, compare pricing and features, and find your competitive edge with automated landscape analysis." },
  { title: "Pain Point Discovery", description: "Surface real user complaints, feature requests, and unmet needs from forums, reviews, and social media across the web." },
  { title: "Validation Reports", description: "Generate comprehensive, shareable reports with opportunity scores, risk assessments, and actionable next steps for your team." },
];

export const valuePropItems: ValuePropItem[] = [
  { title: "Highest accuracy", desc: "Production-ready insights built on cross-referenced data, with minimal hallucination." },
  { title: "Predictable costs", desc: "Flex compute budget based on task complexity. Pay per report, not per token." },
  { title: "Evidence-based outputs", desc: "Verifiability and provenance for every atomic output." },
  { title: "Trusted", desc: "Trusted by leading startups and enterprises for critical validation decisions." },
];
