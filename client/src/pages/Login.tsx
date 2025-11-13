import { useState } from 'react';
import { useLocation, Link } from 'wouter';
import { supabase } from '../lib/supabase';
import { BackgroundCardsGrid } from '../components/BackgroundCardsGrid';
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
    <div className="relative w-full min-h-screen overflow-hidden bg-[#F5EEE1]" dir="rtl">
      <BackgroundCardsGrid />
      
      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-[420px] animate-fadeInScale">
          {/* Glass Panel */}
          <div
            className="relative backdrop-blur-[22px] bg-white/35 rounded-[28px] p-10 border border-white/15"
            style={{
              boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)',
            }}
          >
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <img 
                src="/logo.png" 
                alt="بيت الريف" 
                className="w-[80px] h-[80px] object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    parent.innerHTML = '<div class="w-[80px] h-[80px] flex items-center justify-center text-5xl">🏡</div>';
                  }
                }}
              />
            </div>

            {/* Title */}
            <div className="text-center mb-8">
              <h1 
                className="text-[24px] text-[#1A1A1A] mb-2 font-semibold"
                style={{ fontFamily: 'Cairo, sans-serif' }}
              >
                تسجيل الدخول
              </h1>
              <p 
                className="text-[14px] text-[#6F6F6F]/70"
                style={{ fontFamily: 'Cairo, sans-serif' }}
              >
                منصة البناء الذكية في الإمارات
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-2xl text-red-600 text-sm text-center animate-shake">
                {error}
              </div>
            )}

            {step === 'email' ? (
              <>
                {/* Google Button */}
                <button
                  onClick={handleGoogleSignIn}
                  disabled={loading || oauthLoading}
                  className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-white rounded-[16px] shadow-sm hover:shadow-md transition-all duration-200 mb-6 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-[#1A1A1A] text-[15px]" style={{ fontFamily: 'Cairo, sans-serif' }}>
                    متابعة عبر جوجل
                  </span>
                </button>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#6F6F6F]/20" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white/40 backdrop-blur-sm px-4 text-xs text-[#6F6F6F]/70" style={{ fontFamily: 'Cairo, sans-serif' }}>
                      أو عبر البريد الإلكتروني
                    </span>
                  </div>
                </div>

                {/* Email Input */}
                <form onSubmit={handleEmailSubmit} className="space-y-6">
                  <div>
                    <label 
                      className="block text-[13px] text-[#1A1A1A]/80 mb-2 text-right"
                      style={{ fontFamily: 'Cairo, sans-serif' }}
                    >
                      البريد الإلكتروني
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@email.com"
                        className="w-full px-5 py-3.5 pr-12 bg-white/50 border border-[#6F6F6F]/20 rounded-[16px] focus:border-[#5B7FE8]/50 focus:outline-none transition-all duration-200 text-[#1A1A1A]"
                        style={{ fontFamily: 'Cairo, sans-serif' }}
                        dir="ltr"
                        required
                        disabled={loading || oauthLoading}
                      />
                      <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6F6F6F]/50" />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading || oauthLoading}
                    className="w-full px-6 py-4 bg-gradient-to-r from-[#5B7FE8] to-[#7B5FE8] text-white rounded-[20px] hover:opacity-90 transition-all duration-200 shadow-md font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
                    style={{ fontFamily: 'Cairo, sans-serif' }}
                  >
                    {loading ? 'جارٍ الإرسال...' : 'إرسال رمز التحقق'}
                  </button>
                </form>
              </>
            ) : (
              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <div className="text-center mb-6 p-4 bg-[#5B7FE8]/10 backdrop-blur-sm rounded-2xl border border-[#5B7FE8]/20">
                  <p className="text-gray-700 text-sm mb-1" style={{ fontFamily: 'Cairo, sans-serif' }}>
                    تم إرسال رمز التحقق إلى
                  </p>
                  <p className="font-bold text-gray-900" style={{ fontFamily: 'Cairo, sans-serif' }}>{email}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setStep('email');
                      setOtp('');
                      setError('');
                    }}
                    className="text-[#5B7FE8] text-sm mt-2 hover:underline font-semibold"
                    style={{ fontFamily: 'Cairo, sans-serif' }}
                  >
                    تغيير البريد الإلكتروني
                  </button>
                </div>

                <div>
                  <label className="block text-[#1A1A1A]/80 font-semibold mb-3 text-center text-[13px]" style={{ fontFamily: 'Cairo, sans-serif' }}>
                    رمز التحقق (6 أرقام)
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="123456"
                    className="w-full h-16 px-4 bg-white/50 border-2 border-[#6F6F6F]/20 rounded-[16px] focus:border-[#5B7FE8]/50 focus:outline-none text-center text-3xl tracking-[1em] font-bold transition-all duration-200"
                    required
                    disabled={loading}
                    maxLength={6}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || otp.length !== 6}
                  className="w-full px-6 py-4 bg-gradient-to-r from-[#5B7FE8] to-[#7B5FE8] text-white rounded-[20px] hover:opacity-90 transition-all duration-200 shadow-md font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
                  style={{ fontFamily: 'Cairo, sans-serif' }}
                >
                  {loading ? 'جارٍ التحقق...' : 'تسجيل الدخول'}
                </button>

                <button
                  type="button"
                  onClick={handleEmailSubmit}
                  disabled={loading}
                  className="w-full text-[#5B7FE8] text-sm hover:underline disabled:opacity-50 font-semibold"
                  style={{ fontFamily: 'Cairo, sans-serif' }}
                >
                  إعادة إرسال رمز التحقق
                </button>
              </form>
            )}

            {/* Terms */}
            <p 
              className="text-center text-[11px] text-[#6F6F6F]/60 mt-6 leading-relaxed"
              style={{ fontFamily: 'Cairo, sans-serif' }}
            >
              بالمتابعة، أنت توافق على{' '}
              <Link href="/terms" className="text-[#5B7FE8] hover:underline">
                الشروط والأحكام
              </Link>
              {' '}و{' '}
              <Link href="/privacy" className="text-[#5B7FE8] hover:underline">
                سياسة الخصوصية
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
