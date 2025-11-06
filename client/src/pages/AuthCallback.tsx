import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { supabase } from '../lib/supabase';
import UserTypeModal from '../components/UserTypeModal';
import VerificationModal, { VerificationData } from '../components/VerificationModal';

export default function AuthCallback() {
  const [, setLocation] = useLocation();
  const [error, setError] = useState<string | null>(null);
  const [showUserTypeModal, setShowUserTypeModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState<'client' | 'provider' | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

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
            setTimeout(() => setLocation('/login'), 2000);
            return;
          }

          if (data.session) {
            console.log('Session established successfully:', data.session.user.email);
            setUserId(data.session.user.id);
            
            // Wait a moment to ensure session is fully persisted
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Check if user has already selected their type
            const { data: profile } = await supabase
              .from('profiles')
              .select('user_type, is_verified')
              .eq('id', data.session.user.id)
              .single();

            if (profile?.user_type) {
              // User has already selected type, go to home
              console.log('User type already set, redirecting to home...');
              setLocation('/home');
            } else {
              // Show user type selection modal
              console.log('First time user, showing type selection...');
              setShowUserTypeModal(true);
            }
          } else {
            console.log('No session after exchange, redirecting to login...');
            setLocation('/login?error=no_session');
          }
        } else {
          // Fallback: try to get existing session
          console.log('No code found, checking for existing session...');
          const { data, error: sessionError } = await supabase.auth.getSession();
          
          if (sessionError) {
            console.error('Session error:', sessionError);
            setError('فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.');
            setTimeout(() => setLocation('/login'), 2000);
            return;
          }

          if (data.session) {
            console.log('Session found:', data.session.user.email);
            setUserId(data.session.user.id);
            
            // Check user type
            const { data: profile } = await supabase
              .from('profiles')
              .select('user_type, is_verified')
              .eq('id', data.session.user.id)
              .single();

            if (profile?.user_type) {
              setLocation('/home');
            } else {
              setShowUserTypeModal(true);
            }
          } else {
            console.log('No session found, redirecting to login...');
            setLocation('/login?error=no_session');
          }
        }
      } catch (err) {
        console.error('Callback error:', err);
        setError('حدث خطأ أثناء تسجيل الدخول');
        setTimeout(() => setLocation('/login'), 2000);
      }
    };

    handleCallback();
  }, [setLocation]);

  const handleUserTypeSelect = async (type: 'client' | 'provider', providerSubtype?: 'company' | 'craftsman') => {
    if (!userId) return;

    try {
      // Save user type and provider subtype to database
      const updateData: any = {
        id: userId,
        user_type: type,
        updated_at: new Date().toISOString(),
      };

      // Add provider_subtype if it's a provider
      if (type === 'provider' && providerSubtype) {
        updateData.provider_subtype = providerSubtype;
      }

      const { error } = await supabase
        .from('profiles')
        .upsert(updateData);

      if (error) {
        console.error('Error saving user type:', error);
        setError('فشل حفظ نوع الحساب');
        return;
      }

      setSelectedUserType(type);
      setShowUserTypeModal(false);
      setShowVerificationModal(true);
    } catch (err) {
      console.error('Error:', err);
      setError('حدث خطأ');
    }
  };

  const handleVerificationSubmit = async (data: VerificationData) => {
    if (!userId) return;

    try {
      // Save verification data
      const { error } = await supabase
        .from('profiles')
        .update({
          phone: data.phone,
          location: data.location,
          verification_status: 'pending',
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId);

      if (error) {
        console.error('Error saving verification data:', error);
        setError('فشل حفظ بيانات التوثيق');
        return;
      }

      // TODO: Upload documents to storage

      setShowVerificationModal(false);
      setLocation('/home');
    } catch (err) {
      console.error('Error:', err);
      setError('حدث خطأ');
    }
  };

  const handleVerificationSkip = () => {
    setShowVerificationModal(false);
    setLocation('/home');
  };

  return (
    <>
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

      {showUserTypeModal && (
        <UserTypeModal
          open={showUserTypeModal}
          onSelect={handleUserTypeSelect}
        />
      )}

      {showVerificationModal && selectedUserType && (
        <VerificationModal
          open={showVerificationModal}
          userType={selectedUserType}
          onSkip={handleVerificationSkip}
          onSubmit={handleVerificationSubmit}
        />
      )}
    </>
  );
}
