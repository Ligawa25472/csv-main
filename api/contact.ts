import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    // Initialize clients inside handler to ensure env vars are available
    const resend = new Resend(process.env.RESEND_API_KEY);
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    );

    const { name, email, phone, message } = req.body;

    console.log('[v0] Contact API called with:', { name, email, phone, hasMessage: !!message });

    // Validate input
    if (!name || !email || !phone || !message) {
      console.log('[v0] Validation failed - missing fields');
      res.status(400).json({
        error: 'Missing required fields. Please provide name, email, phone, and message.'
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('[v0] Invalid email format');
      res.status(400).json({
        error: 'Invalid email address. Please enter a valid email.'
      });
      return;
    }

    // Validate phone
    if (phone.length < 10) {
      console.log('[v0] Invalid phone number');
      res.status(400).json({
        error: 'Invalid phone number. Please enter a valid phone number.'
      });
      return;
    }

    // Check if Supabase is initialized
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('[v0] Supabase not configured');
      res.status(500).json({
        error: 'Database service is not configured. Please contact support.'
      });
      return;
    }

    console.log('[v0] Saving to Supabase...');

    // Save to database
    const { data: dbData, error: dbError } = await supabase
      .from('contact_messages')
      .insert([
        {
          name,
          email,
          phone,
          message,
          email_sent: false,
        },
      ])
      .select();

    if (dbError) {
      console.error('[v0] Database error:', dbError);
      res.status(500).json({
        error: `Failed to save your message to our database: ${dbError.message}`
      });
      return;
    }

    console.log('[v0] Message saved with ID:', dbData?.[0]?.id);

    const messageId = dbData?.[0]?.id;

    // Send email
    console.log('[v0] Sending email via Resend...');

    const emailResult = await resend.emails.send({
      from: 'noreply@mnaaccounting.co.uk',
      to: 'info@mnaaccounting.co.ke',
      cc: 'info@alghahim.co.ke',
      replyTo: email,
      subject: `New Contact Request from ${name}`,
      html: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (emailResult.error) {
      console.error('[v0] Email error:', emailResult.error);

      // Update database to record email failure
      if (messageId) {
        await supabase
          .from('contact_messages')
          .update({ email_error: emailResult.error.message })
          .eq('id', messageId);
      }

      res.status(500).json({
        error: `Failed to send email: ${emailResult.error.message}. Your message has been saved and we will contact you soon.`
      });
      return;
    }

    console.log('[v0] Email sent successfully');

    // Update database to mark email as sent
    if (messageId) {
      await supabase
        .from('contact_messages')
        .update({ email_sent: true })
        .eq('id', messageId);
    }

    res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully. We will get back to you within 24 hours.'
    });
  } catch (error) {
    console.error('[v0] Contact form error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({
      error: `An error occurred while processing your request: ${errorMessage}. Please try again later.`
    });
  }
}
