import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed.' });
    return;
  }

  const supabaseUrl = process.env['NEXT_PUBLIC_SUPABASE_URL'];
  const supabaseKey = process.env['SUPABASE_SERVICE_ROLE_KEY'];

  if (!supabaseUrl || !supabaseKey) {
    res.status(500).json({ error: 'Server configuration error.' });
    return;
  }

  const { email, password } = req.body ?? {};

  if (!email || !password) {
    res.status(400).json({ error: 'Please provide email and password.' });
    return;
  }

  const emailLower = String(email).trim().toLowerCase();

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get user by email
    const { data: users, error: queryError } = await supabase
      .from('admin_users')
      .select('id, email, password_hash, full_name, is_active')
      .eq('email', emailLower)
      .single();

    if (queryError || !users) {
      console.error('[v0] Admin user query error:', queryError);
      console.error('[v0] User not found for email:', emailLower);
      res.status(401).json({ error: 'Invalid email or password.' });
      return;
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(String(password), users.password_hash);
    console.error('[v0] Password match result:', passwordMatch);
    if (!passwordMatch) {
      res.status(401).json({ error: 'Invalid email or password.' });
      return;
    }

    // Check if user is active
    if (!users.is_active) {
      res.status(403).json({ error: 'Your account has been disabled.' });
      return;
    }

    // Generate session token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create session
    const { error: sessionError } = await supabase
      .from('admin_sessions')
      .insert([{
        admin_id: users.id,
        token,
        expires_at: expiresAt.toISOString(),
      }]);

    if (sessionError) {
      res.status(500).json({ error: 'Failed to create session.' });
      return;
    }

    // Update last login
    await supabase
      .from('admin_users')
      .update({ last_login_at: new Date().toISOString() })
      .eq('id', users.id)
      .catch(() => {});

    res.status(200).json({
      success: true,
      token,
      user: {
        id: users.id,
        email: users.email,
        fullName: users.full_name,
      },
    });
  } catch (error) {
    console.error('[v0] Login error:', error);
    res.status(500).json({ error: 'An error occurred during login.' });
  }
}
