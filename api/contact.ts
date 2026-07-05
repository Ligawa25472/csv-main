import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed. Use POST.' });
    return;
  }

  const supabaseUrl = process.env['NEXT_PUBLIC_SUPABASE_URL'];
  const supabaseKey = process.env['SUPABASE_SERVICE_ROLE_KEY'];

  if (!supabaseUrl || !supabaseKey) {
    res.status(500).json({ error: 'Database is not configured. Please contact support.' });
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { name, email, phone, message } = req.body ?? {};

  if (!name || !email || !phone || !message) {
    res.status(400).json({ error: 'Please fill in all required fields: name, email, phone, and message.' });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ error: 'Please enter a valid email address.' });
    return;
  }

  if (String(phone).trim().length < 10) {
    res.status(400).json({ error: 'Please enter a valid phone number (at least 10 digits).' });
    return;
  }

  const { error: dbError } = await supabase
    .from('contact_messages')
    .insert([{ name: String(name).trim(), email: String(email).trim().toLowerCase(), phone: String(phone).trim(), message: String(message).trim(), status: 'new' }]);

  if (dbError) {
    console.error('Supabase insert error:', dbError);
    res.status(500).json({ error: `Could not save your message: ${dbError.message}` });
    return;
  }

  res.status(200).json({ success: true, message: 'Your message has been received. We will get back to you within 24 hours.' });
}
