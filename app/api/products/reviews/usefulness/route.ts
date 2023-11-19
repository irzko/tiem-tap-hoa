import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { reviewId, userId } = data;
  const usefulness = await prisma.usefulness.findFirst({
    where: {
      reviewId: reviewId,
      userId: userId,
    },
  });
  if (usefulness) {
    await prisma.usefulness.delete({
      where: {
        usefulnessId: usefulness.usefulnessId,
      },
    });
  } else {
    await prisma.usefulness.create({
      data: data,
    });
  }

  return NextResponse.json({ message: "success" }, { status: 201 });
}
