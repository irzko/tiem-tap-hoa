import prisma from "@/libs/prisma";
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
  });
  return NextResponse.json(category);
}
