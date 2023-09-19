import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { subcategory_name, category_id } = await req.json();
  const exists = await prisma.subcategories.findUnique({
    where: {
      subcategory_name,
    },
  });
  if (exists) {
    return NextResponse.json(
      { error: "subcategories already exists" },
      { status: 400 }
    );
  } else {
    const subcategory = await prisma.subcategories.create({
      data: {
        subcategory_name,
        Categories: {
          connect: { category_id: parseInt(category_id) },
        },
      },
    });
    return NextResponse.json(subcategory);
  }
}

export async function GET() {
  const categories = await prisma.subcategories.findMany();
  return NextResponse.json(categories);
}
