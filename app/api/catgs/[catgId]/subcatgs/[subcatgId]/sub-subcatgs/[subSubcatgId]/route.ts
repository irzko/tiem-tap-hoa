import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { subSubcatgId: string } }
) {
  const subSubcategoryId = params.subSubcatgId;
  const subcategory = await prisma.subsubcategories.findUnique({
    where: {
      subsubcategory_id: subSubcategoryId,
    },
  });

  return NextResponse.json(subcategory);
}
