import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  const result = await prisma.address.findMany({
    where: {
      userId,
    },
  });
  return NextResponse.json(result, { status: 200 });
}
