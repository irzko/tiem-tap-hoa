import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const PUT = async (req: Request) => {
  const data: { orderId: string; userId: string } = await req.json();

  const order = await prisma.order.update({
    where: {
      orderId: data.orderId,
    },
    data: {
      statusId: "toship",
    },
  });

  await prisma.orderStatusHistory.create({
    data: {
      orderId: data.orderId,
      statusId: "unpaid",
      userId: data.userId,
    },
  });
  return NextResponse.json(order, { status: 200 });
};

export const GET = async (req: Request) => {
  return NextResponse.json(
    await prisma.order.findMany({
      where: {
        statusId: "unpaid",
      },
      include: {
        orderDetails: {
          include: {
            product: true,
          },
        },
        orderStatus: true,
        paymentMethod: true,
      },
    })
  );
};
