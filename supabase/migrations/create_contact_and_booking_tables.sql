-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'archived')),
  email_sent BOOLEAN DEFAULT FALSE,
  email_error TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create appointment_bookings table
CREATE TABLE IF NOT EXISTS appointment_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  business_type TEXT,
  topic TEXT,
  preferred_date DATE,
  preferred_time TIME,
  format TEXT,
  notes TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  email_sent BOOLEAN DEFAULT FALSE,
  email_error TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS contact_messages_email_idx ON contact_messages(email);
CREATE INDEX IF NOT EXISTS contact_messages_created_at_idx ON contact_messages(created_at);
CREATE INDEX IF NOT EXISTS appointment_bookings_email_idx ON appointment_bookings(email);
CREATE INDEX IF NOT EXISTS appointment_bookings_created_at_idx ON appointment_bookings(created_at);
CREATE INDEX IF NOT EXISTS appointment_bookings_status_idx ON appointment_bookings(status);

-- Enable Row Level Security
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointment_bookings ENABLE ROW LEVEL SECURITY;

-- Create policies to allow all operations (since we're using service role key on server)
CREATE POLICY "Allow all contact message operations" ON contact_messages
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all booking operations" ON appointment_bookings
  FOR ALL USING (true) WITH CHECK (true);
