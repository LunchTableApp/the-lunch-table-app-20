
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  authError: boolean;
  setAuthError: (error: boolean) => void;
}

const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  loading: true, 
  authError: false,
  setAuthError: () => {} 
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Auth initialization error:", error);
          setAuthError(true);
          toast({
            title: "Connection Error",
            description: "Unable to connect to authentication service. Some features may be limited.",
            variant: "destructive"
          });
        }
        
        setUser(session?.user ?? null);
        setLoading(false);
      } catch (err) {
        console.error("Auth initialization failed:", err);
        setAuthError(true);
        setLoading(false);
        toast({
          title: "Connection Error",
          description: "Unable to connect to authentication service. Some features may be limited.",
          variant: "destructive"
        });
      }
    };

    getInitialSession();

    // Set a timeout to stop loading if auth takes too long
    const timeoutId = setTimeout(() => {
      if (loading) {
        console.log("Auth timeout - forcing loading to complete");
        setLoading(false);
        setAuthError(true);
        toast({
          title: "Connection Timeout",
          description: "Authentication is taking too long. You can continue in demo mode.",
          variant: "destructive"
        });
      }
    }, 5000); // 5 second timeout

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
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
    <AuthContext.Provider value={{ user, loading, authError, setAuthError }}>
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
