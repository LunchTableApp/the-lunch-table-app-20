
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  authError: boolean;
  setAuthError: (error: boolean) => void;
  demoMode: boolean;
}

const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  loading: true, 
  authError: false,
  setAuthError: () => {},
  demoMode: false
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if demo mode is requested in URL
    const urlParams = new URLSearchParams(window.location.search);
    const isRequestedDemo = urlParams.get('demo') === 'true';
    
    if (isRequestedDemo) {
      console.log("Demo mode requested via URL, enabling demo mode");
      setDemoMode(true);
      setLoading(false);
      return;
    }
    
    // Get initial session
    const getInitialSession = async () => {
      try {
        console.log("Attempting to get initial auth session...");
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Auth initialization error:", error);
          setAuthError(true);
          setDemoMode(true); // Auto-enable demo mode on auth error
          toast({
            title: "Connection Error",
            description: "Unable to connect to authentication service. Demo mode enabled.",
            variant: "destructive"
          });
          setLoading(false);
          return;
        }
        
        setUser(session?.user ?? null);
        setLoading(false);
      } catch (err) {
        console.error("Auth initialization failed:", err);
        setAuthError(true);
        setDemoMode(true); // Auto-enable demo mode on auth error
        setLoading(false);
        toast({
          title: "Connection Error",
          description: "Unable to connect to authentication service. Demo mode enabled.",
          variant: "destructive"
        });
      }
    };

    getInitialSession();

    // Set a shorter timeout to stop loading if auth takes too long
    const timeoutId = setTimeout(() => {
      if (loading) {
        console.log("Auth timeout - forcing loading to complete");
        setLoading(false);
        setAuthError(true);
        setDemoMode(true); // Auto-enable demo mode on timeout
      }
    }, 3000); // 3 seconds timeout for faster fallback

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event);
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        setUser(session?.user ?? null);
        setAuthError(false);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      } else if (event === 'USER_UPDATED') {
        setUser(session?.user ?? null);
      }
      
      setLoading(false);
      clearTimeout(timeoutId); // Clear timeout on successful auth event
    });

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeoutId);
    };
  }, [toast]);

  return (
    <AuthContext.Provider value={{ user, loading, authError, setAuthError, demoMode }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
