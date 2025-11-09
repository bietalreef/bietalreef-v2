import { useState } from 'react';
import { useLocation, Link } from 'wouter';
import { authHelpers } from '../lib/supabase';
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
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      dir="rtl"
      style={{
        fontFamily: "'Noto Kufi Arabic', sans-serif",
        background: 'linear-gradient(180deg,#FAF9F7 0%,#ECE7DE 100%)',
      }}
    >
      <Card className="w-full max-w-md backdrop-blur-xl bg-white/95 shadow-2xl border-0 relative z-10">
        <CardHeader className="space-y-1 text-center pb-6">
          <div className="flex justify-center mb-4">
            <img src="/logo.png" alt="بيت الريف" style={{ height: 72 }} />
          </div>
          <CardTitle className="text-3xl font-bold text-[#4C6A3E]">
            تسجيل الدخول إلى بيت الريف
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

          <div className="space-y-3 mb-6">
            <Button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading || oauthLoading}
              className="w-full h-12 bg-[#4C6A3E] hover:bg-[#3f5b33] text-white font-medium transition-all duration-200 hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              تسجيل الدخول بواسطة Google
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
              <label htmlFor="email" className="text-sm font-medium text-gray-700">البريد الإلكتروني</label>
              <Input id="email" type="email" placeholder="example@email.com"
                value={email} onChange={(e) => setEmail(e.target.value)}
                required disabled={loading || oauthLoading} className="text-right h-12" />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">كلمة المرور</label>
              <Input id="password" type="password" placeholder="••••••••"
                value={password} onChange={(e) => setPassword(e.target.value)}
                required disabled={loading || oauthLoading} className="text-right h-12" />
            </div>

            <Button type="submit" className="w-full h-12 text-base font-medium bg-[#4C6A3E] hover:bg-[#3f5b33] text-white shadow-lg"
              disabled={loading || oauthLoading}>
              {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
            </Button>

            <div className="text-center text-sm text-gray-600">
              ليس لديك حساب؟{' '}
              <Link to="/signup" className="text-[#C5A572] font-medium">إنشاء حساب جديد</Link>
            </div>
          </form>

          {/* Terms and Privacy Links */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-xs text-gray-500 mb-2">
              بتسجيل الدخول، أنت توافق على:
            </p>
            <div className="flex items-center justify-center gap-3 text-xs">
              <Link to="/terms" className="text-[#4C6A3E] hover:text-[#3f5b33] font-medium hover:underline">
                الشروط والأحكام
              </Link>
              <span className="text-gray-400">•</span>
              <Link to="/privacy" className="text-[#4C6A3E] hover:text-[#3f5b33] font-medium hover:underline">
                سياسة الخصوصية
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}