"use client";

import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import type { MobileMenuProps } from "./MobileMenu.types";

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const router = useRouter();
  const isMobile = useIsMobile();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-black/40 md:hidden"
            onClick={onClose}
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
              <button className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground" onClick={onClose}>
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="mt-10 flex flex-col gap-1">
              <a href="#features" onClick={onClose} className="rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted">Features</a>
              <a href="#testimonials" onClick={onClose} className="rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted">Testimonials</a>
              <button className="rounded-lg px-3 py-3 text-left text-base font-medium text-foreground transition-colors hover:bg-muted" onClick={() => { onClose(); router.push("/pricing"); }}>Pricing</button>
            </nav>

            <div className="mt-auto flex flex-col gap-3 border-t border-border pt-6 pb-8">
              <Button variant="outline" size="lg" className="w-full text-sm font-medium" onClick={() => { onClose(); router.push("/dashboard"); }}>Log in</Button>
              <Button size="lg" className="w-full rounded-full text-sm font-medium" onClick={() => { onClose(); router.push("/dashboard/ideas"); }}>Get started for free</Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
