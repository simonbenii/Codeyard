import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "MISSING" }, { status: 400 });
    }

    return NextResponse.json({ message: "SUCCESS" }, { status: 200 });
  } catch (error) {
    console.error("API hiba:", error);
    return NextResponse.json(
      { message: "Belső hiba történt." },
      { status: 500 }
    );
  }
}
