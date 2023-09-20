import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { subsubcatgId: string } }
) {
  const subsubcategoryId = params.subsubcatgId;
  const subcategory = await prisma.subsubcategories.findUnique({
    where: {
      subsubcategory_id: subsubcategoryId,
    },
  });

  return NextResponse.json(subcategory);
}
