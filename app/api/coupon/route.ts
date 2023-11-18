import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const POST = async (req: NextRequest) => {
  const data: {
    couponCode: string;
    quantity: string;
    discount: string;
    description: string;
    expiredDate: string;
  } = await req.json();
  await prisma.coupon.create({
    data: {
      couponCode: data.couponCode,
      quantity: parseInt(data.quantity),
      discount: parseInt(data.discount),
      description: data.description,
      expiredDate: new Date(data.expiredDate),
    },
  });
  return NextResponse.json({ message: "Coupon created" }, { status: 201 });
};

export const GET = async () => {
  const coupons = await prisma.coupon.findMany();
  return NextResponse.json(coupons);
};

export const PUT = async (req: NextRequest) => {
  const data = await req.json();
  await req.json();
  const coupon = await prisma.coupon.update({
    where: { couponCode: data.couponCode },
    data,
  });
  return NextResponse.json(
    { data: coupon, message: "success" },
    { status: 200 }
  );
};
