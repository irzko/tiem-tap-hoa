import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  return NextResponse.json(
    await prisma.productImport.findMany({
      include: {
        Supplier: true,
        _count: {
          select: { ImportDetail: true },
        },
      },
    })
  );
};

export const POST = async (req: Request) => {
  const data: {
    supplierId: string;
    data: {
      productId: string;
      quantity: string;
      price: string;
    }[];
  } = await req.json();

  await prisma.productImport.create({
    data: {
      supplierId: data.supplierId,
      importDate: new Date(),
      status: "Đang chờ",
      totalValue: data.data.reduce(
        (acc, cur) => acc + Number(cur.quantity) * Number(cur.price),
        0
      ),
      ImportDetail: {
        create: data.data.map((item) => ({
          quantity: Number(item.quantity),
          price: Number(item.price),
          productId: item.productId,
          totalValue: Number(item.quantity) * Number(item.price),
        })),
      },
    },
  });
  return NextResponse.json(
    {
      message: "Create product import successfully!",
    },
    { status: 201 }
  );
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
