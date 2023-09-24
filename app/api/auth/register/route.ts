import prisma from "@/libs/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { fullName, email, phoneNumber, password } = await req.json();
  const exists = await prisma.user.findUnique({
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
    const users = await prisma.user.create({
      data: {
        fullName,
        phoneNumber,
        email,
        password: await hash(password, 10),
      },
    });
    return NextResponse.json(users);
  }
}
