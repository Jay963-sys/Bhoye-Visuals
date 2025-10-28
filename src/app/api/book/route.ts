import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

interface BookingData {
  name: string;
  email: string;
  phone?: string;
  shootType: string;
  date?: string;
  message?: string;
}

export async function POST(request: Request) {
  try {
    const data: BookingData = await request.json();
    const { name, email, phone, shootType, date, message } = data;

    const USER = process.env.EMAIL_USER;
    const PASS = process.env.EMAIL_PASS;
    const TO = process.env.EMAIL_TO;
    const BRAND_LOGO = process.env.BRAND_LOGO_URL || "";
    const SITE = process.env.SITE_NAME || "Bhoye Visuals";

    if (!USER || !PASS || !TO) {
      return NextResponse.json(
        { error: "Email not configured on server" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: USER,
        pass: PASS,
      },
    });

    // ------------------------
    // 📩 Email to Videographer
    // ------------------------
    const htmlContentToVideographer = `
      <div style="font-family: Arial, sans-serif; background-color: #202020; color: #ffffff; padding: 24px; border-radius: 12px; max-width: 600px; margin: auto;">
        ${
          BRAND_LOGO
            ? `<img src="${BRAND_LOGO}" alt="${SITE}" style="width:120px; margin-bottom:20px;"/>`
            : ""
        }
        <h2 style="color: #FF3100; margin-bottom: 8px;">New Booking Request</h2>
        <p style="color: #E5E5E5; margin-bottom: 24px;">You received a new booking via the ${SITE} website.</p>
        <table style="width:100%; border-collapse:collapse; color: #E5E5E5;">
          <tr><td style="padding:8px 0;"><strong>Name:</strong></td><td>${name}</td></tr>
          <tr><td style="padding:8px 0;"><strong>Email:</strong></td><td>${email}</td></tr>
          <tr><td style="padding:8px 0;"><strong>Phone:</strong></td><td>${
            phone || "—"
          }</td></tr>
          <tr><td style="padding:8px 0;"><strong>Shoot Type:</strong></td><td>${shootType}</td></tr>
          <tr><td style="padding:8px 0;"><strong>Date:</strong></td><td>${
            date || "—"
          }</td></tr>
          <tr><td style="padding:8px 0;"><strong>Message:</strong></td><td>${
            message || "—"
          }</td></tr>
        </table>
        <hr style="border: none; border-top: 1px solid #333; margin: 24px 0;">
        <p style="font-size: 12px; color: #888;">This message was sent from the booking form on <strong>${SITE}</strong>.</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"${SITE} Booking" <${USER}>`,
      to: TO,
      subject: `New Booking Request — ${name}`,
      html: htmlContentToVideographer,
    });

    // ------------------------
    // ✉️ Acknowledgment Email to Client
    // ------------------------
    const htmlContentToClient = `
      <div style="font-family: Arial, sans-serif; background-color: #202020; color: #ffffff; padding: 24px; border-radius: 12px; max-width: 600px; margin: auto;">
        ${
          BRAND_LOGO
            ? `<img src="${BRAND_LOGO}" alt="${SITE}" style="width:120px; margin-bottom:20px;"/>`
            : ""
        }
        <h2 style="color: #FF3100;">Thank You, ${name}!</h2>
        <p style="color: #E5E5E5;">Your booking request for <strong>${shootType}</strong> on <strong>${
      date || "your selected date"
    }</strong> has been received.</p>
        <p style="color: #CCCCCC; margin-bottom: 24px;">
          We’ll review your details and get back to you as soon as possible.  
          In the meantime, feel free to reply to this email if you have any additional information or questions.
        </p>
        <hr style="border:none; border-top:1px solid #333; margin:24px 0;">
        <p style="font-size: 13px; color: #999;">With appreciation,<br><strong>${SITE}</strong><br>
        📸 Capturing your best moments.</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"${SITE}" <${USER}>`,
      to: email,
      subject: `Your Booking with ${SITE} — Confirmation`,
      html: htmlContentToClient,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Booking and acknowledgment emails sent successfully",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Booking email error:", error);
    return NextResponse.json(
      { error: "Failed to send booking emails" },
      { status: 500 }
    );
  }
}
