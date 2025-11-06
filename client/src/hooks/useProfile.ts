import { useState, useEffect } from 'react';
import { useAuth } from '@/_core/hooks/useAuth';
import { supabase } from '@/lib/supabase';

export interface UserProfile {
  id: string;
  user_type: 'client' | 'provider' | null;
  phone: string | null;
  location: string | null;
  verification_status: 'unverified' | 'pending' | 'verified' | 'rejected';
  is_verified: boolean;
  business_license_url: string | null;
  id_photo_url: string | null;
  company_name: string | null;
  company_description: string | null;
  created_at: string;
  updated_at: string;
}

export function useProfile() {
  const { user, isAuthenticated } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    fetchProfile();
  }, [user, isAuthenticated]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user!.id)
        .single();

      if (fetchError) {
        // If profile doesn't exist, create it
        if (fetchError.code === 'PGRST116') {
          await createProfile();
          return;
        }
        throw fetchError;
      }

      setProfile(data);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const createProfile = async () => {
    try {
      const { data, error: createError } = await supabase
        .from('profiles')
        .insert([
          {
            id: user!.id,
            user_type: null,
            verification_status: 'unverified',
            is_verified: false,
          },
        ])
        .select()
        .single();

      if (createError) throw createError;

      setProfile(data);
    } catch (err) {
      console.error('Error creating profile:', err);
      setError(err as Error);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      setError(null);

      const { data, error: updateError } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user!.id)
        .select()
        .single();

      if (updateError) throw updateError;

      setProfile(data);
      return data;
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err as Error);
      throw err;
    }
  };

  const setUserType = async (userType: 'client' | 'provider') => {
    return updateProfile({ user_type: userType });
  };

  const uploadVerificationDocument = async (
    file: File,
    type: 'business_license' | 'id_photo'
  ) => {
    try {
      setError(null);

      const fileExt = file.name.split('.').pop();
      const fileName = `${user!.id}/${type}_${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('verification-documents')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('verification-documents')
        .getPublicUrl(fileName);

      const updateField =
        type === 'business_license' ? 'business_license_url' : 'id_photo_url';

      await updateProfile({
        [updateField]: urlData.publicUrl,
        verification_status: 'pending',
      });

      return urlData.publicUrl;
    } catch (err) {
      console.error('Error uploading document:', err);
      setError(err as Error);
      throw err;
    }
  };

  return {
    profile,
    loading,
    error,
    updateProfile,
    setUserType,
    uploadVerificationDocument,
    refetch: fetchProfile,
  };
}
