import prisma from "@/libs/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: Request) {
  const { subcategory_name, category_id } = await req.json();
  const exists = await prisma.subcategories.findUnique({
    where: {
      subcategory_name,
    },
  });
  if (exists) {
    return NextResponse.json(
      { error: "Category already exists" },
      { status: 400 }
    );
  } else {
    const subcategories = await prisma.subcategories.create({
      data: {
        category_id,
        subcategory_name,
      },
    });
    return NextResponse.json({ subcategories }, { status: 201 });
  }
}

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("search");

  if (query) {
    const subcategories = await prisma.subcategories.findMany({
      where: {
        subcategory_name: {
          contains: query,
        },
      },
      orderBy: {
        subcategory_name: "asc",
      },
      include: {
        _count: {
          select: {
            Subsubcategories: true,
          }, // Count of Subsubcategories
        },
      },
    });
    return NextResponse.json(subcategories);
  } else {
    const subcategories = await prisma.subcategories.findMany({
      orderBy: {
        subcategory_name: "asc",
      },
      include: {
        _count: {
          select: {
            Subsubcategories: true,
          }, // Count of Subsubcategories
        },
      },
    });
    return NextResponse.json(subcategories);
  }
}

export async function DELETE(req: Request) {
  const { subcategory_id } = await req.json();
  const subcategories = await prisma.subcategories.delete({
    where: {
      subcategory_id,
    },
  });
  return NextResponse.json({ subcategories }, { status: 200 });
}

export async function PUT(req: Request) {
  const { subcategory_id, subcategory_name } = await req.json();
  const subcategories = await prisma.subcategories.update({
    where: {
      subcategory_id,
    },
    data: {
      subcategory_name,
    },
  });
  return NextResponse.json({ subcategories }, { status: 200 });
}
