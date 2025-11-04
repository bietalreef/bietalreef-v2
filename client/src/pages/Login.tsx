import { useState, useEffect } from 'react';
import { useLocation, Link } from 'wouter';
import { authHelpers, supabase } from '../lib/supabase';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';

export default function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [oauthLoading, setOauthLoading] = useState(false);

  // Handle OAuth callback on mount - SIMPLIFIED VERSION
  useEffect(() => {
    const hash = window.location.hash;
    
    if (hash && hash.includes('access_token')) {
      console.log('OAuth callback detected!');
      setOauthLoading(true);
      
      const hashParams = new URLSearchParams(hash.substring(1));
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');
      
      console.log('Tokens found:', { 
        hasAccessToken: !!accessToken, 
        hasRefreshToken: !!refreshToken 
      });

      if (accessToken && refreshToken) {
        supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        }).then(({ data, error }) => {
          if (error) {
            console.error('Error setting session:', error);
            setError('حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.');
            setOauthLoading(false);
            return;
          }

          if (data.session) {
            console.log('Session set successfully! Redirecting...');
            // Clear hash and redirect
            window.history.replaceState(null, '', '/login');
            window.location.href = '/';
          } else {
            console.error('No session in response');
            setOauthLoading(false);
          }
        }).catch(err => {
          console.error('OAuth callback error:', err);
          setError('حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.');
          setOauthLoading(false);
        });
      } else {
        console.error('Missing tokens');
        setOauthLoading(false);
      }
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { data, error: signInError } = await authHelpers.signIn(email, password);

    if (signInError) {
      setError(signInError.message === 'Invalid login credentials' 
        ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة' 
        : 'حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.');
      setLoading(false);
      return;
    }

    if (data.user) {
      setLocation('/dashboard');
    }

    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setOauthLoading(true);
    setError('');
    const { error: signInError } = await authHelpers.signInWithGoogle();
    if (signInError) {
      setError('حدث خطأ أثناء تسجيل الدخول بواسطة Google. يرجى المحاولة مرة أخرى.');
      setOauthLoading(false);
    }
    // Don't set loading to false here as the page will redirect
  };

  const handleAppleSignIn = async () => {
    setOauthLoading(true);
    setError('');
    const { error: signInError } = await authHelpers.signInWithApple();
    if (signInError) {
      setError('حدث خطأ أثناء تسجيل الدخول بواسطة Apple. يرجى المحاولة مرة أخرى.');
      setOauthLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    setOauthLoading(true);
    setError('');
    const { error: signInError } = await authHelpers.signInWithFacebook();
    if (signInError) {
      setError('حدث خطأ أثناء تسجيل الدخول بواسطة Facebook. يرجى المحاولة مرة أخرى.');
      setOauthLoading(false);
    }
  };

  // Show loading screen during OAuth callback
  if (oauthLoading && window.location.hash.includes('access_token')) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center p-4"
        dir="rtl"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
        }}
      >
        <Card className="w-full max-w-md backdrop-blur-xl bg-white/95 shadow-2xl border-0">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
              <p className="text-lg font-medium text-gray-700">جاري تسجيل الدخول...</p>
              <p className="text-sm text-gray-500 mt-2">يرجى الانتظار</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      dir="rtl"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradient 15s ease infinite',
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '3s' }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
      </div>

      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <Card className="w-full max-w-md backdrop-blur-xl bg-white/95 shadow-2xl border-0 relative z-10">
        <CardHeader className="space-y-1 text-center pb-6">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            مرحباً بعودتك
          </CardTitle>
          <CardDescription className="text-gray-600 text-base">
            سجّل دخولك للوصول إلى حسابك في بيت الريف
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4 animate-shake">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* OAuth Buttons */}
          <div className="space-y-3 mb-6">
            <Button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading || oauthLoading}
              className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium transition-all duration-200 hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              تسجيل الدخول بواسطة Google
            </Button>

            <Button
              type="button"
              onClick={handleAppleSignIn}
              disabled={loading || oauthLoading}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-200 hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              تسجيل الدخول بواسطة Apple
            </Button>

            <Button
              type="button"
              onClick={handleFacebookSignIn}
              disabled={loading || oauthLoading}
              className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white font-medium transition-all duration-200 hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              تسجيل الدخول بواسطة Facebook
            </Button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">أو</span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                البريد الإلكتروني
              </label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading || oauthLoading}
                className="text-right h-12"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                كلمة المرور
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading || oauthLoading}
                className="text-right h-12"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-medium bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-200 hover:scale-105 shadow-lg"
              disabled={loading || oauthLoading}
            >
              {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
            </Button>

            <div className="text-center text-sm text-gray-600">
              ليس لديك حساب؟{' '}
              <Link to="/signup" className="text-purple-600 hover:text-purple-700 font-medium transition-colors">
                إنشاء حساب جديد
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
