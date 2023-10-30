import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  return NextResponse.json(await prisma.productImport.findMany());
};

export const POST = async (req: Request) => {
  const data = await req.json();
  await prisma.productImport.create({
    data: {
      supplierId: data.supplierId,
      totalValue: data.quantity * data.price,
      importDate: new Date(),
      status: "Đang chờ",
    },
  });
};

export const PUT = async (req: Request) => {
  const { productImportId, ...data } = await req.json();
  return NextResponse.json(
    await prisma.productImport.update({
      where: { productImportId },
      data,
    }),
    { status: 201 }
  );
};
