import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { fullName, email, phone, password } = await req.json();
  const exists = await prisma.users.findUnique({
    where: {
      email,
    },
  });
  if (exists) {
    return NextResponse.json({ error: "users already exists" }, { status: 400 });
  } else {
    const users = await prisma.users.create({
      data: {
        fullName,
        phone,
        email,
        password: await hash(password, 10),
      },
    });
    return NextResponse.json(users);
  }
}
