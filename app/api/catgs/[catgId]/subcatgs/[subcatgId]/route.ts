import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { subcatgId: string } }
) {
  const subcategoryId = params.subcatgId;
  const subcategory = await prisma.subcategories.findUnique({
    where: {
      subcategory_id: parseInt(subcategoryId),
    },
  });

  return NextResponse.json(subcategory);
}
