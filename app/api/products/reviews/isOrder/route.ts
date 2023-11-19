import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const userId = params.get("userId")!;
  const productId = params.get("productId")!;

  const order = await prisma.orderDetail.findFirst({
    where: {
      productId: productId,
      order: {
        userId: userId,
        statusId: "competed",
      },
    },
  });

  return NextResponse.json(
    {
      message: "success",
      data: {
        isOrder: order ? true : false,
      },
    },
    { status: 200 }
  );
}
