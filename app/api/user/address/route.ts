import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const address = await req.json();
  const result = await prisma.address.create({
    data: address,
  });
  return NextResponse.json(result, { status: 201 });
}

export async function GET() {
  const address = await prisma.address.findMany();
  return NextResponse.json(address, { status: 200 });
}
