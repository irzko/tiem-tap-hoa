import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: Request) {
  const { categoryName, parentCategoryId } = await req.json();
  const exists = await prisma.category.findUnique({
    where: {
      categoryName,
    },
  });
  if (exists) {
    return NextResponse.json(
      { error: "Category already exists" },
      { status: 400 }
    );
  } else {
    const category = await prisma.category.create({
      data: {
        categoryName,
        parentCategoryId,
      },
    });
    return NextResponse.json({ category }, { status: 201 });
  }
}

export async function GET(req: NextRequest) {
  const category = await prisma.category.findMany({
    orderBy: {
      categoryName: "asc",
    },
    where: {
      parentCategoryId: null,
    },
    include: {
      _count: {
        select: { subCategories: true },
      },
      subCategories: {
        orderBy: {
          categoryName: "asc",
        },
      },
    },
  });
  return NextResponse.json(category);
}

export async function DELETE(req: Request) {
  const { categoryId } = await req.json();
  const category = await prisma.category.delete({
    where: {
      categoryId,
    },
  });
  return NextResponse.json({ category }, { status: 200 });
}

export async function PUT(req: Request) {
  const { categoryId, categoryName } = await req.json();
  const category = await prisma.category.update({
    where: {
      categoryId,
    },
    data: {
      categoryName,
    },
  });
  return NextResponse.json({ category }, { status: 200 });
}
