
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import TestSelectionPage from "./pages/TestSelectionPage";
import AnamneseIntroPage from "./pages/AnamneseIntroPage";
import AnamnesePhasesPage from "./pages/AnamnesePhasesPage";
import QuizPage from "./pages/QuizPage";
import QuizPlaceholderPage from "./pages/QuizPlaceholderPage";
import ReportPage from "./pages/ReportPage";
import BurnoutIntroPage from "./pages/BurnoutIntroPage";
import BurnoutPage from "./pages/BurnoutPage";
import BurnoutReportPage from "./pages/BurnoutReportPage";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/register" replace />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/tests" element={<ProtectedRoute><TestSelectionPage /></ProtectedRoute>} />
          <Route path="/anamnese-intro" element={<ProtectedRoute><AnamneseIntroPage /></ProtectedRoute>} />
          <Route path="/anamnese-phases" element={<ProtectedRoute><AnamnesePhasesPage /></ProtectedRoute>} />
          <Route path="/quiz" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
          <Route path="/quiz-phase2" element={<ProtectedRoute><QuizPlaceholderPage /></ProtectedRoute>} />
          <Route path="/quiz-phase3" element={<ProtectedRoute><QuizPlaceholderPage /></ProtectedRoute>} />
          <Route path="/quiz-phase4" element={<ProtectedRoute><QuizPlaceholderPage /></ProtectedRoute>} />
          <Route path="/quiz-phase5" element={<ProtectedRoute><QuizPlaceholderPage /></ProtectedRoute>} />
          <Route path="/report" element={<ProtectedRoute><ReportPage /></ProtectedRoute>} />
          <Route path="/burnout-intro" element={<ProtectedRoute><BurnoutIntroPage /></ProtectedRoute>} />
          <Route path="/burnout" element={<ProtectedRoute><BurnoutPage /></ProtectedRoute>} />
          <Route path="/burnout-report" element={<ProtectedRoute><BurnoutReportPage /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
