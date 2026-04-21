"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Lightbulb, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const plans = [
  {
    name: "Free",
    price: { monthly: 0, annual: 0 },
    description: "Includes",
    features: [
      "Unlimited ideas & drafts",
      "200 tokens / month",
      "Basic validation",
      "Basic preset themes",
      "Publish to web",
      "Export to PDF",
      "1 team member",
    ],
    cta: "Try for free",
    variant: "outline" as const,
    popular: false,
  },
  {
    name: "Pro",
    price: { monthly: 15, annual: 12 },
    description: "Everything in Free, and:",
    features: [
      "750 tokens per user / month",
      "Unlimited AI models",
      "Remove IdeaProbe watermark",
      "Shared workspaces",
      "Consolidated billing & admin",
      "Up to 10 team members",
      "Export to PDF and socials",
    ],
    cta: "Get Pro",
    variant: "default" as const,
    popular: false,
  },
  {
    name: "Plus",
    price: { monthly: 30, annual: 24 },
    description: "Everything in Pro, and:",
    features: [
      "1,500 tokens per user / month",
      "Agentic workflows",
      "Advanced AI image models",
      "Save templates to workspace",
      "Custom themes",
      "Export to PPT",
      "Unlimited team members",
    ],
    cta: "Get Plus",
    variant: "outline" as const,
    popular: false,
  },
  {
    name: "Max",
    price: { monthly: 59, annual: 47 },
    description: "Everything in Plus, and:",
    features: [
      "5,000 tokens per user / month",
      "Priority support",
    ],
    cta: "Get Max",
    variant: "default" as const,
    popular: true,
  },
];

const faqs = [
  {
    question: "What are tokens?",
    answer:
      "Tokens are credits used each time you run an AI-powered validation, generate a report, or use advanced analysis features. Different actions consume different amounts of tokens.",
  },
  {
    question: "Are tokens shared within a workspace?",
    answer:
      "Each user in a workspace receives their own token allocation. Workspace admins can monitor usage across all members from the billing dashboard.",
  },
  {
    question: "How can I get more tokens?",
    answer:
      "You can upgrade to a higher plan for more monthly tokens, or purchase additional token packs from your account settings.",
  },
  {
    question: "Do unused tokens expire?",
    answer:
      "Monthly token allocations reset at the start of each billing cycle. Unused tokens do not roll over to the next month.",
  },
  {
    question: "Can I change my plan or cancel at any time?",
    answer:
      "Yes, you can upgrade, downgrade, or cancel your plan at any time. Changes take effect at the start of your next billing cycle.",
  },
  {
    question: "Is there a discount on annual billing?",
    answer:
      "Yes! Paying annually saves you 20% compared to monthly billing across all paid plans.",
  },
  {
    question: "How do I get charged when adding a member to my workspace?",
    answer:
      "Each additional member is charged at your plan's per-user rate. Charges are prorated based on when the member is added during the billing cycle.",
  },
  {
    question: "What AI models does IdeaProbe use?",
    answer:
      "IdeaProbe uses a combination of state-of-the-art language models and proprietary market analysis algorithms to deliver the most accurate validation results.",
  },
];

const trustedLogos = [
  "Accenture",
  "SEPHORA",
  "Adobe",
  "Descript",
  "Meta",
  "Atlassian",
];

