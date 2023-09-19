import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { catgId: string } }
) {
  const categoryId = params.catgId;

  if (categoryId === "all") {
    const categories = await prisma.subcategories.findMany({
      orderBy: {
        subcategory_name: "asc",
      },
    });
    return NextResponse.json(categories);
  } else {
    const categories = await prisma.subcategories.findMany({
      where: {
        category_id: categoryId,
      },
      orderBy: {
        subcategory_name: "asc",
      },
    });
    return NextResponse.json(categories);
  }
}
