import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Initialize Resend for email sending
  const resend = new Resend(process.env['RESEND_API_KEY']);

  // Initialize Supabase for database operations
  const supabase = createClient(
    process.env['NEXT_PUBLIC_SUPABASE_URL'] || '',
    process.env['SUPABASE_SERVICE_ROLE_KEY'] || ''
  );

  // Email API endpoint for contact form
  server.post('/api/contact', express.json(), async (req, res): Promise<void> => {
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

    try {
      // First, save to database
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
        console.error('Database error:', dbError);
        res.status(500).json({ 
          error: 'Failed to save your message to our database. Please try again later.' 
        });
        return;
      }

      const messageId = dbData?.[0]?.id;

      // Send email using Resend
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
        console.error('Email error:', emailResult.error);
        
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
      console.error('Contact form error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ 
        error: `An error occurred while processing your request: ${errorMessage}. Please try again later.` 
      });
    }
  });

  // Email API endpoint for booking form
  server.post('/api/booking', express.json(), async (req, res): Promise<void> => {
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

    try {
      // First, save to database
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
        console.error('Database error:', dbError);
        res.status(500).json({ 
          error: 'Failed to save your booking request to our database. Please try again later.' 
        });
        return;
      }

      const bookingId = dbData?.[0]?.id;

      // Send email using Resend
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
        console.error('Email error:', emailResult.error);
        
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
      console.error('Booking form error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ 
        error: `An error occurred while processing your booking: ${errorMessage}. Please try again later.` 
      });
    }
  });

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('**', express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html',
  }));

  // All regular routes use the Angular engine
  server.get('**', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
