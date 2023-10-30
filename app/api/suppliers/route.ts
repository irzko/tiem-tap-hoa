import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  return NextResponse.json(await prisma.supplier.findMany());
};

export const POST = async (req: Request) => {
  const data = await req.json();
  return NextResponse.json(
    await prisma.supplier.create({
      data,
    }),
    { status: 201 }
  );
};

export const PUT = async (req: Request) => {
  const { supplierId, ...data } = await req.json();
  return NextResponse.json(
    await prisma.supplier.update({
      where: { supplierId },
      data,
    }),
    { status: 201 }
  );
};
