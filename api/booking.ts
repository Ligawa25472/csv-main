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

    const { name, email, phone, businessType, topic, preferredDate, preferredTime, format, notes } = req.body;

    console.log('[v0] Booking API called with:', { name, email, phone });

    // Validate input
    if (!name || !email || !phone) {
      console.log('[v0] Validation failed - missing fields');
      res.status(400).json({
        error: 'Missing required fields. Please provide name, email, and phone number.'
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

    console.log('[v0] Saving booking to Supabase...');

    // Save to database
    const { data: dbData, error: dbError } = await supabase
      .from('appointment_bookings')
      .insert([
        {
          name,
          email,
          phone,
          business_type: businessType,
          topic,
          preferred_date: preferredDate,
          preferred_time: preferredTime,
          format,
          notes,
          email_sent: false,
        },
      ])
      .select();

    if (dbError) {
      console.error('[v0] Database error:', dbError);
      res.status(500).json({
        error: `Failed to save your booking request to our database: ${dbError.message}`
      });
      return;
    }

    console.log('[v0] Booking saved with ID:', dbData?.[0]?.id);

    const bookingId = dbData?.[0]?.id;

    // Send email
    console.log('[v0] Sending email via Resend...');

    const emailResult = await resend.emails.send({
      from: 'noreply@mnaaccounting.co.uk',
      to: 'info@mnaaccounting.co.ke',
      cc: 'info@alghahim.co.ke',
      replyTo: email,
      subject: `New Booking Request from ${name}`,
      html: `
        <h2>New Booking Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Business Type:</strong> ${businessType || 'Not specified'}</p>
        <p><strong>Consultation Topic:</strong> ${topic || 'Not specified'}</p>
        <p><strong>Preferred Date:</strong> ${preferredDate || 'Not specified'}</p>
        <p><strong>Preferred Time:</strong> ${preferredTime || 'Not specified'}</p>
        <p><strong>Meeting Format:</strong> ${format || 'Not specified'}</p>
        <p><strong>Additional Notes:</strong></p>
        <p>${notes ? notes.replace(/\n/g, '<br>') : 'None'}</p>
      `,
    });

    if (emailResult.error) {
      console.error('[v0] Email error:', emailResult.error);

      // Update database to record email failure
      if (bookingId) {
        await supabase
          .from('appointment_bookings')
          .update({ email_error: emailResult.error.message })
          .eq('id', bookingId);
      }

      res.status(500).json({
        error: `Failed to send confirmation email: ${emailResult.error.message}. Your booking has been saved and we will contact you soon.`
      });
      return;
    }

    console.log('[v0] Email sent successfully');

    // Update database to mark email as sent
    if (bookingId) {
      await supabase
        .from('appointment_bookings')
        .update({ email_sent: true })
        .eq('id', bookingId);
    }

    res.status(200).json({
      success: true,
      message: 'Your booking request has been submitted successfully. We will confirm your appointment within 24 hours.'
    });
  } catch (error) {
    console.error('[v0] Booking form error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({
      error: `An error occurred while processing your booking: ${errorMessage}. Please try again later.`
    });
  }
}
