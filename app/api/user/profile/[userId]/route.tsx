import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  const cart = await prisma.user.findUnique({
    where: {
      userId,
    },
    select: {
      fullName: true,
      email: true,
    },
  });
  return NextResponse.json(cart);
}
