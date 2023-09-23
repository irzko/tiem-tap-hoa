import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { subcatgId: string } }
) {
  const subcategoryId = params.subcatgId;

  if (subcategoryId === "all") {
    const subsubcategories = await prisma.subsubcategories.findMany({
      orderBy: {
        subsubcategory_name: "asc",
      },
    });
    return NextResponse.json(subsubcategories);
  } else {
    const subsubcategories = await prisma.subsubcategories.findMany({
      where: {
        subcategory_id: subcategoryId,
      },
      orderBy: {
        subsubcategory_name: "asc",
      },
    });
    return NextResponse.json(subsubcategories);
  }
}
