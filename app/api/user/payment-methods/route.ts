import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { accountInfo, ...data } = await req.json();

  const paymentMethod = await prisma.paymentMethod.create({
    data: { accountInfo: JSON.parse(accountInfo), ...data },
  });

  return NextResponse.json(paymentMethod, { status: 201 });
};

export const GET = async (req: Request) => {
  const paymentMethods = await prisma.paymentMethod.findMany();

  return NextResponse.json(paymentMethods, { status: 200 });
};
