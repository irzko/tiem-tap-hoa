import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { catgId: string } }
) {
  const categoryId = params.catgId;

  const categories = await prisma.subcategories.findMany({
    where: {
      category_id: parseInt(categoryId),
    },
  });
  return NextResponse.json(categories);
}
