import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, group } = await req.json();
  const exists = await prisma.category.findUnique({
    where: {
      name,
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
        name,
        group: {
          connect: {
            id: parseInt(group),
          },
        },
      },
    });
    return NextResponse.json(category);
  }
}

export async function GET() {
  const categories = await prisma.category.findMany();
  return NextResponse.json(categories);
}
