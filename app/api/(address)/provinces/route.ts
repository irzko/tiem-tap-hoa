import prisma from "@/libs/prisma";
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
  const depth = req.nextUrl.searchParams.get("depth");
  switch (depth) {
    case "1":
      return NextResponse.json(
        await prisma.city.findMany({
          orderBy: {
            name: "asc",
          },
        })
      );
    case "2":
      return NextResponse.json(
        await prisma.city.findMany({
          orderBy: {
            name: "asc",
          },
          include: {
            districts: {
              orderBy: {
                name: "asc",
              },
            },
          },
        })
      );
    case "3":
      return NextResponse.json(
        await prisma.city.findMany({
          orderBy: {
            name: "asc",
          },
          include: {
            districts: {
              orderBy: {
                name: "asc",
              },
              include: {
                wards: {
                  orderBy: {
                    name: "asc",
                  },
                },
              },
            },
          },
        })
      );
    default:
      return NextResponse.json(
        await prisma.city.findMany({
          orderBy: {
            name: "asc",
          },
        })
      );
  }
}
