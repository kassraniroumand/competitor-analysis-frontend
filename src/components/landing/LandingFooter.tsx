import { Lightbulb } from "lucide-react";
import type { LandingFooterProps } from "./LandingFooter.types";

const productLinks = ["Getting Started", "AI Validation", "Pricing", "Competitor Analysis", "IdeaProbe vs. Manual", "Solutions", "Integrations", "API", "Templates"];
const companyLinks = ["Join our Community", "Academy", "Become an Affiliate", "Partner Network", "Enterprise", "IdeaProbe Studio", "Privacy Policy", "Terms of Service", "Careers", "Contact Us"];
const socialLinks = ["Instagram", "Twitter", "LinkedIn", "YouTube"];

export function LandingFooter(_: LandingFooterProps) {
  return (
    <footer className="border-t border-border bg-secondary">
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
            {productLinks.map((link) => (
              <a key={link} href="#" className="block text-sm text-foreground hover:text-muted-foreground transition-colors">{link}</a>
            ))}
          </div>

          <div className="space-y-4">
            {companyLinks.map((link) => (
              <a key={link} href="#" className="block text-sm text-foreground hover:text-muted-foreground transition-colors">{link}</a>
            ))}
          </div>

          <div className="space-y-4">
            {socialLinks.map((link) => (
              <a key={link} href="#" className="block text-sm text-foreground hover:text-muted-foreground transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
