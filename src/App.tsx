import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import DashboardPage from "./pages/DashboardPage";
import IdeasPage from "./pages/IdeasPage";
import IdeaDetailPage from "./pages/IdeaDetailPage";
import CompetitorsPage from "./pages/CompetitorsPage";
import CompetitorDetailPage from "./pages/CompetitorDetailPage";
import ValidationPage from "./pages/ValidationPage";
import PainPointsPage from "./pages/PainPointsPage";
import ReportPage from "./pages/ReportPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IdeasPage />} />
          <Route path="/ideas/:id" element={<IdeaDetailPage />} />
          <Route path="/ideas/:id/competitors" element={<CompetitorsPage />} />
          <Route path="/competitors" element={<CompetitorsPage />} />
          <Route path="/competitors/:id" element={<CompetitorDetailPage />} />
          <Route path="/validation" element={<ValidationPage />} />
          <Route path="/pain-points" element={<PainPointsPage />} />
          <Route path="/reports/:id" element={<ReportPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
