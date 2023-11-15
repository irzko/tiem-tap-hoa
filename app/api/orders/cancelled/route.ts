import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async (req: Request) => {
  return NextResponse.json(
    await prisma.order.findMany({
      where: {
        statusId: "cancelled",
      },
      include: {
        orderDetails: {
          include: {
            product: true,
          },
        },
        OrderStatusHistory: true,
        orderStatus: true,
        paymentMethod: true,
      },
    })
  );
};
