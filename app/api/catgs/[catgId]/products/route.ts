import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { catgId: string } }
) {
  const { catgId } = params;
  const parentId = await prisma.category.findMany({
    where: {
      parentCategoryId: catgId,
    },
    select: {
      categoryId: true,
    },
  });

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
