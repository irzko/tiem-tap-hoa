import prisma from "@/libs/prisma";
import { NextResponse, NextRequest } from "next/server";

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

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("search");

  if (query) {
    const categories = await prisma.categories.findMany({
      where: {
        category_name: {
          contains: query,
        },
      },
      orderBy: {
        category_name: "asc",
      },
      include: {
        _count: {
          select: {
            Subcategories: true,
          }, // Count of Subcategories
        },
      },
    });
    return NextResponse.json(categories);
  } else {
    const categories = await prisma.categories.findMany({
      orderBy: {
        category_name: "asc",
      },
      include: {
        _count: {
          select: {
            Subcategories: true,
          }, // Count of Subcategories
        },
      },
    });
    return NextResponse.json(categories);
  }
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
