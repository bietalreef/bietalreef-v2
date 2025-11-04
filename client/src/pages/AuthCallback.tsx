import { useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function AuthCallback() {
  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the hash from URL
        const hash = window.location.hash;
        
        if (!hash) {
          console.error('No hash in URL');
          window.location.href = '/login';
          return;
        }

        const hashParams = new URLSearchParams(hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');

        if (!accessToken || !refreshToken) {
          console.error('Missing tokens');
          window.location.href = '/login';
          return;
        }

        // Set the session
        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (error) {
          console.error('Error setting session:', error);
          window.location.href = '/login?error=auth_failed';
          return;
        }

        if (data.session) {
          console.log('Session set successfully!');
          // Redirect to home
          window.location.href = '/';
        } else {
          console.error('No session in response');
          window.location.href = '/login?error=no_session';
        }
      } catch (err) {
        console.error('Callback error:', err);
        window.location.href = '/login?error=callback_failed';
      }
    };

    handleCallback();
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
