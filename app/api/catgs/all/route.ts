import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const category = await prisma.category.findMany({
    orderBy: {
      categoryName: "asc",
    },
  });
  return NextResponse.json(category);
}
