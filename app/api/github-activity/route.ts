import { NextResponse } from "next/server";

export async function GET() {
  try {
    const year = new Date().getFullYear();
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/hsemihaktas?y=last`,
      { next: { revalidate: 3600 } },
    );

    if (!res.ok) {
      return NextResponse.json(
        { contributions: [], total: {} },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ contributions: [], total: {} }, { status: 500 });
  }
}
