import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

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

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set');
      return NextResponse.json(
        { error: 'Email service is not configured' },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

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

    const result = await resend.emails.send({
      from: 'noreply@mnaaccounting.co.uk',
      to: 'info@mnaaccounting.co.ke',
      cc: 'info@alghahim.co.ke',
      subject: `New Booking Request from ${name}`,
      html: emailContent,
      replyTo: email,
    });

    if (result.error) {
      throw new Error(result.error.message);
    }

    return NextResponse.json(
      { message: 'Booking request sent successfully', id: result.data?.id },
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
