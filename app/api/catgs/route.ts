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
    return NextResponse.json({ categories }, { status: 201 });
  }
}

export async function GET() {
  const categories = await prisma.categories.findMany({
    orderBy: {
      category_name: "asc",
    },
    include: {
      _count: {
        select: {
          Subcategories: true,
        }, // Count of Subcategories
      }
    }
  });
  return NextResponse.json(categories);
}

export async function DELETE(req: Request) {
  const { category_id } = await req.json();
  const categories = await prisma.categories.delete({
    where: {
      category_id,
    },
  });
  return NextResponse.json({ categories }, { status: 200 });
}

export async function PUT(req: Request) {
  const { category_id, category_name } = await req.json();
  const categories = await prisma.categories.update({
    where: {
      category_id,
    },
    data: {
      category_name,
    },
  });
  return NextResponse.json({ categories }, { status: 200 });
}
