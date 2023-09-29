import prisma from "@/libs/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { prodId: string } }
) {
  const { prodId } = params;
  const products = await prisma.product.findUnique({
    where: {
      productId: prodId,
    },
    include: {
      category: true,
    },
  });

  return NextResponse.json(products);
}
