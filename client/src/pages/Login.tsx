import { useState } from 'react';
import { useLocation, Link } from 'wouter';
import { supabase } from '../lib/supabase';
import { ArchitecturalBackground } from '../components/ArchitecturalBackground';
import { Mail, LogIn } from 'lucide-react';

export default function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [oauthLoading, setOauthLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setOauthLoading(true);
      setError('');
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
    } catch (err: any) {
      setError('حدث خطأ أثناء تسجيل الدخول بواسطة Google. يرجى المحاولة مرة أخرى.');
      setOauthLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('الرجاء إدخال البريد الإلكتروني');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          shouldCreateUser: true,
        },
      });

      if (error) throw error;

      setStep('otp');
      setError('');
    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء إرسال رمز التحقق');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otp || otp.length !== 6) {
      setError('الرجاء إدخال رمز التحقق المكون من 6 أرقام');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const { error } = await supabase.auth.verifyOtp({
        email: email,
        token: otp,
        type: 'email',
      });

      if (error) throw error;

      setLocation('/auth/callback');
    } catch (err: any) {
      setError(err.message || 'رمز التحقق غير صحيح');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden" dir="rtl">
      <ArchitecturalBackground />
      
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Logo and Title Card */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 mb-6 rounded-3xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-2xl shadow-emerald-500/30">
              <img 
                src="/logo.png" 
                alt="بيت الريف" 
                className="w-16 h-16 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<span class="text-4xl text-white">🏡</span>';
                }}
              />
            </div>
            <h1 className="text-3xl font-bold text-[#8B7355] mb-2">
              تسجيل الدخول إلى بيت الريف
            </h1>
            <p className="text-[#A0826D]">
              منصة الملاك الذكية في الإمارات
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm text-center animate-shake">
                {error}
              </div>
            )}

            {/* Google Login Button */}
            <button
              onClick={handleGoogleSignIn}
              disabled={loading || oauthLoading}
              className="w-full h-14 bg-white border-2 border-gray-200 hover:border-emerald-500 text-gray-700 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 mb-6 shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>متابعة عبر جوجل</span>
            </button>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white text-gray-500 text-sm font-medium">أو</span>
              </div>
            </div>

            {/* Email OTP Form */}
            {step === 'email' ? (
              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div>
                  <label className="block text-[#8B7355] font-semibold mb-3 text-right">
                    البريد الإلكتروني
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@email.com"
                      className="w-full h-14 pl-12 pr-4 border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:outline-none transition-all duration-300 text-right bg-gray-50 focus:bg-white"
                      required
                      disabled={loading || oauthLoading}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || oauthLoading}
                  className="w-full h-14 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <LogIn className="w-5 h-5" />
                  <span>{loading ? 'جارٍ الإرسال...' : '← إرسال رمز التحقق'}</span>
                </button>
              </form>
            ) : (
              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <div className="text-center mb-6 p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                  <p className="text-gray-700 text-sm mb-1">
                    تم إرسال رمز التحقق إلى
                  </p>
                  <p className="font-bold text-gray-900">{email}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setStep('email');
                      setOtp('');
                      setError('');
                    }}
                    className="text-emerald-600 text-sm mt-2 hover:underline font-semibold"
                  >
                    تغيير البريد الإلكتروني
                  </button>
                </div>

                <div>
                  <label className="block text-[#8B7355] font-semibold mb-3 text-center">
                    رمز التحقق (6 أرقام)
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="123456"
                    className="w-full h-16 px-4 border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:outline-none text-center text-3xl tracking-[1em] font-bold bg-gray-50 focus:bg-white transition-all duration-300"
                    required
                    disabled={loading}
                    maxLength={6}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || otp.length !== 6}
                  className="w-full h-14 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <LogIn className="w-5 h-5" />
                  <span>{loading ? 'جارٍ التحقق...' : 'تسجيل الدخول'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleEmailSubmit}
                  disabled={loading}
                  className="w-full text-emerald-600 text-sm hover:underline disabled:opacity-50 font-semibold"
                >
                  إعادة إرسال رمز التحقق
                </button>
              </form>
            )}

            {/* Footer Links */}
            <div className="mt-8 pt-6 border-t-2 border-gray-100">
              <p className="text-center text-xs text-gray-500 mb-3">
                بتسجيل الدخول، أنت توافق على:
              </p>
              <div className="flex items-center justify-center gap-4 text-xs">
                <Link 
                  href="/terms" 
                  className="text-emerald-600 hover:text-emerald-700 font-semibold hover:underline transition-colors"
                >
                  الشروط والأحكام
                </Link>
                <span className="text-gray-400">•</span>
                <Link 
                  href="/privacy" 
                  className="text-emerald-600 hover:text-emerald-700 font-semibold hover:underline transition-colors"
                >
                  سياسة الخصوصية
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
