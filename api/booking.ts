import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

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
    // Initialize Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    );

    const { name, email, phone, businessType, topic, preferredDate, preferredTime, format, notes } = req.body;

    // Validate input
    if (!name || !email || !phone) {
      res.status(400).json({
        error: 'Missing required fields. Please provide name, email, and phone number.'
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        error: 'Invalid email address. Please enter a valid email.'
      });
      return;
    }

    // Validate phone
    if (phone.length < 10) {
      res.status(400).json({
        error: 'Invalid phone number. Please enter a valid phone number.'
      });
      return;
    }

    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      res.status(500).json({
        error: 'Database service is not configured. Please contact support.'
      });
      return;
    }

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
        },
      ])
      .select();

    if (dbError) {
      console.error('Database error:', dbError);
      res.status(500).json({
        error: `Failed to save your booking: ${dbError.message}`
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Your booking request has been submitted successfully. We will contact you within 24 hours.'
    });
  } catch (error) {
    console.error('Booking API error:', error);
    
    if (res.headersSent) {
      return;
    }

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    res.status(500).json({
      error: `An error occurred while processing your booking: ${errorMessage}`
    });
  }
}
