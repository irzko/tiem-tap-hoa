import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { catgId: string } }
) {
  const { catgId } = params;
  const category = await prisma.product.findMany({
    where: {
      categoryId: catgId,
    },
  });
  return NextResponse.json(category);
}
