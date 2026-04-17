import type { LucideIcon } from "lucide-react";

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
