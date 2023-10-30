import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { catgId: string } }
) {
  const { catgId } = params;
  const category = await prisma.category.findMany({
    where: {
      parentCategoryId: catgId,
    },
    include: {
      _count: {
        select: { subCategories: true },
      },
    },
  });
  return NextResponse.json(category);
}
