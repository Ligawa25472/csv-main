import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import * as bcrypt from 'bcryptjs';

const ALLOWED_DOMAINS = ['mnaaccounting.co.uk', 'alghahim.co.ke'];

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

  const { email, password, fullName } = req.body ?? {};

  if (!email || !password || !fullName) {
    res.status(400).json({ error: 'Please provide email, password, and full name.' });
    return;
  }

  const emailLower = String(email).trim().toLowerCase();
  const domain = emailLower.split('@')[1];

  // Validate email domain
  if (!ALLOWED_DOMAINS.includes(domain)) {
    res.status(403).json({ error: 'Only authorized domain emails can create accounts.' });
    return;
  }

  // Validate password strength
  if (String(password).length < 8) {
    res.status(400).json({ error: 'Password must be at least 8 characters long.' });
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(String(password), 10);

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error: insertError } = await supabase
      .from('admin_users')
      .insert([{
        email: emailLower,
        password_hash: hashedPassword,
        full_name: String(fullName).trim(),
      }]);

    if (insertError) {
      if (insertError.message.includes('duplicate')) {
        res.status(409).json({ error: 'This email is already registered.' });
      } else {
        res.status(500).json({ error: 'Failed to create account. Please try again.' });
      }
      return;
    }

    res.status(201).json({ success: true, message: 'Account created successfully. Please log in.' });
  } catch (error) {
    console.error('[v0] Signup error:', error);
    res.status(500).json({ error: 'An error occurred during signup.' });
  }
}
