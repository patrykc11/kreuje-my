import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const services = JSON.parse(formData.get("services") as string) as string[];
    const area = formData.get("area") as string;
    const rooms = formData.get("rooms") as string;
    const deadline = (formData.get("deadline") as string) || "Nie podano";
    const email = formData.get("email") as string;
    const attachmentFiles = formData.getAll("attachments") as File[];

    if (!services || services.length === 0 || !area || !rooms || !email) {
      return NextResponse.json(
        { error: "Brakuje wymaganych danych formularza." },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error(
        "RESEND_API_KEY nie jest ustawiony w zmiennych środowiskowych"
      );
      return NextResponse.json(
        { error: "Błąd konfiguracji serwera." },
        { status: 500 }
      );
    }

    const attachments = await Promise.all(
      attachmentFiles.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        return {
          filename: file.name,
          content: buffer,
        };
      })
    );

    const recipientEmail =
      process.env.RECIPIENT_EMAIL || "kontakt.kreujemy@gmail.com";

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #92400e; border-bottom: 2px solid #92400e; padding-bottom: 10px;">
          Nowe zgłoszenie z formularza kontaktowego
        </h2>
        
        <div style="margin-top: 20px;">
          <p><strong>Email klienta:</strong> ${email}</p>
          <p><strong>Zakres usług:</strong> ${services.join(", ")}</p>
          <p><strong>Metraż:</strong> ${area}</p>
          <p><strong>Liczba pomieszczeń:</strong> ${rooms}</p>
          <p><strong>Termin wykonania:</strong> ${deadline}</p>
        </div>
        
        ${
          attachments.length > 0
            ? `
          <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
            <p><strong>Załączniki (${attachments.length}):</strong></p>
            <ul>
              ${attachments.map((att) => `<li>${att.filename}</li>`).join("")}
            </ul>
          </div>
        `
            : ""
        }
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "formularz.projektowy@resend.dev",
      to: recipientEmail,
      replyTo: email,
      subject: `Nowe zgłoszenie z formularza - ${email}`,
      html: emailHtml,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    if (error) {
      console.error("Błąd wysyłania emaila przez Resend:", error);
      return NextResponse.json(
        { error: "Błąd przy wysyłaniu formularza." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, messageId: data?.id });
  } catch (error) {
    console.error("Błąd przetwarzania formularza:", error);
    return NextResponse.json(
      { error: "Błąd przy wysyłaniu formularza." },
      { status: 500 }
    );
  }
}
