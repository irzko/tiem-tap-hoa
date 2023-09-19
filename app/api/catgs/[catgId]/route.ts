import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function GET(
  request: Request,
  { params }: { params: { catgId: string } }
) {
  const categoryId = params.catgId;
  const category = await prisma.categories.findUnique({
    where: {
      category_id: categoryId,
    },
  });

  return NextResponse.json(category);
}
