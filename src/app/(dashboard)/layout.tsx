import type { ReactNode } from "react";
import { StoreProvider } from "@/lib/store/StoreProvider";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <StoreProvider>{children}</StoreProvider>;
}
