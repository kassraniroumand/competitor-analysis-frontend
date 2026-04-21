"use client";

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
import {
    useGetCompetitorQuery,
    useGetIdeaQuery,
    useListCompetitorsForIdeaQuery,
    useListIdeasQuery
} from "@/lib/store/endpoints";

export default function Page() {
    // const {data, isLoading} = useListIdeasQuery()
    // console.log(data, isLoading)
    // const {data, isLoading} = useGetIdeaQuery("1");
    // const {data, isLoading } = useListCompetitorsForIdeaQuery("1")

    // const {data, isLoading} = useGetCompetitorQuery("1")
    // console.log(data, isLoading)


  return(
      <div>
          klfdsj
      </div>
  )
}
