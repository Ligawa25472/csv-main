import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import { Resend } from 'resend';

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

  // Email API endpoint for contact form
  server.post('/api/contact', express.json(), async (req, res) => {
    try {
      const { name, email, phone, message } = req.body;

      // Validate input
      if (!name || !email || !phone || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
      }

      // Send email using Resend
      const result = await resend.emails.send({
        from: 'MNA Accounting <onboarding@resend.dev>',
        to: 'info@mnaaccounting.co.uk',
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

      if (result.error) {
        console.error('Resend error:', result.error);
        return res.status(500).json({ error: 'Failed to send email' });
      }

      // Also send confirmation email to the user
      await resend.emails.send({
        from: 'MNA Accounting <onboarding@resend.dev>',
        to: email,
        subject: 'We received your message - MNA Accounting',
        html: `
          <p>Hello ${name},</p>
          <p>Thank you for contacting MNA Accounting. We have received your message and will get back to you within one working day.</p>
          <p>Best regards,<br>MNA Accounting Team</p>
        `,
      });

      return res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
      console.error('Contact form error:', error);
      return res.status(500).json({ error: 'An error occurred while processing your request' });
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
