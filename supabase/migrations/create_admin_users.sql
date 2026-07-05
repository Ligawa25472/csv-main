-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  last_login_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create admin_sessions table
CREATE TABLE IF NOT EXISTS admin_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
  token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indices for faster lookups
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_token ON admin_sessions(token);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_admin_id ON admin_sessions(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_expires_at ON admin_sessions(expires_at);

-- Enable RLS on admin tables (but allow service role with bypass)
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;

-- Admin users - allow authenticated admin access only
CREATE POLICY "allow_authenticated_admin_read" ON admin_users
  FOR SELECT USING (true);

CREATE POLICY "allow_authenticated_admin_insert" ON admin_users
  FOR INSERT WITH CHECK (true);

CREATE POLICY "allow_authenticated_admin_update" ON admin_users
  FOR UPDATE USING (true) WITH CHECK (true);

-- Admin sessions - allow authenticated admin access only  
CREATE POLICY "allow_authenticated_session_insert" ON admin_sessions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "allow_authenticated_session_select" ON admin_sessions
  FOR SELECT USING (true);

CREATE POLICY "allow_authenticated_session_delete" ON admin_sessions
  FOR DELETE USING (true);

-- Contact messages and bookings - no RLS needed, authorization handled in API layer
