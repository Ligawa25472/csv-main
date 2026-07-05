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

    const { name, email, phone, message } = req.body;

    // Validate input
    if (!name || !email || !phone || !message) {
      res.status(400).json({
        error: 'Missing required fields. Please provide name, email, phone, and message.'
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
      .from('contact_messages')
      .insert([
        {
          name,
          email,
          phone,
          message,
        },
      ])
      .select();

    if (dbError) {
      console.error('Database error:', dbError);
      res.status(500).json({
        error: `Failed to save your message: ${dbError.message}`
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Your message has been received successfully. Thank you for contacting us.'
    });
  } catch (error) {
    console.error('Contact API error:', error);
    
    if (res.headersSent) {
      return;
    }

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    res.status(500).json({
      error: `An error occurred while processing your request: ${errorMessage}`
    });
  }
}
