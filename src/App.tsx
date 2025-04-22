
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ProfileMenu } from "./components/ProfileMenu";
import Index from "./pages/Index";
import FoodDetails from "./pages/FoodDetails";
import LoggedEntries from "./pages/LoggedEntries";
import GoalSettings from "./pages/GoalSettings";
import Quiz from "./pages/Quiz";
import Chat from "./pages/Chat";
import AuthPage from "./pages/Auth";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      retryDelay: 1000,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading, authError } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-500">Loading application...</p>
        </div>
      </div>
    );
  }

  // If we have an auth error but no user, redirect to a special offline version of the app
  // or to the auth page with a query parameter
  if (authError && !user) {
    return <Navigate to="/auth?offline=true" />;
  }

  if (!user && !authError) {
    return <Navigate to="/auth" />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
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
            <Route
              path="/quiz"
              element={
                <ProtectedRoute>
                  <>
                    <ProfileMenu />
                    <Quiz />
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <>
                    <ProfileMenu />
                    <Chat />
                  </>
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
