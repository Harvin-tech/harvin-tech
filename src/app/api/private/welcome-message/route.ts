import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Export the handler function directly, not as "default"
export async function POST(request: Request) {
  try {
    // For Next.js App Router, you don't check request.method
    // as the route handler is already method-specific

    // Use request.json() or request.formData() correctly
    // Note: request.formData is a method, not a property
    const formData = await request.formData();
    const email = formData.get('email')?.toString().trim();
    const name = formData.get('name')?.toString().trim();

    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      );
    }

    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: `"Harvinn" <${process.env.EMAIL_USER}>`, // Don't hardcode email
      to: email,
      subject: 'Welcome to Your Learning Journey! 🎉',
      html: `
        <h1>Welcome aboard, ${name}!</h1>
        <p>We're thrilled to have you join our educational community.</p>
        <p>Get ready to embark on an exciting learning adventure with us. Here's what you can expect:</p>
        <ul>
          <li>Interactive lessons</li>
          <li>Expert instructors</li>
          <li>Practical assignments</li>
          <li>Community support</li>
        </ul>
        <p>Start exploring your course now and let the learning begin!</p>
        <p>Best wishes,<br>The Harvinn Team</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Welcome email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send welcome email' },
      { status: 500 }
    );
  }
}
