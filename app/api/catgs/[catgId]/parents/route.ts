import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { catgId: string } }
) {
  const { catgId } = params;
  const category = await prisma.category.findUnique({
    where: { categoryId: catgId },
    select: {
      categoryId: true,
      categoryName: true,
      parentCategoryId: true,
      parentCategory: true,
    },
  });
  return NextResponse.json(category);
}
