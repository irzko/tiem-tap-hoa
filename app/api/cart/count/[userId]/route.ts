import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  const cart = await prisma.cart.count({
    where: {
      userId,
    },
  });
  return NextResponse.json({ cartNum: cart, sucsses: true }, { status: 200 });
}
