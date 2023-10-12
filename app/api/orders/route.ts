import prisma from "@/libs/prisma";
import { PaymentType } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data: {
    userId: string;
    addressId: string;
    products: ICart[];
    paymentMethod: PaymentType;
  } = await req.json();

  const order = await prisma.order.create({
    data: {
      userId: data.userId,
      addressId: data.addressId,
      totalAmount: data.products.reduce(
        (acc, product) => acc + product.product.price * product.quantity,
        0
      ),
      orderItems: {
        create: data.products.map((product) => ({
          productId: product.productId,
          quantity: product.quantity,
        })),
      },
      PaymentMethod: {
        create: {
          paymentType: data.paymentMethod[0],
        },
      },
    },
  });
  return NextResponse.json(order, { status: 201 });
}
