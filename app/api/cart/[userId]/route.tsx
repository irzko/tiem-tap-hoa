import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  const cart = await prisma.cart.findMany({
    where: {
      userId,
    },
    include: {
      product: {
        select: {
          productName: true,
          price: true,
          images: true,
          stockQuantity: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return NextResponse.json(cart);
}
