import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed. Use POST.' });
    return;
  }

  const supabaseUrl = process.env['NEXT_PUBLIC_SUPABASE_URL'];
  const supabaseKey = process.env['SUPABASE_SERVICE_ROLE_KEY'];
  const resendKey = process.env['RESEND_API_KEY'];

  if (!supabaseUrl || !supabaseKey) {
    res.status(500).json({ error: 'Database is not configured. Please contact support.' });
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  console.log('[v0] RESEND_API_KEY exists:', !!resendKey);
  const resend = resendKey ? new Resend(resendKey) : null;
  console.log('[v0] Resend client initialized:', !!resend);

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

  // Send emails asynchronously (don't block the response)
  const sendEmails = async () => {
    const trimmedName = String(name).trim();
    const trimmedEmail = String(email).trim().toLowerCase();
    const trimmedPhone = String(phone).trim();
    const trimmedMessage = String(message).trim().replace(/\n/g, '<br>');

    try {
      // Email to customer (receipt)
      console.log('[v0] Sending customer email...');
      const customerResult = await resend.emails.send({
        from: 'noreply@mnaaccounting.co.uk',
        to: trimmedEmail,
        subject: 'We Received Your Message',
        html: `
          <h2>Thank You for Contacting MNA Accounting</h2>
          <p>Hi ${trimmedName},</p>
          <p>We have received your message and will review it shortly. Our team will get back to you within 24 hours.</p>
          <hr>
          <p><strong>Your Details:</strong></p>
          <p><strong>Name:</strong> ${trimmedName}</p>
          <p><strong>Phone:</strong> ${trimmedPhone}</p>
          <p><strong>Message:</strong></p>
          <p>${trimmedMessage}</p>
          <hr>
          <p>Best regards,<br>MNA Accounting Team</p>
        `,
      });
      console.log('[v0] Customer email result:', customerResult);
      console.log('[v0] Customer receipt email sent to:', trimmedEmail);
    } catch (err) {
      console.error('[v0] Customer email error:', err);
    }

    try {
      // Email to admin (new query notification)
      console.log('[v0] Sending admin email...');
      const adminResult = await resend.emails.send({
        from: 'noreply@mnaaccounting.co.uk',
        to: 'info@mnaaccounting.co.uk',
        cc: 'info@alghahim.co.ke',
        subject: `New Website Query from ${trimmedName}`,
        html: `
          <h2>New Contact Request</h2>
          <p><strong>Name:</strong> ${trimmedName}</p>
          <p><strong>Email:</strong> ${trimmedEmail}</p>
          <p><strong>Phone:</strong> ${trimmedPhone}</p>
          <p><strong>Message:</strong></p>
          <p>${trimmedMessage}</p>
          <hr>
          <p>Login to your dashboard to view this message.</p>
        `,
      });
      console.log('[v0] Admin email result:', adminResult);
      console.log('[v0] Admin notification email sent');
    } catch (err) {
      console.error('[v0] Admin email error:', err);
    }
  };

  // Send emails in background without blocking response
  if (resendKey) {
    console.log('[v0] RESEND_API_KEY is set, sending emails');
    sendEmails();
  } else {
    console.error('[v0] RESEND_API_KEY is not set, emails will not be sent');
  }

  res.status(200).json({ success: true, message: 'Your message has been received. We will get back to you within 24 hours.' });
}
