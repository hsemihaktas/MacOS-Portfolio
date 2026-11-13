import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Geçersiz istek gövdesi / Invalid request body" },
        { status: 400 },
      );
    }

    const { subject, message, senderEmail } = body as {
      subject?: unknown;
      message?: unknown;
      senderEmail?: unknown;
    };

    if (
      typeof senderEmail !== "string" ||
      !EMAIL_REGEX.test(senderEmail.trim()) ||
      senderEmail.length > 254
    ) {
      return NextResponse.json(
        { error: "Geçerli bir e-posta adresi giriniz / Invalid email address" },
        { status: 400 },
      );
    }

    if (
      typeof message !== "string" ||
      !message.trim() ||
      message.length > 5000
    ) {
      return NextResponse.json(
        { error: "Mesaj alanı boş bırakılamaz (maksimum 5000 karakter)" },
        { status: 400 },
      );
    }

    const cleanSubject =
      typeof subject === "string" && subject.trim()
        ? subject.trim().slice(0, 200)
        : "Portfolio İletişim Formu";

    const cleanEmail = senderEmail.trim();
    const cleanMessage = message.trim();

    const safeEmail = escapeHtml(cleanEmail);
    const safeSubject = escapeHtml(cleanSubject);
    const safeMessage = escapeHtml(cleanMessage);

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [process.env.CONTACT_EMAIL ?? "hsemihaktas@gmail.com"],
      subject: `${cleanSubject} - ${cleanEmail}`,
      replyTo: cleanEmail,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #007AFF;">Yeni İletişim Mesajı</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0;"><strong>Gönderen:</strong> <a href="mailto:${safeEmail}" style="color: #007AFF;">${safeEmail}</a></p>
            <p style="margin: 0 0 10px 0;"><strong>Konu:</strong> ${safeSubject}</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 15px 0;" />
            <p style="margin: 0;"><strong>Mesaj:</strong></p>
            <p style="white-space: pre-wrap; margin: 10px 0 0 0;">${safeMessage}</p>
          </div>
          <p style="color: #666; font-size: 12px;">Bu mesaja doğrudan yanıt vererek ${safeEmail} adresine mail gönderebilirsiniz.</p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to send email";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
