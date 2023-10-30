import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data: {
    userId: string;
    addressId: string;
    products: ICart[];
    paymentMethod: PaymentType;
  } = await req.json();

  data.products.forEach((product) => {
    if (product.quantity > product.product.stockQuantity) {
      return NextResponse.json(
        {
          error: `Product ${product.product.productName} is out of stock`,
        },
        { status: 400 }
      );
    }
  });

  const order = await prisma.order.create({
    data: {
      userId: data.userId,
      addressId: data.addressId,
      statusId: "unpaid",
      totalAmount: data.products.reduce(
        (acc, product) => acc + product.product.price * product.quantity,
        0
      ),
      orderDetails: {
        create: data.products.map((product) => ({
          productId: product.productId,
          quantity: product.quantity,
        })),
      },
      paymentMethod: {
        create: {
          paymentType: data.paymentMethod,
          accountInfo: "",
        },
      },
    },
  });

  data.products.forEach(async (product) => {
    await prisma.product.update({
      where: {
        productId: product.productId,
      },
      data: {
        stockQuantity: {
          decrement: product.quantity,
        },
      },
    });
  });

  return NextResponse.json(order, { status: 201 });
}

export async function GET(req: Request) {
  return NextResponse.json(
    await prisma.order.findMany({
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
}
