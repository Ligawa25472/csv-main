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

  const { name, email, phone, businessType, topic, preferredDate, preferredTime, format, notes } = req.body ?? {};

  if (!name || !email || !phone) {
    res.status(400).json({ error: 'Please fill in all required fields: name, email, and phone.' });
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
    .from('appointment_bookings')
    .insert([{
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      phone: String(phone).trim(),
      business_type: businessType ? String(businessType).trim() : null,
      topic: topic ? String(topic).trim() : null,
      preferred_date: preferredDate || null,
      preferred_time: preferredTime || null,
      format: format ? String(format).trim() : null,
      notes: notes ? String(notes).trim() : null,
      status: 'pending',
    }]);

  if (dbError) {
    console.error('Supabase insert error:', dbError);
    res.status(500).json({ error: `Could not save your booking: ${dbError.message}` });
    return;
  }

  // Send emails asynchronously (don't block the response)
  const sendBookingEmails = async () => {
    const trimmedName = String(name).trim();
    const trimmedEmail = String(email).trim().toLowerCase();
    const trimmedPhone = String(phone).trim();
    const trimmedNotes = notes ? String(notes).trim().replace(/\n/g, '<br>') : 'None';

    try {
      // Email to customer (receipt)
      await resend.emails.send({
        from: 'noreply@mnaaccounting.co.uk',
        to: trimmedEmail,
        subject: 'Your Booking Request Has Been Received',
        html: `
          <h2>Thank You for Your Booking Request</h2>
          <p>Hi ${trimmedName},</p>
          <p>We have received your appointment booking request and will review your details shortly. Our team will contact you within 24 hours to confirm your appointment.</p>
          <hr>
          <p><strong>Booking Details:</strong></p>
          <p><strong>Name:</strong> ${trimmedName}</p>
          <p><strong>Phone:</strong> ${trimmedPhone}</p>
          <p><strong>Business Type:</strong> ${businessType ? String(businessType).trim() : 'Not specified'}</p>
          <p><strong>Topic:</strong> ${topic ? String(topic).trim() : 'Not specified'}</p>
          <p><strong>Preferred Date:</strong> ${preferredDate || 'Not specified'}</p>
          <p><strong>Preferred Time:</strong> ${preferredTime || 'Not specified'}</p>
          <p><strong>Meeting Format:</strong> ${format ? String(format).trim() : 'Not specified'}</p>
          <p><strong>Additional Notes:</strong></p>
          <p>${trimmedNotes}</p>
          <hr>
          <p>Best regards,<br>MNA Accounting Team</p>
        `,
      });
      console.log('[v0] Customer booking receipt email sent to:', trimmedEmail);
    } catch (err) {
      console.error('[v0] Customer booking email error:', err);
    }

    try {
      // Email to admin (new booking notification)
      await resend.emails.send({
        from: 'noreply@mnaaccounting.co.uk',
        to: 'info@mnaaccounting.co.uk',
        cc: 'info@alghahim.co.ke',
        subject: `New Booking Request from ${trimmedName}`,
        html: `
          <h2>New Appointment Booking</h2>
          <p><strong>Name:</strong> ${trimmedName}</p>
          <p><strong>Email:</strong> ${trimmedEmail}</p>
          <p><strong>Phone:</strong> ${trimmedPhone}</p>
          <p><strong>Business Type:</strong> ${businessType ? String(businessType).trim() : 'Not specified'}</p>
          <p><strong>Topic:</strong> ${topic ? String(topic).trim() : 'Not specified'}</p>
          <p><strong>Preferred Date:</strong> ${preferredDate || 'Not specified'}</p>
          <p><strong>Preferred Time:</strong> ${preferredTime || 'Not specified'}</p>
          <p><strong>Meeting Format:</strong> ${format ? String(format).trim() : 'Not specified'}</p>
          <p><strong>Additional Notes:</strong></p>
          <p>${trimmedNotes}</p>
          <hr>
          <p>Login to your dashboard to view and manage this booking.</p>
        `,
      });
      console.log('[v0] Admin booking notification email sent');
    } catch (err) {
      console.error('[v0] Admin booking email error:', err);
    }
  };

  // Send emails in background without blocking response
  if (resendKey) {
    console.log('[v0] RESEND_API_KEY is set, sending booking emails');
    sendBookingEmails();
  } else {
    console.error('[v0] RESEND_API_KEY is not set, booking emails will not be sent');
  }

  res.status(200).json({ success: true, message: 'Your booking request has been submitted. We will confirm your appointment within 24 hours.' });
}
