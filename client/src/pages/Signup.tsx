import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authHelpers } from '../lib/supabase';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';

export default function Signup() {
  const navigate = useNavigate();
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

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('كلمة المرور وتأكيد كلمة المرور غير متطابقتين');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      setLoading(false);
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
      return;
    }

    if (data.user) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4" dir="rtl">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold text-gray-900">
            إنشاء حساب جديد
          </CardTitle>
          <CardDescription className="text-gray-600">
            أدخل بياناتك لإنشاء حساب في بيت الريف
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="bg-green-50 border-green-200">
                <AlertDescription className="text-green-800">
                  تم إنشاء الحساب بنجاح! جاري تحويلك لتسجيل الدخول...
                </AlertDescription>
              </Alert>
            )}

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
                className="text-right"
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
                className="text-right"
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
                className="text-right"
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
                className="text-right"
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
                className="text-right"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={loading || success}
            >
              {loading ? 'جاري إنشاء الحساب...' : 'إنشاء حساب'}
            </Button>

            <div className="text-center text-sm text-gray-600">
              لديك حساب بالفعل؟{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                تسجيل الدخول
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
