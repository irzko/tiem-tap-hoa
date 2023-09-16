import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { category_name } = await req.json();
  const exists = await prisma.categories.findUnique({
    where: {
      category_name,
    },
  });
  if (exists) {
    return NextResponse.json(
      { error: "Category already exists" },
      { status: 400 }
    );
  } else {
    const categories = await prisma.categories.create({
      data: {
        category_name,
      },
    });
    return NextResponse.json(categories);
  }
}

export async function GET() {
  const categories = await prisma.categories.findMany();
  return NextResponse.json(categories);
}

// Path: app\api\category-group\route.ts
