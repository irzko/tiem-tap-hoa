import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const categories = await prisma.category.findMany({
    where: {
      categoryGroupId: parseInt(id),
    },
  });
  
  return NextResponse.json(categories);
}
