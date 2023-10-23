import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

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
      Review: {
        select: {
          reviewId: true,
          rating: true,
          review: true,
          createdAt: true,
          user: {
            select: {
              userId: true,
              fullName: true,
            },
          },
          _count: {
            select: {
              Usefulness: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json(products);
}

export const DELETE = async (req: Request) => {
  const { productId } = await req.json();
  const product = prisma.product.delete({
    where: {
      productId,
    },
  });

  return NextResponse.json(product, { status: 200 });
};
