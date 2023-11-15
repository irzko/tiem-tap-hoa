import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const PATCH = async (req: NextRequest) => {
  const params = req.nextUrl.searchParams;
  const action = params.get("action")!;
  const data: { orderId: string; userId: string; description: string } =
    await req.json();

  switch (action) {
    case "confirm": {
      await prisma.order.update({
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
          statusId: "toship",
          userId: data.userId,
          description: "Chờ lấy hàng",
        },
      });
      return NextResponse.json(
        {
          message: "Order status updated",
        },
        { status: 200 }
      );
    }
    case "cancel": {
      await prisma.order.update({
        where: {
          orderId: data.orderId,
        },
        data: {
          statusId: "cancelled",
        },
      });

      await prisma.orderStatusHistory.create({
        data: {
          orderId: data.orderId,
          statusId: "cancelled",
          userId: data.userId,
          description: data.description,
        },
      });
      return NextResponse.json(
        {
          message: "Order status updated",
        },
        { status: 200 }
      );
    }
  }
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
