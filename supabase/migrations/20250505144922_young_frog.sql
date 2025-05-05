/*
  # Create events table for event information

  1. New Tables
    - `events`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `description` (text, not null)
      - `short_description` (text, not null)
      - `college` (text, not null)
      - `event_type` (enum: hackathon, workshop, webinar, seminar, competition, tech_talk, other)
      - `mode` (enum: online, offline, hybrid)
      - `location` (text)
      - `event_date` (timestamp with time zone, not null)
      - `end_date` (timestamp with time zone)
      - `registration_link` (text, not null)
      - `image_url` (text)
      - `featured` (boolean)
      - `status` (enum: pending, approved, rejected)
      - `created_at` (timestamp with time zone)
      - `created_by` (uuid, references profiles.id)
  2. Security
    - Enable RLS on `events` table
    - Add policy for authenticated users to create events
    - Add policy for all users to read approved events
    - Add policy for admins to read, update, and delete any event
    - Add policy for users to read their own created events
*/

-- Create custom types for event categories and status
DO $$ BEGIN
  CREATE TYPE event_type AS ENUM ('hackathon', 'workshop', 'webinar', 'seminar', 'competition', 'tech_talk', 'other');
  EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE event_mode AS ENUM ('online', 'offline', 'hybrid');
  EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE event_status AS ENUM ('pending', 'approved', 'rejected');
  EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  short_description TEXT NOT NULL,
  college TEXT NOT NULL,
  event_type event_type NOT NULL,
  mode event_mode NOT NULL,
  location TEXT,
  event_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  registration_link TEXT NOT NULL,
  image_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  status event_status DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS events_status_idx ON events(status);
CREATE INDEX IF NOT EXISTS events_event_date_idx ON events(event_date);
CREATE INDEX IF NOT EXISTS events_event_type_idx ON events(event_type);
CREATE INDEX IF NOT EXISTS events_created_by_idx ON events(created_by);

-- Enable Row Level Security
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Users can read approved events
CREATE POLICY "Anyone can view approved events"
  ON events
  FOR SELECT
  TO authenticated, anon
  USING (status = 'approved');

-- Users can create events
CREATE POLICY "Authenticated users can create events"
  ON events
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Users can view their own events regardless of status
CREATE POLICY "Users can view own events"
  ON events
  FOR SELECT
  TO authenticated
  USING (created_by = auth.uid());

-- Admins can do anything with events
CREATE POLICY "Admins can do anything with events"
  ON events
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = TRUE
    )
  );