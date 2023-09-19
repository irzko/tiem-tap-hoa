import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { subcatgId: string } }
) {
  const subcategoryId = params.subcatgId;
  const subsubcategory = await prisma.subsubcategories.findMany({
    where: {
      subcategory_id: subcategoryId,
    },
  });

  return NextResponse.json(subsubcategory);
}
