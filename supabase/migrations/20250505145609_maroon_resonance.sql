/*
  # Fix user creation setup
  
  1. Changes
    - Create users table for auth.users reference
    - Add handle_new_user trigger function implementation
    - Add trigger to auth.users table
  
  2. Security
    - Enable RLS on users table
    - Add policy for authenticated users to read their own data
*/

-- Create users table to match auth.users
CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL
);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to read their own data
CREATE POLICY "Users can read own data" 
  ON public.users
  FOR SELECT 
  TO authenticated 
  USING (auth.uid() = id);

-- Implement handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Insert into users table
  INSERT INTO public.users (id, email)
  VALUES (new.id, new.email);
  
  -- Insert into profiles table
  INSERT INTO public.profiles (id, email, full_name, avatar_url, is_admin)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', false);
  
  RETURN new;
END;
$$;

-- Add trigger to auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();