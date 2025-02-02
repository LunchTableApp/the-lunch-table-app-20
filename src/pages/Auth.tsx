import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const AuthPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // If user is already logged in, redirect to main page
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  // Listen for auth state changes to handle errors
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      switch (event) {
        case 'SIGNED_OUT':
          toast({
            title: "Signed Out",
            description: "You have been successfully signed out.",
          });
          break;
        case 'PASSWORD_RECOVERY':
          toast({
            title: "Password Recovery",
            description: "Check your email for password reset instructions.",
          });
          break;
        case 'USER_UPDATED':
          toast({
            title: "Account Updated",
            description: "Your account has been successfully updated.",
          });
          break;
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome to Food Tracker
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in or create an account to track your food journey
          </p>
        </div>
        <Auth
          supabaseClient={supabase}
          appearance={{ 
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#000000',
                  brandAccent: '#333333',
                }
              }
            }
          }}
          providers={[]}
          theme="light"
        />
      </div>
    </div>
  );
};

export default AuthPage;