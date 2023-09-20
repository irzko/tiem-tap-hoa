import prisma from "@/libs/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: Request) {
  const { subsubcategory_name, subcategory_id } = await req.json();
  const exists = await prisma.subsubcategories.findUnique({
    where: {
      subsubcategory_name,
    },
  });
  if (exists) {
    return NextResponse.json(
      { error: "Category already exists" },
      { status: 400 }
    );
  } else {
    const subsubcategories = await prisma.subsubcategories.create({
      data: {
        subcategory_id,
        subsubcategory_name,
      },
    });
    return NextResponse.json({ subsubcategories }, { status: 201 });
  }
}

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("search");

  if (query) {
    const subsubcategories = await prisma.subsubcategories.findMany({
      where: {
        subsubcategory_name: {
          contains: query,
        },
      },
      orderBy: {
        subsubcategory_name: "asc",
      },
    });
    return NextResponse.json(subsubcategories);
  } else {
    const subsubcategories = await prisma.subsubcategories.findMany({
      orderBy: {
        subsubcategory_name: "asc",
      },
    });
    return NextResponse.json(subsubcategories);
  }
}

export async function DELETE(req: Request) {
  const { subsubcategory_id } = await req.json();
  const subsubcategories = await prisma.subsubcategories.delete({
    where: {
      subsubcategory_id,
    },
  });
  return NextResponse.json({ subsubcategories }, { status: 200 });
}

export async function PUT(req: Request) {
  const { subsubcategory_id, subsubcategory_name } = await req.json();
  const subsubcategories = await prisma.subsubcategories.update({
    where: {
      subsubcategory_id,
    },
    data: {
      subsubcategory_name,
    },
  });
  return NextResponse.json({ subsubcategories }, { status: 200 });
}
