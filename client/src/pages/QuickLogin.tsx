import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function QuickLogin() {
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [contact, setContact] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'input' | 'verify'>('input');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const sendOTP = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (method === 'email') {
        const { error: otpError } = await supabase.auth.signInWithOtp({
          email: contact,
          options: {
            shouldCreateUser: true,
          },
        });

        if (otpError) throw otpError;
        
        setSuccess('تم إرسال رمز التأكيد إلى بريدك الإلكتروني!');
        setStep('verify');
      } else {
        // Phone OTP
        const { error: otpError } = await supabase.auth.signInWithOtp({
          phone: contact,
          options: {
            shouldCreateUser: true,
          },
        });

        if (otpError) throw otpError;
        
        setSuccess('تم إرسال رمز التأكيد إلى هاتفك!');
        setStep('verify');
      }
    } catch (err: any) {
      console.error('OTP Error:', err);
      setError(err.message || 'فشل إرسال رمز التأكيد');
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    setLoading(true);
    setError('');

    try {
      if (method === 'email') {
        const { data, error: verifyError } = await supabase.auth.verifyOtp({
          email: contact,
          token: otp,
          type: 'email',
        });

        if (verifyError) throw verifyError;
        
        if (data.session) {
          console.log('Session established:', data.session.user.email);
          window.location.href = '/home';
        }
      } else {
        const { data, error: verifyError } = await supabase.auth.verifyOtp({
          phone: contact,
          token: otp,
          type: 'sms',
        });

        if (verifyError) throw verifyError;
        
        if (data.session) {
          console.log('Session established:', data.session.user.phone);
          window.location.href = '/home';
        }
      }
    } catch (err: any) {
      console.error('Verify Error:', err);
      setError(err.message || 'رمز التأكيد غير صحيح');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
      }}
    >
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">تسجيل دخول سريع</h1>
          <p className="text-gray-600">سجل دخولك بسهولة عبر البريد الإلكتروني أو رقم الهاتف</p>
        </div>

        {/* Method Selection */}
        {step === 'input' && (
          <div className="mb-6">
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setMethod('email')}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                  method === 'email'
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                📧 البريد الإلكتروني
              </button>
              <button
                onClick={() => setMethod('phone')}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                  method === 'phone'
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                📱 رقم الهاتف
              </button>
            </div>

            {/* Input Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {method === 'email' ? 'البريد الإلكتروني' : 'رقم الهاتف'}
              </label>
              <input
                type={method === 'email' ? 'email' : 'tel'}
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder={method === 'email' ? 'example@email.com' : '+971501234567'}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors text-right"
                dir="ltr"
              />
              {method === 'phone' && (
                <p className="text-xs text-gray-500 mt-1 text-right">
                  مثال: +971501234567 (يجب أن يبدأ برمز الدولة)
                </p>
              )}
            </div>

            {/* Send OTP Button */}
            <button
              onClick={sendOTP}
              disabled={loading || !contact}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'جاري الإرسال...' : 'إرسال رمز التأكيد'}
            </button>
          </div>
        )}

        {/* OTP Verification */}
        {step === 'verify' && (
          <div className="mb-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                رمز التأكيد
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
                maxLength={6}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors text-center text-2xl tracking-widest"
                dir="ltr"
              />
              <p className="text-xs text-gray-500 mt-1 text-center">
                أدخل الرمز المكون من 6 أرقام
              </p>
            </div>

            {/* Verify Button */}
            <button
              onClick={verifyOTP}
              disabled={loading || otp.length !== 6}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-3"
            >
              {loading ? 'جاري التحقق...' : 'تأكيد وتسجيل الدخول'}
            </button>

            {/* Resend Button */}
            <button
              onClick={() => {
                setStep('input');
                setOtp('');
              }}
              className="w-full text-purple-600 hover:text-purple-700 font-medium"
            >
              إعادة إرسال الرمز
            </button>
          </div>
        )}

        {/* Messages */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded-lg text-sm">
            {success}
          </div>
        )}

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">أو</span>
          </div>
        </div>

        {/* Back to Login */}
        <div className="text-center">
          <a 
            href="/login"
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            العودة إلى تسجيل الدخول التقليدي
          </a>
        </div>
      </div>
    </div>
  );
}
