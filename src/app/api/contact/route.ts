import { NextRequest, NextResponse } from "next/server";

type AttachmentMeta = {
  name: string;
  size: number;
  type: string;
};

type ContactPayload = {
  services: string[];
  area: string;
  rooms: string;
  deadline?: string;
  email: string;
  attachments?: AttachmentMeta[];
};

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Partial<ContactPayload>;

  if (!body.services || body.services.length === 0 || !body.area || !body.rooms || !body.email) {
    return NextResponse.json(
      { error: "Brakuje wymaganych danych formularza." },
      { status: 400 }
    );
  }

  // Placeholder for integrating email/CRM provider.
  console.log("Nowe zgłoszenie z formularza kontaktowego:", JSON.stringify(body, null, 2));

  return NextResponse.json({ success: true });
}

