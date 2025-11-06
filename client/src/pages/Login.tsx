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
            <img src="/client/public/logo.png" alt="بيت الريف" style={{ height: 72 }} />
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
              تسجيل الدخول بواسطة Google
            </Button>

            <Button
              type="button"
              onClick={() => { /* apple */ }}
              disabled={loading || oauthLoading}
              className="w-full h-12 bg-[#0f172a] hover:bg-[#0b1220] text-white font-medium transition-all duration-200 hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              تسجيل الدخول بواسطة Apple
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
        </CardContent>
      </Card>
    </div>
  );
}