import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { catgId: string } }
) {
  const categoryId = params.catgId;
  const category = await prisma.categories.findUnique({
    where: {
      category_id: parseInt(categoryId),
    },
  });

  return NextResponse.json(category);
}

// export async function GET(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   const id = params.id;
//   const categories = await prisma.subcategories.findMany({
//     where: {
//       category_id: parseInt(id),
//     },
//   });

//   return NextResponse.json(categories);
// }
