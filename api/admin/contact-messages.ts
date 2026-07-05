import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed.' });
    return;
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized. Please provide a valid token.' });
    return;
  }

  const token = authHeader.substring(7);

  const supabaseUrl = process.env['NEXT_PUBLIC_SUPABASE_URL'];
  const supabaseKey = process.env['SUPABASE_SERVICE_ROLE_KEY'];

  if (!supabaseUrl || !supabaseKey) {
    res.status(500).json({ error: 'Server configuration error.' });
    return;
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Verify token and get admin user
    const { data: session, error: sessionError } = await supabase
      .from('admin_sessions')
      .select('admin_id, expires_at')
      .eq('token', token)
      .single();

    if (sessionError || !session) {
      res.status(401).json({ error: 'Invalid or expired token.' });
      return;
    }

    // Check if token is expired
    if (new Date(session.expires_at) < new Date()) {
      res.status(401).json({ error: 'Token has expired.' });
      return;
    }

    // Fetch contact messages
    const { data: messages, error: messagesError } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (messagesError) {
      res.status(500).json({ error: 'Failed to fetch messages.' });
      return;
    }

    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    console.error('[v0] Fetch messages error:', error);
    res.status(500).json({ error: 'An error occurred while fetching messages.' });
  }
}
