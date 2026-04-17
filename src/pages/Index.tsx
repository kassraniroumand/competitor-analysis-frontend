import { useState } from "react";
import ChatGPTComparison from "@/components/landing/ChatGPTComparison";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { MobileMenu } from "@/components/landing/MobileMenu";
import { HeroSection } from "@/components/landing/HeroSection";
import { ValuePropBanner } from "@/components/landing/ValuePropBanner";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { UseCasesShowcase } from "@/components/landing/UseCasesShowcase";
import { MoreFeaturesSection } from "@/components/landing/MoreFeaturesSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { BottomCTA } from "@/components/landing/BottomCTA";
import { LandingFooter } from "@/components/landing/LandingFooter";

export default function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar
        mobileMenuOpen={mobileMenuOpen}
        onMobileMenuToggle={() => setMobileMenuOpen((v) => !v)}
      />
      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <HeroSection />
      <ValuePropBanner />
      <HowItWorksSection />
      <FeaturesSection />
      <UseCasesShowcase />
      <MoreFeaturesSection />
      <ChatGPTComparison />
      <TestimonialsSection />
      <BottomCTA />
      <LandingFooter />
    </div>
  );
}