export default function Page() {
  const router = useRouter();
  const [annual, setAnnual] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Lightbulb className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground">
              IdeaProbe
            </span>
          </button>

          <nav className="hidden items-center gap-8 md:flex">
            <button
              onClick={() => router.push("/")}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Product
            </button>
            <button
              onClick={() => router.push("/#features")}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </button>
            <span className="text-sm font-medium text-foreground">
              Pricing
            </span>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Button
              variant="ghost"
              size="sm"
              className="text-sm font-medium"
              onClick={() => router.push("/dashboard")}
            >
              Log in
            </Button>
            <Button
              size="sm"
              className="rounded-full px-5 text-sm font-medium"
              onClick={() => router.push("/dashboard/ideas")}
            >
              Try for free
            </Button>
          </div>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

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
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
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
                <button
                  className="rounded-lg px-3 py-3 text-left text-base font-medium text-foreground transition-colors hover:bg-muted"
                  onClick={() => { setMobileMenuOpen(false); router.push("/"); }}
                >
                  Product
                </button>
                <button
                  className="rounded-lg px-3 py-3 text-left text-base font-medium text-foreground transition-colors hover:bg-muted"
                  onClick={() => { setMobileMenuOpen(false); router.push("/#features"); }}
                >
                  Features
                </button>
                <span className="rounded-lg bg-muted px-3 py-3 text-base font-medium text-foreground">
                  Pricing
                </span>
              </nav>

              <div className="mt-auto flex flex-col gap-3 border-t border-border pt-6 pb-8">
                <Button variant="outline" size="lg" className="w-full text-sm font-medium" onClick={() => { setMobileMenuOpen(false); router.push("/dashboard"); }}>
                  Log in
                </Button>
                <Button size="lg" className="w-full rounded-full text-sm font-medium" onClick={() => { setMobileMenuOpen(false); router.push("/dashboard/ideas"); }}>
                  Try for free
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <section className="px-6 pb-16 pt-16 text-center lg:px-10 lg:pt-24">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Pricing
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
          Looking for enterprise pricing?{" "}
          <a
            href="mailto:enterprise@ideaprobe.com"
            className="underline underline-offset-2 hover:text-foreground"
          >
            Email enterprise@ideaprobe.com
          </a>
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <span className="text-sm font-medium text-muted-foreground">
            Pay annually{" "}
            <span className="text-primary">(save 20%)</span>
          </span>
          <button
            onClick={() => setAnnual(!annual)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              annual ? "bg-foreground" : "bg-muted"
            }`}
          >
            <span
              className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform ${
                annual ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="relative flex flex-col rounded-xl border border-border bg-card p-6"
            >
              {plan.popular && (
                <Badge className="absolute right-4 top-4 rounded-md bg-primary text-primary-foreground text-[10px] px-2 py-0.5">
                  Popular
                </Badge>
              )}

              <h3 className="text-base font-bold text-foreground">
                {plan.name}
              </h3>

              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-foreground">
                  ${annual ? plan.price.annual : plan.price.monthly}
                </span>
                <span className="text-sm text-muted-foreground">
                  {plan.price.monthly === 0
                    ? "per month"
                    : "per user / month"}
                </span>
              </div>

              <p className="mt-5 text-xs font-medium text-muted-foreground">
                {plan.description}
              </p>

              <ul className="mt-4 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-foreground" />
                    <span className="text-sm text-foreground">{f}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.variant === "default" ? "default" : "outline"}
                className="mt-8 w-full rounded-lg text-sm font-medium"
                onClick={() => router.push("/dashboard/ideas")}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Need more capabilities for your business?
          </p>
          <a
            href="mailto:enterprise@ideaprobe.com"
            className="text-sm font-medium text-foreground underline underline-offset-2"
          >
            Contact us for a demo
          </a>
        </div>
      </section>

      <section className="border-y border-border bg-secondary px-6 py-14 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs text-muted-foreground">
            Trusted by 5000+ teams for high-stakes validation
          </p>
          <div className="mt-6 grid grid-cols-3 gap-6 sm:grid-cols-6">
            {trustedLogos.map((name) => (
              <div
                key={name}
                className="flex items-center justify-center rounded-lg border border-border bg-card px-4 py-3"
              >
                <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-6 py-20 lg:px-10 lg:py-28">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-sm font-medium text-foreground text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="px-6 pb-24 pt-8 text-center lg:px-10">
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Validate ideas you&apos;re proud of
        </h2>
        <Button
          size="lg"
          className="mt-6 rounded-full px-8 text-sm font-medium"
          onClick={() => router.push("/dashboard/ideas")}
        >
          Try IdeaProbe
        </Button>
      </section>

      <footer className="border-t border-border bg-secondary/50">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr_0.8fr]">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
                  <Lightbulb className="h-3.5 w-3.5 text-primary-foreground" />
                </div>
                <span className="text-base font-bold text-foreground">IdeaProbe</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">IdeaProbe Inc.</p>
            </div>

            <div className="space-y-4">
              {["Getting Started", "AI Validation", "Pricing", "Competitor Analysis", "Solutions", "Integrations", "API", "Templates"].map((link) => (
                <a key={link} href="#" className="block text-sm text-foreground hover:text-muted-foreground transition-colors">{link}</a>
              ))}
            </div>

            <div className="space-y-4">
              {["Join our Community", "Academy", "Become an Affiliate", "Partner Network", "Enterprise", "Privacy Policy", "Terms of Service", "Careers", "Contact Us"].map((link) => (
                <a key={link} href="#" className="block text-sm text-foreground hover:text-muted-foreground transition-colors">{link}</a>
              ))}
            </div>

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
