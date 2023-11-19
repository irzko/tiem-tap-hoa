import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const review = await req.json();
  await prisma.review.create({
    data: review,
  });

  return NextResponse.json({ message: "success" }, { status: 201 });
}

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const productId = params.get("productId")!;
  const reviews = await prisma.review.findMany({
    where: {
      productId: productId,
    },
    select: {
      reviewId: true,
      rating: true,
      review: true,
      createdAt: true,
      user: {
        select: {
          userId: true,
          fullName: true,
        },
      },
      _count: {
        select: {
          Usefulness: true,
        },
      },
    },
  });
  return NextResponse.json(reviews, { status: 200 });
}
