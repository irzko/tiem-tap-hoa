import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const POST = async (req: NextRequest) => {
  const data: {
    couponCode: string;
  } = await req.json();
  await req.json();
  await prisma.coupon.update({
    where: { couponCode: data.couponCode },
    data: {
      quantity: {
        decrement: 1,
      },
    },
  });
  return NextResponse.json({ message: "success" }, { status: 200 });
};

export const GET = async (req: NextRequest) => {
  const params = req.nextUrl.searchParams;
  const couponCode = params.get("couponCode")!;
  const coupon = await prisma.coupon.findUnique({ where: { couponCode } });
  return NextResponse.json(
    { data: coupon, message: "success" },
    { status: 200 }
  );
};
