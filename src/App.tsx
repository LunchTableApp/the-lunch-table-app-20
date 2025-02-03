import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ProfileMenu } from "./components/ProfileMenu";
import Index from "./pages/Index";
import FoodDetails from "./pages/FoodDetails";
import LoggedEntries from "./pages/LoggedEntries";
import GoalSettings from "./pages/GoalSettings";
import AuthPage from "./pages/Auth";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/auth" element={<AuthPage />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <>
                      <ProfileMenu />
                      <Index />
                    </>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/food-details"
                element={
                  <ProtectedRoute>
                    <>
                      <ProfileMenu />
                      <FoodDetails />
                    </>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/logged-entries"
                element={
                  <ProtectedRoute>
                    <>
                      <ProfileMenu />
                      <LoggedEntries />
                    </>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/goal-settings"
                element={
                  <ProtectedRoute>
                    <>
                      <ProfileMenu />
                      <GoalSettings />
                    </>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;