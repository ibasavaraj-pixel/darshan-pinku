import { NextResponse } from "next/server";
import { getCount, incrementCount } from "@/lib/counter";

export async function GET() {
  return NextResponse.json({ count: await getCount() });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const name = typeof body.name === "string" ? body.name.trim().slice(0, 30) : "";
  const person = typeof body.person === "string" ? body.person.slice(0, 30) : "unknown";

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  return NextResponse.json({ count: await incrementCount(name, person) });
}
