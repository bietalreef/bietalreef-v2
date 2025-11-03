import { useState, useRef } from 'react';
import { useLocation, Link } from 'wouter';
import ReCAPTCHA from 'react-google-recaptcha';
import { authHelpers } from '../lib/supabase';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';

export default function Signup() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    // Verify reCAPTCHA
    const recaptchaValue = recaptchaRef.current?.getValue();
    if (!recaptchaValue) {
      setError('يرجى التحقق من أنك لست روبوت');
      setLoading(false);
      return;
    }

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('كلمة المرور وتأكيد كلمة المرور غير متطابقتين');
      setLoading(false);
      recaptchaRef.current?.reset();
      return;
    }

    if (formData.password.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      setLoading(false);
      recaptchaRef.current?.reset();
      return;
    }

    const { data, error: signUpError } = await authHelpers.signUp(
      formData.email,
      formData.password,
      {
        full_name: formData.fullName,
        phone: formData.phone,
      }
    );

    if (signUpError) {
      setError(signUpError.message === 'User already registered' 
        ? 'هذا البريد الإلكتروني مسجل بالفعل' 
        : 'حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى.');
      setLoading(false);
      recaptchaRef.current?.reset();
      return;
    }

    if (data.user) {
      setSuccess(true);
      setTimeout(() => {
        setLocation('/login');
      }, 2000);
    }

    setLoading(false);
  };

  const handleSocialLogin = async (provider: 'google' | 'apple' | 'facebook') => {
    setLoading(true);
    setError('');

    let result;
    if (provider === 'google') {
      result = await authHelpers.signInWithGoogle();
    } else if (provider === 'apple') {
      result = await authHelpers.signInWithApple();
    } else {
      result = await authHelpers.signInWithFacebook();
    }

    if (result.error) {
      setError('حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى.');
      setLoading(false);
    }
  };

  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

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

      <Card className="w-full max-w-md backdrop-blur-xl bg-white/95 shadow-2xl border-0 relative z-10 max-h-[95vh] overflow-y-auto">
        <CardHeader className="space-y-1 text-center pb-6">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            انضم إلينا اليوم
          </CardTitle>
          <CardDescription className="text-gray-600 text-base">
            أنشئ حسابك الآن وابدأ رحلتك مع بيت الريف
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            {error && (
              <Alert variant="destructive" className="animate-shake">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="bg-green-50 border-green-200 animate-bounce">
                <AlertDescription className="text-green-800 font-medium">
                  🎉 تم إنشاء الحساب بنجاح! جاري تحويلك...
                </AlertDescription>
              </Alert>
            )}

            {/* Social Login Buttons */}
            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 text-base font-medium hover:bg-gray-50 transition-all duration-200 hover:scale-105"
                onClick={() => handleSocialLogin('google')}
                disabled={loading}
              >
                <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                التسجيل بواسطة Google
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full h-12 text-base font-medium hover:bg-gray-50 transition-all duration-200 hover:scale-105"
                onClick={() => handleSocialLogin('apple')}
                disabled={loading}
              >
                <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                التسجيل بواسطة Apple
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full h-12 text-base font-medium hover:bg-gray-50 transition-all duration-200 hover:scale-105"
                onClick={() => handleSocialLogin('facebook')}
                disabled={loading}
              >
                <svg className="w-5 h-5 ml-2" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                التسجيل بواسطة Facebook
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">أو</span>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                الاسم الكامل
              </label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="أدخل اسمك الكامل"
                value={formData.fullName}
                onChange={handleChange}
                required
                disabled={loading}
                className="text-right h-12"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                البريد الإلكتروني
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
                className="text-right h-12"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                رقم الهاتف
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+971 XX XXX XXXX"
                value={formData.phone}
                onChange={handleChange}
                disabled={loading}
                className="text-right h-12"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                كلمة المرور
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
                className="text-right h-12"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                تأكيد كلمة المرور
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                disabled={loading}
                className="text-right h-12"
              />
            </div>

            <div className="flex justify-center">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={recaptchaSiteKey}
                hl="ar"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-medium bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-200 hover:scale-105 shadow-lg"
              disabled={loading || success}
            >
              {loading ? 'جاري إنشاء الحساب...' : 'إنشاء حساب'}
            </Button>

            <div className="text-center text-sm text-gray-600">
              لديك حساب بالفعل؟{' '}
              <Link to="/login" className="text-purple-600 hover:text-purple-700 font-medium transition-colors">
                تسجيل الدخول
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
