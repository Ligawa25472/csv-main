import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, businessType, topic, preferredDate, preferredTime, format, notes } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const emailContent = `
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
    `;

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: 'info@mnaaccounting.co.ke',
      cc: 'info@alghahim.co.ke',
      subject: `New Booking Request from ${name}`,
      html: emailContent,
      replyTo: email,
    });

    return NextResponse.json(
      { message: 'Booking request sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Booking form error:', error);
    return NextResponse.json(
      { error: 'Failed to send booking request' },
      { status: 500 }
    );
  }
}
