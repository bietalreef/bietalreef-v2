-- ============================================
-- Add provider_subtype column to profiles table
-- ============================================
-- This allows distinguishing between companies (with license) and craftsmen (without license)

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS provider_subtype TEXT 
CHECK (provider_subtype IN ('company', 'craftsman'));

-- Add comment for clarity
COMMENT ON COLUMN profiles.provider_subtype IS 'For providers: company (with license) or craftsman (without license)';

-- ============================================
-- Update existing providers (optional)
-- ============================================
-- If you have existing providers, you can set a default:
-- UPDATE profiles SET provider_subtype = 'company' WHERE user_type = 'provider' AND provider_subtype IS NULL;
