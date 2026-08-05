import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import dbConnect from '@/lib/db';
import { Enquiry } from '@/models/Enquiry';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, mobile, email, city, trek, month, trekkers, experience, message, source } = body;

    if (!name || !mobile || !email) {
      return NextResponse.json(
        { error: 'Name, mobile, and email are required.' },
        { status: 400 }
      );
    }

    // Connect to database and save enquiry
    await dbConnect();
    const newEnquiry = await Enquiry.create({
      name,
      mobile,
      email,
      city,
      trek,
      month,
      trekkers,
      experience,
      message,
    });

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const subject = source === 'butter-festival' 
      ? '🏔️ New Butter Festival Registration – HikingPlanet' 
      : '🏔️ New Trek Enquiry – HikingPlanet';

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: 'trekplanet.official@gmail.com',
      subject,
      html: `
        <h2>New Registration / Enquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Mobile:</strong> ${mobile}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>City:</strong> ${city || 'Not specified'}</p>
        <p><strong>Trek/Event:</strong> ${trek || 'Not specified'}</p>
        <p><strong>Preferred Month/Date:</strong> ${month || 'Not specified'}</p>
        <p><strong>Number of Trekkers:</strong> ${trekkers || 'Not specified'}</p>
        <p><strong>Experience Level:</strong> ${experience || 'Not specified'}</p>
        <p><strong>Message:</strong><br/>${message || 'None'}</p>
        <hr/>
        <p><strong>Date Received:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, data: newEnquiry }, { status: 201 });
  } catch (error) {
    console.error('Error in /api/enquiry:', error);
    return NextResponse.json(
      { error: 'Internal server error while submitting enquiry.' },
      { status: 500 }
    );
  }
}
