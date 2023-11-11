import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";


export async function GET(req: NextRequest) {
  const products = await prisma.product.findMany({
    where: {
      stockQuantity: {
        gt: 0,
      },
    },
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