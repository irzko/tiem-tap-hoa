import prisma from "@/libs/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const product = await req.json();

  await prisma.product.create({
    data: product,
  });

  return NextResponse.json({ message: "Tải lên thành công." }, { status: 201 });
}

export async function GET(req: NextRequest) {
  const products = await prisma.product.findMany({
    include: {
      category: {
        select: {
          categoryName: true,
        },
      },
    },
  });

  return NextResponse.json(products);
}
