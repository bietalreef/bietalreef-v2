-- ============================================
-- Biet Al Reef Platform - Database Setup
-- ============================================
-- Project: bietalreef-v2
-- Supabase Project ID: pczhhuzpspruiubxxhys
-- Date: November 6, 2025
-- ============================================

-- ============================================
-- 1. CREATE PROFILES TABLE
-- ============================================
-- This table stores user profile information including user type and verification status

CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  user_type TEXT CHECK (user_type IN ('client', 'provider')),
  phone TEXT,
  location TEXT,
  verification_status TEXT DEFAULT 'unverified' CHECK (verification_status IN ('unverified', 'pending', 'verified', 'rejected')),
  is_verified BOOLEAN DEFAULT FALSE,
  business_license_url TEXT,
  id_photo_url TEXT,
  company_name TEXT,
  company_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. CREATE INDEX FOR PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_profiles_user_type ON profiles(user_type);
CREATE INDEX IF NOT EXISTS idx_profiles_verification_status ON profiles(verification_status);
CREATE INDEX IF NOT EXISTS idx_profiles_is_verified ON profiles(is_verified);

-- ============================================
-- 3. ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 4. CREATE RLS POLICIES
-- ============================================

-- Policy: Users can read their own profile
CREATE POLICY "Users can read own profile" ON profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Policy: Users can insert their own profile (only once)
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Policy: Public can read verified provider profiles (for browsing)
CREATE POLICY "Public can read verified providers" ON profiles
  FOR SELECT
  USING (user_type = 'provider' AND is_verified = TRUE);

-- ============================================
-- 5. CREATE STORAGE BUCKET FOR VERIFICATION DOCUMENTS
-- ============================================

-- Note: This must be done through Supabase Dashboard or via SQL
-- Go to: Storage > Create Bucket > Name: "verification-documents"

-- Storage Policies (to be added after bucket creation):
-- 1. Users can upload their own documents
-- 2. Users can read their own documents
-- 3. Admins can read all documents

-- ============================================
-- 6. CREATE FUNCTION TO UPDATE updated_at TIMESTAMP
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 7. CREATE TRIGGER FOR AUTO-UPDATE updated_at
-- ============================================

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 8. CREATE FUNCTION TO AUTO-CREATE PROFILE ON USER SIGNUP
-- ============================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, created_at, updated_at)
  VALUES (NEW.id, NOW(), NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 9. CREATE TRIGGER TO AUTO-CREATE PROFILE
-- ============================================

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 10. SAMPLE DATA (OPTIONAL - FOR TESTING)
-- ============================================

-- Uncomment to insert sample data for testing:

-- INSERT INTO profiles (id, user_type, phone, location, verification_status, is_verified, company_name)
-- VALUES 
--   ('00000000-0000-0000-0000-000000000001', 'client', '+971501234567', 'Dubai', 'verified', TRUE, NULL),
--   ('00000000-0000-0000-0000-000000000002', 'provider', '+971507654321', 'Abu Dhabi', 'verified', TRUE, 'شركة الإمارات للخدمات');

-- ============================================
-- SETUP COMPLETE!
-- ============================================
-- Next Steps:
-- 1. Run this SQL in Supabase SQL Editor
-- 2. Create Storage bucket "verification-documents" in Dashboard
-- 3. Test the application
-- ============================================
