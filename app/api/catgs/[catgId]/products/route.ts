import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { catgId: string } }
) {
  const { catgId } = params;
  const searchParams = request.nextUrl.searchParams;
  const priceFrom = searchParams.get("priceFrom");
  const priceTo = searchParams.get("priceTo");

  const parentId = await prisma.category.findMany({
    where: {
      parentCategoryId: catgId,
    },
    select: {
      categoryId: true,
    },
  });

  if (priceFrom !== "undefined" && priceTo !== "undefined") {
    const category = await prisma.product.findMany({
      where: {
        OR: [
          {
            categoryId: catgId,
          },
          {
            categoryId: {
              in: parentId.map((item) => item.categoryId),
            },
          },
        ],
        price: {
          gte: Number(priceFrom),
          lte: Number(priceTo),
        },
      },
    });
    return NextResponse.json(category);
  } else if (priceFrom !== "undefined") {
    const category = await prisma.product.findMany({
      where: {
        OR: [
          {
            categoryId: catgId,
          },
          {
            categoryId: {
              in: parentId.map((item) => item.categoryId),
            },
          },
        ],
        price: {
          gte: Number(priceFrom),
        },
      },
    });
    return NextResponse.json(category);
  } else if (priceTo !== "undefined") {
    const category = await prisma.product.findMany({
      where: {
        OR: [
          {
            categoryId: catgId,
          },
          {
            categoryId: {
              in: parentId.map((item) => item.categoryId),
            },
          },
        ],
        price: {
          lte: Number(priceTo),
        },
      },
    });
    return NextResponse.json(category);
  } else {
    const category = await prisma.product.findMany({
      where: {
        OR: [
          {
            categoryId: catgId,
          },
          {
            categoryId: {
              in: parentId.map((item) => item.categoryId),
            },
          },
        ],
      },
    });

    return NextResponse.json(category);
  }
}
