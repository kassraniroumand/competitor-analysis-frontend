import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { BottomCTAProps } from "./BottomCTA.types";

export function BottomCTA({ ctaPath = "/ideas" }: BottomCTAProps) {
  const navigate = useNavigate();
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 text-center lg:px-10 lg:py-32">
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Great decisions start with <span className="text-primary">real data</span>
      </h2>
      <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
        Start validating your ideas and getting market insights right away
      </p>
      <Button size="lg" className="mt-8 rounded-full px-8 text-sm font-medium" onClick={() => navigate(ctaPath)}>
        Get started for free
      </Button>
    </section>
  );
}
