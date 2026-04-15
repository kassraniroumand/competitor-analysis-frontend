import { useState, useRef, useCallback, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import {
  Lightbulb, Play, ArrowRight, Search, BarChart3, Target,
  TrendingUp, Users, Zap, Shield, Star, CheckCircle2,
  ChevronRight, Sparkles, Check, Menu, X, Minus, Plus,
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import HeroCanvas from "@/components/HeroCanvas";
import ChatGPTComparison from "@/components/landing/ChatGPTComparison";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Pagination } from "swiper/modules";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/free-mode";
// @ts-ignore
import "swiper/css/navigation";
// @ts-ignore
import "swiper/css/pagination";
import showcaseScreen from "@/assets/showcase-screen.jpg";
import showcaseCompetitors from "@/assets/showcase-competitors.jpg";
import showcaseScoring from "@/assets/showcase-scoring.jpg";
import showcasePainpoints from "@/assets/showcase-painpoints.jpg";
import showcaseReports from "@/assets/showcase-reports.jpg";

const showcaseItems = [
  { label: "Submit your idea", description: "Describe your startup concept in a few sentences — our AI takes it from there.", image: showcaseScreen },
  { label: "AI scans the market", description: "We analyze competitors, search trends, community signals, and pricing data in real time.", image: showcaseCompetitors },
  { label: "Discover pain points", description: "Surface real user complaints, feature requests, and unmet needs from across the web.", image: showcaseScoring },
  { label: "Get your score", description: "Receive an opportunity score out of 100, factoring in market size, competition, and timing.", image: showcasePainpoints },
  { label: "Act on insights", description: "Download a full validation report with actionable recommendations and next steps.", image: showcaseReports },
];

const features = [
  {
    icon: TrendingUp,
    title: "Save Weeks of Research",
    description:
      "What takes consultants 2–4 weeks, IdeaProbe delivers in under 2 minutes with real data — not guesswork.",
  },
  {
    icon: Shield,
    title: "Reduce Startup Risk",
    description:
      "Catch fatal flaws before you invest. 70% of startups fail from no market need — validate first.",
  },
  {
    icon: Users,
    title: "Built for Teams",
    description:
      "Share reports, compare ideas side-by-side, and align your team on data-driven decisions.",
  },
  {
    icon: BarChart3,
    title: "Quantified Confidence",
    description:
      "Every idea scored across 12 dimensions. No more gut feelings — just clear, comparable metrics.",
  },
  {
    icon: Zap,
    title: "Always Up-to-Date",
    description:
      "Live data from search trends, communities, and market signals — never based on stale training data.",
  },
  {
    icon: Star,
    title: "Investor-Ready Output",
    description:
      "Export polished validation reports that prove market demand to investors and stakeholders.",
  },
];

const testimonials = [
  {
    quote: "IdeaProbe saved us months of research. We validated 5 ideas in a single afternoon and knew exactly which one to pursue.",
    author: "Sarah K.",
    role: "Startup Founder",
    company: "Launchpad",
  },
  {
    quote: "Simple, fast, and the competitor analysis alone is worth it. We found gaps nobody else was covering.",
    author: "Marcus T.",
    role: "Product Manager",
    company: "Browserbase",
  },
  {
    quote: "IdeaProbe turned our fragmented validation process into a single, reliable system that delivers insights in minutes.",
    author: "Elena R.",
    role: "Head of Strategy",
    company: "Origami",
  },
  {
    quote: "I wanted to actually see how the market moves, not read static reports. IdeaProbe felt like the only tool that could handle that.",
    author: "James L.",
    role: "CEO & Founder",
    company: "NovaTech",
  },
  {
    quote: "The pain point discovery feature alone justified the switch. We uncovered needs our competitors completely missed.",
    author: "Priya M.",
    role: "Growth Lead",
    company: "ScaleUp",
  },
];

const moreFeaturesData = [
  {
    title: "Deep Market Research",
    description: "Analyze search demand, keyword trends, and community signals to validate real market need — powered by AI that scans thousands of data points in seconds.",
  },
  {
    title: "Competitor Intelligence",
    description: "Map direct and indirect competitors, compare pricing and features, and find your competitive edge with automated landscape analysis.",
  },
  {
    title: "Pain Point Discovery",
    description: "Surface real user complaints, feature requests, and unmet needs from forums, reviews, and social media across the web.",
  },
  {
    title: "Validation Reports",
    description: "Generate comprehensive, shareable reports with opportunity scores, risk assessments, and actionable next steps for your team.",
  },
];

// More features accordion section
function MoreFeaturesSection() {
  const [openIndex, setOpenIndex] = useState(0);
  const isMobile = useIsMobile();

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
      <div className="overflow-hidden rounded-3xl bg-foreground text-background">
        <div className="grid lg:grid-cols-2">
          {/* Left — Title + Accordion */}
          <div className="flex flex-col justify-center p-8 lg:p-14">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              More features
            </h2>

            <div className="mt-10 space-y-0 divide-y divide-background/10">
              {moreFeaturesData.map((item, i) => {
                const isOpen = openIndex === i;
                return (
                  <button
                    key={item.title}
                    className={cn("w-full text-left py-5 px-4 rounded-xl transition-colors", isOpen && "bg-background")}
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  >
                    <div className="flex items-center gap-3">
                      {isOpen ? (
                        <Minus className="h-4 w-4 shrink-0 text-black" />
                      ) : (
                        <Plus className="h-4 w-4 shrink-0 text-background/60" />
                      )}
                      <span className={cn("text-base font-semibold transition-colors", isOpen ? "text-black" : "text-background/60")}>
                        {item.title}
                      </span>
                    </div>
                    {isMobile ? (
                      isOpen && (
                        <div className="overflow-hidden">
                          <p className="mt-3 pl-7 text-sm leading-relaxed text-black/70">
                            {item.description}
                          </p>
                        </div>
                      )
                    ) : (
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <p className="mt-3 pl-7 text-sm leading-relaxed text-black/70">
                              {item.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right — Dynamic collage based on active tab */}
          <div className="relative overflow-hidden min-h-[300px] lg:min-h-0">
            {isMobile ? (
              /* Mobile: no animation, just swap content instantly */
              <div key={openIndex} className="absolute inset-0 p-6">
                <div className="relative h-full w-full">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 h-32 w-32 blur-3xl" />

                  {openIndex === 0 && (
                    <>
                      <div className="absolute top-4 left-4 rounded-xl bg-background text-foreground p-4 shadow-lg w-48">
                        <p className="text-xs font-medium text-muted-foreground">Search Volume</p>
                        <p className="mt-1 text-2xl font-bold text-primary">12.4K</p>
                        <p className="text-[10px] text-muted-foreground">monthly searches</p>
                      </div>
                      <div className="absolute top-8 right-6 rounded-xl bg-primary text-primary-foreground px-5 py-2.5 shadow-lg text-sm font-semibold">Trending ↑</div>
                      <div className="absolute top-36 right-4 rounded-xl bg-background text-foreground p-4 shadow-lg w-52">
                        <p className="text-xs font-medium text-muted-foreground">Community Signals</p>
                        <div className="mt-2 space-y-1.5">
                          {["Reddit — 340 mentions", "HN — 89 posts", "Twitter — 1.2K tweets"].map((c) => (
                            <div key={c} className="flex items-center gap-2 text-xs"><div className="h-2 w-2 rounded-full bg-primary" /><span>{c}</span></div>
                          ))}
                        </div>
                      </div>
                      <div className="absolute bottom-8 left-8 rounded-xl bg-background text-foreground p-4 shadow-lg">
                        <div className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-primary" /><span className="text-xs font-semibold">+27% growth YoY</span></div>
                      </div>
                    </>
                  )}

                  {openIndex === 1 && (
                    <>
                      <div className="absolute top-4 left-4 rounded-xl bg-background text-foreground p-4 shadow-lg w-52">
                        <p className="text-xs font-medium text-muted-foreground">Competitors found</p>
                        <div className="mt-2 space-y-1.5">
                          {["Acme Corp — $49/mo", "RivalX — $29/mo", "BetaTool — Free"].map((c) => (
                            <div key={c} className="flex items-center gap-2 text-xs"><div className="h-2 w-2 rounded-full bg-primary" /><span>{c}</span></div>
                          ))}
                        </div>
                      </div>
                      <div className="absolute top-8 right-6 rounded-xl bg-primary text-primary-foreground px-5 py-2.5 shadow-lg text-sm font-semibold">3 gaps found</div>
                      <div className="absolute bottom-32 right-8 rounded-xl bg-background text-foreground p-4 shadow-lg w-48">
                        <p className="text-xs font-medium text-muted-foreground">Feature Gap</p>
                        <p className="mt-1 text-sm font-semibold text-primary">API access</p>
                        <p className="text-[10px] text-muted-foreground">No competitor offers this</p>
                      </div>
                      <div className="absolute bottom-8 left-8 rounded-xl bg-background text-foreground p-4 shadow-lg">
                        <div className="flex items-center gap-2"><Users className="h-4 w-4 text-primary" /><span className="text-xs font-semibold">Market map ready</span></div>
                      </div>
                    </>
                  )}

                  {openIndex === 2 && (
                    <>
                      <div className="absolute top-4 left-4 rounded-xl bg-background text-foreground p-4 shadow-lg w-56">
                        <p className="text-xs font-medium text-muted-foreground">Top Pain Points</p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {["Slow onboarding", "High pricing", "Missing API", "Poor UX"].map((p) => (
                            <span key={p} className="rounded-full bg-secondary px-2.5 py-1 text-[10px] font-medium">{p}</span>
                          ))}
                        </div>
                      </div>
                      <div className="absolute top-8 right-6 rounded-xl bg-primary text-primary-foreground px-5 py-2.5 shadow-lg text-sm font-semibold">142 complaints</div>
                      <div className="absolute top-40 right-4 rounded-xl bg-background text-foreground p-4 shadow-lg w-52">
                        <p className="text-xs font-medium text-muted-foreground">User Quote</p>
                        <p className="mt-1 text-xs italic text-foreground/80">"I wish there was a simpler way to get started..."</p>
                        <p className="mt-1 text-[10px] text-muted-foreground">— Reddit user</p>
                      </div>
                      <div className="absolute bottom-8 left-8 rounded-xl bg-background text-foreground p-4 shadow-lg">
                        <div className="flex items-center gap-2"><Target className="h-4 w-4 text-primary" /><span className="text-xs font-semibold">4 unmet needs</span></div>
                      </div>
                    </>
                  )}

                  {openIndex === 3 && (
                    <>
                      <div className="absolute top-4 left-4 rounded-xl bg-background text-foreground p-4 shadow-lg w-48">
                        <p className="text-xs font-medium text-muted-foreground">Opportunity Score</p>
                        <p className="mt-1 text-2xl font-bold text-primary">87/100</p>
                        <p className="text-[10px] text-muted-foreground">High potential</p>
                      </div>
                      <div className="absolute top-8 right-6 rounded-xl bg-primary text-primary-foreground px-5 py-2.5 shadow-lg text-sm font-semibold">Download PDF</div>
                      <div className="absolute top-36 right-4 rounded-xl bg-background text-foreground p-4 shadow-lg w-52">
                        <p className="text-xs font-medium text-muted-foreground">Report Sections</p>
                        <div className="mt-2 space-y-1.5">
                          {["Executive Summary", "Market Analysis", "Risk Assessment", "Next Steps"].map((c) => (
                            <div key={c} className="flex items-center gap-2 text-xs"><CheckCircle2 className="h-3 w-3 text-primary" /><span>{c}</span></div>
                          ))}
                        </div>
                      </div>
                      <div className="absolute bottom-8 left-8 rounded-xl bg-background text-foreground p-4 shadow-lg">
                        <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /><span className="text-xs font-semibold">Report ready</span></div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              /* Desktop: keep animations */
              <AnimatePresence mode="wait">
                <motion.div
                  key={openIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute inset-0 p-6 lg:p-8"
                >
                  <div className="relative h-full w-full">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 h-32 w-32 blur-3xl" />

                    {openIndex === 0 && (
                      <>
                        <div className="absolute top-4 left-4 rounded-xl bg-background text-foreground p-4 shadow-lg w-48">
                          <p className="text-xs font-medium text-muted-foreground">Search Volume</p>
                          <p className="mt-1 text-2xl font-bold text-primary">12.4K</p>
                          <p className="text-[10px] text-muted-foreground">monthly searches</p>
                        </div>
                        <div className="absolute top-8 right-6 rounded-xl bg-primary text-primary-foreground px-5 py-2.5 shadow-lg text-sm font-semibold">Trending ↑</div>
                        <div className="absolute top-36 right-4 rounded-xl bg-background text-foreground p-4 shadow-lg w-52">
                          <p className="text-xs font-medium text-muted-foreground">Community Signals</p>
                          <div className="mt-2 space-y-1.5">
                            {["Reddit — 340 mentions", "HN — 89 posts", "Twitter — 1.2K tweets"].map((c) => (
                              <div key={c} className="flex items-center gap-2 text-xs"><div className="h-2 w-2 rounded-full bg-primary" /><span>{c}</span></div>
                            ))}
                          </div>
                        </div>
                        <div className="absolute bottom-8 left-8 rounded-xl bg-background text-foreground p-4 shadow-lg">
                          <div className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-primary" /><span className="text-xs font-semibold">+27% growth YoY</span></div>
                        </div>
                      </>
                    )}

                    {openIndex === 1 && (
                      <>
                        <div className="absolute top-4 left-4 rounded-xl bg-background text-foreground p-4 shadow-lg w-52">
                          <p className="text-xs font-medium text-muted-foreground">Competitors found</p>
                          <div className="mt-2 space-y-1.5">
                            {["Acme Corp — $49/mo", "RivalX — $29/mo", "BetaTool — Free"].map((c) => (
                              <div key={c} className="flex items-center gap-2 text-xs"><div className="h-2 w-2 rounded-full bg-primary" /><span>{c}</span></div>
                            ))}
                          </div>
                        </div>
                        <div className="absolute top-8 right-6 rounded-xl bg-primary text-primary-foreground px-5 py-2.5 shadow-lg text-sm font-semibold">3 gaps found</div>
                        <div className="absolute bottom-32 right-8 rounded-xl bg-background text-foreground p-4 shadow-lg w-48">
                          <p className="text-xs font-medium text-muted-foreground">Feature Gap</p>
                          <p className="mt-1 text-sm font-semibold text-primary">API access</p>
                          <p className="text-[10px] text-muted-foreground">No competitor offers this</p>
                        </div>
                        <div className="absolute bottom-8 left-8 rounded-xl bg-background text-foreground p-4 shadow-lg">
                          <div className="flex items-center gap-2"><Users className="h-4 w-4 text-primary" /><span className="text-xs font-semibold">Market map ready</span></div>
                        </div>
                      </>
                    )}

                    {openIndex === 2 && (
                      <>
                        <div className="absolute top-4 left-4 rounded-xl bg-background text-foreground p-4 shadow-lg w-56">
                          <p className="text-xs font-medium text-muted-foreground">Top Pain Points</p>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {["Slow onboarding", "High pricing", "Missing API", "Poor UX"].map((p) => (
                              <span key={p} className="rounded-full bg-secondary px-2.5 py-1 text-[10px] font-medium">{p}</span>
                            ))}
                          </div>
                        </div>
                        <div className="absolute top-8 right-6 rounded-xl bg-primary text-primary-foreground px-5 py-2.5 shadow-lg text-sm font-semibold">142 complaints</div>
                        <div className="absolute top-40 right-4 rounded-xl bg-background text-foreground p-4 shadow-lg w-52">
                          <p className="text-xs font-medium text-muted-foreground">User Quote</p>
                          <p className="mt-1 text-xs italic text-foreground/80">"I wish there was a simpler way to get started..."</p>
                          <p className="mt-1 text-[10px] text-muted-foreground">— Reddit user</p>
                        </div>
                        <div className="absolute bottom-8 left-8 rounded-xl bg-background text-foreground p-4 shadow-lg">
                          <div className="flex items-center gap-2"><Target className="h-4 w-4 text-primary" /><span className="text-xs font-semibold">4 unmet needs</span></div>
                        </div>
                      </>
                    )}

                    {openIndex === 3 && (
                      <>
                        <div className="absolute top-4 left-4 rounded-xl bg-background text-foreground p-4 shadow-lg w-48">
                          <p className="text-xs font-medium text-muted-foreground">Opportunity Score</p>
                          <p className="mt-1 text-2xl font-bold text-primary">87/100</p>
                          <p className="text-[10px] text-muted-foreground">High potential</p>
                        </div>
                        <div className="absolute top-8 right-6 rounded-xl bg-primary text-primary-foreground px-5 py-2.5 shadow-lg text-sm font-semibold">Download PDF</div>
                        <div className="absolute top-36 right-4 rounded-xl bg-background text-foreground p-4 shadow-lg w-52">
                          <p className="text-xs font-medium text-muted-foreground">Report Sections</p>
                          <div className="mt-2 space-y-1.5">
                            {["Executive Summary", "Market Analysis", "Risk Assessment", "Next Steps"].map((c) => (
                              <div key={c} className="flex items-center gap-2 text-xs"><CheckCircle2 className="h-3 w-3 text-primary" /><span>{c}</span></div>
                            ))}
                          </div>
                        </div>
                        <div className="absolute bottom-8 left-8 rounded-xl bg-background text-foreground p-4 shadow-lg">
                          <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /><span className="text-xs font-semibold">Report ready</span></div>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}


function ShowcaseScrollSection({
  activeShowcase,
  setActiveShowcase,
}: {
  activeShowcase: number;
  setActiveShowcase: (i: number) => void;
  isMobile: boolean;
}) {
  const mobileSectionRef = useRef<HTMLDivElement>(null);
  const desktopSectionRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches
  );

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const onChange = () => setIsDesktop(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const section = isDesktop ? desktopSectionRef.current : mobileSectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportH = window.innerHeight;
      const scrollRange = Math.max(sectionHeight - viewportH, 1);
      const scrolled = Math.max(0, -rect.top) / scrollRange;
      const clamped = Math.max(0, Math.min(1, scrolled));
      const stepIndex = Math.min(
        showcaseItems.length - 1,
        Math.floor(clamped * showcaseItems.length)
      );

      setActiveShowcase(stepIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isDesktop, setActiveShowcase]);

  const showcaseCard = (
    <div className="overflow-hidden rounded-2xl bg-secondary p-5 sm:p-6 lg:p-12">
      <div className="flex flex-col gap-5 lg:grid lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-10">
        <div className="relative aspect-[4/3] sm:aspect-video lg:aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
          <AnimatePresence initial={false} mode="wait">
            <motion.img
              key={activeShowcase}
              src={showcaseItems[activeShowcase].image}
              alt={showcaseItems[activeShowcase].label}
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>
        </div>

        <div className="flex flex-col justify-between lg:min-h-[400px]">
          <div className="mb-2 grid grid-cols-5 gap-1.5 lg:hidden">
            {showcaseItems.map((item, i) => (
              <button
                key={item.label}
                onClick={() => setActiveShowcase(i)}
                className={`rounded-full px-0 py-1.5 text-xs font-semibold transition-all ${
                  activeShowcase === i
                    ? "bg-foreground text-background"
                    : "bg-background text-muted-foreground"
                }`}
              >
                0{i + 1}
              </button>
            ))}
          </div>

          <div className="px-0.5 lg:hidden">
            <p className="text-sm font-bold text-foreground">
              {showcaseItems[activeShowcase].label}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {showcaseItems[activeShowcase].description}
            </p>
          </div>

          <div className="hidden space-y-1 lg:block">
            {showcaseItems.map((item, i) => (
              <button
                key={item.label}
                onClick={() => setActiveShowcase(i)}
                className={`block w-full rounded-lg px-4 py-3 text-left transition-all duration-300 ${
                  activeShowcase === i
                    ? "bg-background shadow-sm"
                    : "hover:bg-background/50"
                }`}
              >
                <div className="flex items-baseline gap-3">
                  <span
                    className={`text-xs font-bold tabular-nums transition-colors duration-300 ${
                      activeShowcase === i ? "text-primary" : "text-muted-foreground/40"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <div>
                    <p
                      className={`text-sm font-bold tracking-tight transition-colors duration-300 ${
                        activeShowcase === i ? "text-foreground" : "text-muted-foreground/40"
                      }`}
                    >
                      {item.label}
                    </p>
                    <AnimatePresence initial={false}>
                      {activeShowcase === i && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className="mt-1 overflow-hidden text-xs leading-relaxed text-muted-foreground"
                        >
                          {item.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-4 lg:mt-6">
            <div className="h-0.5 w-full overflow-hidden rounded-full bg-border">
              <motion.div
                className="h-full rounded-full bg-primary"
                animate={{ width: `${((activeShowcase + 1) / showcaseItems.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="mt-3 hidden max-w-md text-sm leading-relaxed text-muted-foreground lg:block">
              Five steps. Under two minutes. From raw idea to validated business opportunity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <section
        ref={mobileSectionRef}
        style={{ height: `${showcaseItems.length * 72}vh` }}
        className="relative lg:hidden"
      >
        <div className="sticky top-16 flex h-[calc(100svh-4rem)] items-center px-6 py-4">
          <div className="w-full">{showcaseCard}</div>
        </div>
      </section>

      <section
        ref={desktopSectionRef}
        style={{ height: `${showcaseItems.length * 100}vh` }}
        className="relative hidden lg:block"
      >
        <div className="sticky top-0 flex h-screen items-center">
          <div className="mx-auto w-full max-w-7xl px-10">
            {showcaseCard}
          </div>
        </div>
      </section>
    </>
  );
}

export default function Index() {
  const navigate = useNavigate();
  const [activeShowcase, setActiveShowcase] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6 lg:px-10">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
              <Lightbulb className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <span className="text-base font-bold tracking-tight text-foreground">
              IdeaProbe
            </span>
          </div>

          {/* Center nav */}
          <nav className="hidden items-center gap-7 md:flex">
            <a href="#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Product
            </a>
            <a href="#use-cases" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Resources
            </a>
            <a href="#use-cases" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Solutions
            </a>
            <a href="#testimonials" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Templates
            </a>
            <button
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => navigate("/pricing")}
            >
              Pricing
            </button>
          </nav>

          {/* Right actions */}
          <div className="hidden items-center gap-3 md:flex">
            <Button
              variant="ghost"
              size="sm"
              className="text-sm font-semibold"
              onClick={() => navigate("/dashboard")}
            >
              Login
            </Button>
            <Button
              size="sm"
              className="rounded-full bg-foreground px-5 text-sm font-medium text-background hover:bg-foreground/90"
              onClick={() => navigate("/ideas")}
            >
              Try for free
            </Button>
          </div>

          {/* Mobile burger */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Full-screen mobile menu — outside header to avoid stacking context */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[60] bg-black/40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={isMobile ? { duration: 0.2, ease: "easeOut" } : { type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 z-[70] flex w-full flex-col bg-background px-6 py-5 md:hidden"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                    <Lightbulb className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <span className="text-lg font-bold tracking-tight text-foreground">IdeaProbe</span>
                </div>
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="mt-10 flex flex-col gap-1">
                <a href="#features" onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted">
                  Features
                </a>
                <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted">
                  Testimonials
                </a>
                <button
                  className="rounded-lg px-3 py-3 text-left text-base font-medium text-foreground transition-colors hover:bg-muted"
                  onClick={() => { setMobileMenuOpen(false); navigate("/pricing"); }}
                >
                  Pricing
                </button>
              </nav>

              <div className="mt-auto flex flex-col gap-3 border-t border-border pt-6 pb-8">
                <Button variant="outline" size="lg" className="w-full text-sm font-medium" onClick={() => { setMobileMenuOpen(false); navigate("/dashboard"); }}>
                  Log in
                </Button>
                <Button size="lg" className="w-full rounded-full text-sm font-medium" onClick={() => { setMobileMenuOpen(false); navigate("/ideas"); }}>
                  Get started for free
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>


      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-16 pb-12 sm:pt-24 sm:pb-16 lg:px-10 lg:pt-32 lg:pb-24">
        {/* Subtle background glow */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-primary/5 blur-[120px]" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          {/* Left — text */}
          <div className="relative z-10">
            <Badge variant="secondary" className="mb-5 rounded-full px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="mr-1.5 h-3 w-3 text-primary" />
              AI-powered idea validation
            </Badge>

            <h1 className="text-[2.25rem] font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem] xl:text-[3.5rem]">
              Validate startup ideas in minutes, not months.
            </h1>

            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
              Deep market research, competitor analysis, and opportunity scoring — all in one AI-powered platform built for founders and product teams.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                className="rounded-full bg-foreground px-8 text-sm font-medium text-background hover:bg-foreground/90"
                onClick={() => navigate("/ideas")}
              >
                Start for free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-6 text-sm font-medium"
                onClick={() => navigate("/ideas")}
              >
                <Play className="mr-2 h-3.5 w-3.5" />
                Watch demo
              </Button>
            </div>

            {/* Social proof */}
            <div className="mt-8 flex items-center gap-3 text-muted-foreground">
              <div className="flex -space-x-2">
                {[
                  "bg-primary", "bg-chart-2", "bg-chart-3", "bg-chart-4"
                ].map((bg, i) => (
                  <div key={i} className={`h-7 w-7 rounded-full border-2 border-background ${bg} flex items-center justify-center`}>
                    <span className="text-[9px] font-bold text-white">{["S", "M", "E", "J"][i]}</span>
                  </div>
                ))}
              </div>
              <div className="text-xs">
                <span className="font-semibold text-foreground">2,400+</span> ideas validated
                <span className="mx-1.5">·</span>
                <span className="inline-flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                  ))}
                </span>
              </div>
            </div>
          </div>

          {/* Right — interactive canvas */}
          <div className="relative lg:-mr-6 xl:-mr-12">
            <HeroCanvas />
          </div>
        </div>
      </section>

      {/* Value prop banner */}
      <section className="border-y border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-10">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-foreground sm:text-xl">
              AI-powered validation purpose-built for startups
            </h2>
            <p className="text-sm text-muted-foreground">
              Powering thousands of validated ideas
            </p>
          </div>
          <Separator className="mb-6 bg-border" />
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {[
              { title: "Highest accuracy", desc: "Production-ready insights built on cross-referenced data, with minimal hallucination." },
              { title: "Predictable costs", desc: "Flex compute budget based on task complexity. Pay per report, not per token." },
              { title: "Evidence-based outputs", desc: "Verifiability and provenance for every atomic output." },
              { title: "Trusted", desc: "Trusted by leading startups and enterprises for critical validation decisions." },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="text-sm font-bold text-foreground">{item.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works — scroll-driven flow */}
      <ShowcaseScrollSection
        activeShowcase={activeShowcase}
        setActiveShowcase={setActiveShowcase}
        isMobile={isMobile}
      />


      {/* Features section — Accordion list */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
          {/* Left — sticky header */}
          <div className="lg:sticky lg:top-28">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Built for serious business.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              IdeaProbe is designed for professional teams. Our platform brings deep market analysis, competitor intelligence, and AI-powered scoring.
            </p>
          </div>

          {/* Right — feature list with dividers */}
          <div className="divide-y divide-border">
            {features.map((feature, idx) => (
              <div key={feature.title} className="group py-7 first:pt-0 last:pb-0">
                <div className="flex items-start gap-5">
                  <span className="mt-0.5 text-xs font-mono font-bold text-muted-foreground/50 tabular-nums">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <feature.icon className="h-4 w-4 text-primary" />
                      </div>
                      <h3 className="text-base font-bold text-foreground">{feature.title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground pl-12">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Templates / Use cases showcase */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-0 lg:py-0">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl max-w-lg">
              Hundreds of insights from real market data
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Choose from AI-powered research across competitors, pain points, and market trends. Or define your own custom analysis to generate tailored validation reports.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button className="usecases-prev flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground">
              <ChevronRight className="h-4 w-4 rotate-180" />
            </button>
            <button className="usecases-next flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Preview cards — horizontal scroll on mobile showing ~1.2 cards */}
        <div className="mt-10 -mx-6 px-6 lg:mx-0 lg:px-0">
          <Swiper
            modules={[FreeMode, Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1.25}
            freeMode={{ enabled: true, momentum: true, momentumRatio: 0.8 }}
            grabCursor={true}
            touchReleaseOnEdges={true}
            navigation={{
              prevEl: ".usecases-prev",
              nextEl: ".usecases-next",
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              1024: {
                slidesPerView: 2,
                freeMode: false,
              },
            }}
            className="use-cases-swiper"
          >
{/* Card 1 */}
            <SwiperSlide>
              <Card className="h-full flex flex-col overflow-hidden">
                <CardHeader className="pb-2">
                  <CardDescription className="text-xs font-medium uppercase tracking-wider">Market Analysis</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-secondary p-4">
                      <p className="text-2xl font-bold text-primary">35%</p>
                      <p className="mt-1 text-xs text-muted-foreground">faster time-to-insight</p>
                    </div>
                    <div className="rounded-lg bg-secondary p-4">
                      <p className="text-2xl font-bold text-primary">5x</p>
                      <p className="mt-1 text-xs text-muted-foreground">more data points covered</p>
                    </div>
                    <div className="rounded-lg bg-secondary p-4">
                      <p className="text-2xl font-bold text-primary">20%</p>
                      <p className="mt-1 text-xs text-muted-foreground">reduction in failed launches</p>
                    </div>
                    <div className="rounded-lg bg-secondary p-4">
                      <p className="text-2xl font-bold text-primary">+12</p>
                      <p className="mt-1 text-xs text-muted-foreground">NPS uplift across teams</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-lg font-bold text-foreground">Real business outcomes, fast.</p>
                </CardFooter>
              </Card>
            </SwiperSlide>

{/* Card 2 */}
            <SwiperSlide>
              <Card className="h-full flex flex-col overflow-hidden">
                <CardHeader className="pb-2">
                  <CardDescription className="text-xs font-medium uppercase tracking-wider">Competitor Intel</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="space-y-3">
                    {["Pricing strategy comparison", "Feature gap analysis", "Market positioning map", "Customer sentiment overview"].map((item) => (
                      <div key={item} className="flex items-center gap-3 rounded-lg bg-secondary px-4 py-3">
                        <Check className="h-4 w-4 text-primary" />
                        <span className="text-sm text-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-lg font-bold text-foreground">Deep competitive landscape.</p>
                </CardFooter>
              </Card>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>


      {/* More Features — Accordion + Collage */}
      <MoreFeaturesSection />

      {/* ChatGPT vs IdeaProbe comparison */}
      <ChatGPTComparison />

      {/* Testimonials — horizontal scroll cards */}
      <section id="testimonials" className="py-20 lg:py-28 max-w-7xl mx-auto">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex items-end justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Hear it from our users
            </h2>
              <div className="hidden items-center gap-2 sm:flex">
                <button className="testimonials-prev flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground">
                  <ChevronRight className="h-4 w-4 rotate-180" />
                </button>
                <button className="testimonials-next flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
          </div>
        </div>

        <div className="mt-10 px-6 lg:px-10">
          <Swiper
            modules={[FreeMode, Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView="auto"
            freeMode={{ enabled: true, momentum: true, momentumRatio: 0.8 }}
            grabCursor={true}
            touchReleaseOnEdges={true}
            navigation={{
              prevEl: ".testimonials-prev",
              nextEl: ".testimonials-next",
            }}
            pagination={{ clickable: true }}
            className="testimonials-swiper"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.author} style={{ width: "320px" }}>
                <div
                  className="flex flex-col justify-between rounded-xl bg-secondary p-6 h-full"
                  style={{ minHeight: "360px" }}
                >
                  <div>
                    <p className="text-sm font-bold text-foreground">{t.company}</p>
                    <p className="mt-auto pt-16 text-sm leading-relaxed text-foreground">
                      "{t.quote}"
                    </p>
                  </div>
                  <div className="mt-8 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">
                      {t.author.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{t.author}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto max-w-7xl px-6 py-24 text-center lg:px-10 lg:py-32">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Great decisions start with{" "}
          <span className="text-primary">real data</span>
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
          Start validating your ideas and getting market insights right away
        </p>
        <Button
          size="lg"
          className="mt-8 rounded-full px-8 text-sm font-medium"
          onClick={() => navigate("/ideas")}
        >
          Get started for free
        </Button>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr_0.8fr]">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
                  <Lightbulb className="h-3.5 w-3.5 text-primary-foreground" />
                </div>
                <span className="text-base font-bold text-foreground">IdeaProbe</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">IdeaProbe Inc.</p>
            </div>

            {/* Product */}
            <div className="space-y-4">
              {["Getting Started", "AI Validation", "Pricing", "Competitor Analysis", "IdeaProbe vs. Manual", "Solutions", "Integrations", "API", "Templates"].map((link) => (
                <a key={link} href="#" className="block text-sm text-foreground hover:text-muted-foreground transition-colors">{link}</a>
              ))}
            </div>

            {/* Company */}
            <div className="space-y-4">
              {["Join our Community", "Academy", "Become an Affiliate", "Partner Network", "Enterprise", "IdeaProbe Studio", "Privacy Policy", "Terms of Service", "Careers", "Contact Us"].map((link) => (
                <a key={link} href="#" className="block text-sm text-foreground hover:text-muted-foreground transition-colors">{link}</a>
              ))}
            </div>

            {/* Social */}
            <div className="space-y-4">
              {["Instagram", "Twitter", "LinkedIn", "YouTube"].map((link) => (
                <a key={link} href="#" className="block text-sm text-foreground hover:text-muted-foreground transition-colors">{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
