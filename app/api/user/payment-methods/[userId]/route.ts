import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { userId: string } }
) => {
  const { userId } = params;

  const paymentMethods = await prisma.paymentMethod.findMany({
    where: {
      userId: userId,
    },
  });
  return NextResponse.json(paymentMethods, { status: 200 });
};
