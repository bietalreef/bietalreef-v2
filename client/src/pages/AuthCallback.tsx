import { useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function AuthCallback() {
  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Supabase automatically handles the OAuth callback
        // We just need to get the session
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Error getting session:', error);
          window.location.href = '/login?error=auth_failed';
          return;
        }

        if (session) {
          console.log('Session found! Redirecting to home...');
          // Redirect to home
          window.location.href = '/';
        } else {
          console.error('No session found');
          window.location.href = '/login?error=no_session';
        }
      } catch (err) {
        console.error('Callback error:', err);
        window.location.href = '/login?error=callback_failed';
      }
    };

    // Small delay to ensure Supabase processes the callback
    setTimeout(handleCallback, 500);
  }, []);

  return (
    <div 
      className="min-h-screen flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
      }}
    >
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white mx-auto mb-4"></div>
        <p className="text-white text-xl font-medium">جاري تسجيل الدخول...</p>
        <p className="text-white/80 text-sm mt-2">يرجى الانتظار</p>
      </div>
    </div>
  );
}
