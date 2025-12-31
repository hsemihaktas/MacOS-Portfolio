import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { subject, message, senderEmail } = await request.json();

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["hsemihaktas@gmail.com"],
      subject: `${subject || "Portfolio İletişim Formu"} - ${senderEmail}`,
      replyTo: senderEmail || "noreply@example.com",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #007AFF;">Yeni İletişim Mesajı</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0;"><strong>Gönderen:</strong> <a href="mailto:${senderEmail}" style="color: #007AFF;">${senderEmail}</a></p>
            <p style="margin: 0 0 10px 0;"><strong>Konu:</strong> ${subject}</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 15px 0;" />
            <p style="margin: 0;"><strong>Mesaj:</strong></p>
            <p style="white-space: pre-wrap; margin: 10px 0 0 0;">${message}</p>
          </div>
          <p style="color: #666; font-size: 12px;">Bu mesaja doğrudan yanıt vererek ${senderEmail} adresine mail gönderebilirsiniz.</p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
