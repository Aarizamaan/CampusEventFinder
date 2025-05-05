/*
  # Create profiles table for user information

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `full_name` (text)
      - `avatar_url` (text)
      - `is_admin` (boolean)
      - `created_at` (timestamp with time zone)
      - `updated_at` (timestamp with time zone)
  2. Security
    - Enable RLS on `profiles` table
    - Add policy for users to read and update their own profile
    - Add policy for admins to read all profiles
*/

CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Admins can read all profiles
CREATE POLICY "Admins can read all profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND is_admin = TRUE
  ));