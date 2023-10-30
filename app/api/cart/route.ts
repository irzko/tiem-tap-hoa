import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: Request) {
  const { userId, productId, quantity } = await req.json();
  const exists = await prisma.cart.findFirst({
    where: {
      userId,
      productId,
    },
  });

  if (!exists) {
    await prisma.cart.create({
      data: {
        userId,
        productId,
        quantity,
      },
    });
    return NextResponse.json({ message: "Added to cart" }, { status: 201 });
  } else {
    await prisma.cart.update({
      where: {
        cartId: exists.cartId,
      },
      data: {
        quantity: exists.quantity + quantity,
      },
    });
    return NextResponse.json({ message: "Added to cart" }, { status: 201 });
  }
}

export async function GET(req: NextRequest) {
  const cart = await prisma.cart.findMany({
    include: {
      product: {
        select: {
          productName: true,
          price: true,
          images: true,
        },
      },
    },
  });
  return NextResponse.json(cart);
}

export async function DELETE(req: NextRequest) {
  const { cartId } = await req.json();
  await prisma.cart.delete({
    where: {
      cartId,
    },
  });
  return NextResponse.json({ message: "Deleted from cart" }, { status: 200 });
}

export async function PUT(req: NextRequest) {
  const { cartId, quantity } = await req.json();
  await prisma.cart.update({
    where: {
      cartId,
    },
    data: {
      quantity,
    },
  });
  return NextResponse.json({ message: "Updated cart" }, { status: 200 });
}
