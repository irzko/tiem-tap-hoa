import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { full_name, email, phone_number, password } = await req.json();
  const exists = await prisma.users.findUnique({
    where: {
      email,
    },
  });
  if (exists) {
    return NextResponse.json(
      { error: "users already exists" },
      { status: 400 }
    );
  } else {
    const users = await prisma.users.create({
      data: {
        full_name,
        phone_number,
        email,
        password_hash: await hash(password, 10),
      },
    });
    return NextResponse.json(users);
  }
}
