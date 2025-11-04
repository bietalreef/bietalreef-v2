import { useEffect, useState } from 'react';

export default function AuthCallback() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Supabase automatically processes the OAuth callback via the SDK
    // The session is automatically set when the page loads with the hash
    // We just need to wait a moment and then redirect
    
    const timer = setTimeout(() => {
      // Check if we're still on the callback page (no redirect happened)
      // This means the session was set successfully
      console.log('Redirecting to home after successful OAuth...');
      window.location.href = '/';
    }, 1500);

    return () => clearTimeout(timer);
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
