import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function AuthCallback() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        console.log('Processing OAuth callback...');
        
        // Check if we have a code in the URL (OAuth callback)
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        
        if (code) {
          console.log('Found OAuth code, exchanging for session...');
          
          // Exchange the code for a session
          const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          
          if (exchangeError) {
            console.error('Exchange error:', exchangeError);
            setError('فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.');
            setTimeout(() => window.location.href = '/login', 2000);
            return;
          }

          if (data.session) {
            console.log('Session established successfully:', data.session.user.email);
            
            // Wait a moment to ensure session is fully persisted
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Redirect to home page
            console.log('Redirecting to home...');
            window.location.href = '/home';
          } else {
            console.log('No session after exchange, redirecting to login...');
            window.location.href = '/login?error=no_session';
          }
        } else {
          // Fallback: try to get existing session from hash
          console.log('No code found, checking for existing session...');
          const { data, error: sessionError } = await supabase.auth.getSession();
          
          if (sessionError) {
            console.error('Session error:', sessionError);
            setError('فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.');
            setTimeout(() => window.location.href = '/login', 2000);
            return;
          }

          if (data.session) {
            console.log('Session found:', data.session.user.email);
            await new Promise(resolve => setTimeout(resolve, 500));
            window.location.href = '/home';
          } else {
            console.log('No session found, redirecting to login...');
            window.location.href = '/login?error=no_session';
          }
        }
      } catch (err) {
        console.error('Callback error:', err);
        setError('حدث خطأ أثناء تسجيل الدخول');
        setTimeout(() => window.location.href = '/login', 2000);
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
        {error && (
          <p className="text-red-300 text-sm mt-4">{error}</p>
        )}
      </div>
    </div>
  );
}
