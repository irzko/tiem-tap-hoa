import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name } = await req.json();
  const exists = await prisma.categoryGroup.findUnique({
    where: {
      name,
    },
  });
  if (exists) {
    return NextResponse.json(
      { error: "Category Group already exists" },
      { status: 400 }
    );
  } else {
    const categoryGroup = await prisma.categoryGroup.create({
      data: {
        name,
      },
    });
    return NextResponse.json(categoryGroup);
  }
}

export async function GET() {
  const categoryGroups = await prisma.categoryGroup.findMany();
  return NextResponse.json(categoryGroups);
}

// Path: app\api\category-group\route.ts
