"use client";

import { useRouter } from "next/navigation";
import { Lightbulb, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LandingNavbarProps } from "./LandingNavbar.types";

export function LandingNavbar({ mobileMenuOpen, onMobileMenuToggle }: LandingNavbarProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6 lg:px-10">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
            <Lightbulb className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
          <span className="text-base font-bold tracking-tight text-foreground">IdeaProbe</span>
        </div>

        <nav className="hidden items-center gap-7 md:flex">
          <a href="#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Product</a>
          <a href="#use-cases" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Resources</a>
          <a href="#use-cases" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Solutions</a>
          <a href="#testimonials" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Templates</a>
          <button className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" onClick={() => router.push("/pricing")}>Pricing</button>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="sm" className="text-sm font-semibold" onClick={() => router.push("/dashboard")}>Login</Button>
          <Button size="sm" className="rounded-full bg-foreground px-5 text-sm font-medium text-background hover:bg-foreground/90" onClick={() => router.push("/ideas")}>Try for free</Button>
        </div>

        <button className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground md:hidden" onClick={onMobileMenuToggle}>
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
    </header>
  );
}
