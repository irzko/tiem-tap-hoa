import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prodsOrdered } = await req.json();
  console.log(prodsOrdered);

  // const cart = await prisma.cart.findMany({
  //   where: {
  //     userId,
  //   },
  //   include: {
  //     product: {
  //       select: {
  //         productName: true,
  //         price: true,
  //         images: true,
  //       },
  //     },
  //   },
  //   orderBy: {
  //     createdAt: "desc",
  //   },
  // });
  return NextResponse.json({});
}
