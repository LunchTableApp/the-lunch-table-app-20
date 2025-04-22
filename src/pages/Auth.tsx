
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { AuthError } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';

const AuthPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, authError } = useAuth();
  const [isOffline, setIsOffline] = useState(false);
  
  useEffect(() => {
    // Check if offline mode is requested
    const params = new URLSearchParams(location.search);
    setIsOffline(params.get('offline') === 'true');
    
    // If user is already logged in, redirect to main page
    if (user) {
      navigate('/');
    }
  }, [user, navigate, location]);

  // Listen for auth state changes to handle errors and success messages
  useEffect(() => {
    const {
      data: {
        subscription
      }
    } = supabase.auth.onAuthStateChange((event, session) => {
      switch (event) {
        case 'SIGNED_OUT':
          toast({
            title: "Signed Out",
            description: "You have been successfully signed out."
          });
          break;
        case 'PASSWORD_RECOVERY':
          toast({
            title: "Password Recovery",
            description: "Check your email for password reset instructions."
          });
          break;
        case 'USER_UPDATED':
          toast({
            title: "Account Updated",
            description: "Your account has been successfully updated."
          });
          break;
        case 'SIGNED_IN':
          toast({
            title: "Welcome back!",
            description: "You have successfully signed in."
          });
          break;
        case 'INITIAL_SESSION':
          // Handle initial session load
          break;
        default:
          // Handle any error events
          if (event.includes('ERROR')) {
            const error = (session as unknown as {
              error: AuthError;
            })?.error;
            const errorMessage = error?.message || "An error occurred during authentication.";
            let description = errorMessage;
            if (errorMessage.includes("Invalid login credentials")) {
              description = "Invalid email or password. Please try again.";
            } else if (errorMessage.includes("Email not confirmed")) {
              description = "Please check your email and click the confirmation link before signing in. If you haven't received the email, you can request a new one by signing up again.";
            } else if (errorMessage.includes("over_email_send_rate_limit")) {
              // Extract the waiting time from the error message if available
              const timeMatch = errorMessage.match(/\d+/);
              const waitTime = timeMatch ? timeMatch[0] : "60";
              description = `Too many attempts. Please wait ${waitTime} seconds before trying again.`;
            }
            toast({
              title: "Authentication Error",
              description: description,
              variant: "destructive"
            });
          }
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

  if (isOffline || authError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-primary">Welcome to LunchTable</h2>
            <p className="mt-2 text-gray-600">
              Unable to connect to the authentication service
            </p>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-8">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  The app is currently unable to connect to the authentication service. This could be due to network issues or the service being temporarily unavailable.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <Button 
              onClick={() => window.location.reload()}
              className="w-full"
            >
              Retry Connection
            </Button>
            <Button 
              onClick={() => navigate('/?demo=true')}
              variant="outline"
              className="w-full"
            >
              Continue in Demo Mode
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-primary">Welcome to LunchTable</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in or create an account to track your food journey
          </p>
        </div>
        <Auth supabaseClient={supabase} appearance={{
        theme: ThemeSupa,
        variables: {
          default: {
            colors: {
              brand: '#4ade80',
              brandAccent: '#22c55e'
            }
          }
        }
      }} providers={[]} theme="light" />
      </div>
    </div>
  );
};

export default AuthPage;
