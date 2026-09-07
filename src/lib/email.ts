import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other services if needed
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
    },
});

export async function sendOtpEmail(to: string, otp: string) {
    const mailOptions = {
        from: `"HikingPlanet" <${process.env.SMTP_EMAIL}>`,
        to,
        subject: 'Your Login OTP - HikingPlanet',
        html: `
            <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px;">
                <h2 style="color: #e30613; margin-top: 0;">Login Verification</h2>
                <p>Hello,</p>
                <p>You requested to log in to your HikingPlanet profile. Your One-Time Password (OTP) is:</p>
                <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0;">
                    <span style="font-size: 28px; font-weight: bold; letter-spacing: 4px; color: #111;">${otp}</span>
                </div>
                <p style="color: #666; font-size: 14px;">This OTP will expire in 10 minutes. If you did not request this, please ignore this email.</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                <p style="font-size: 12px; color: #999; margin-bottom: 0;">&copy; ${new Date().getFullYear()} HikingPlanet. All rights reserved.</p>
            </div>
        `,
    };

    return transporter.sendMail(mailOptions);
}
