import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  return NextResponse.json(
    await prisma.cart.findMany({
      where: {
        cartId: {
          in: await req.json(),
        },
      },
      include: {
        product: true,
      },
    }),
    { status: 200 }
  );
}
