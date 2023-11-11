import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  const interactions = await prisma.interaction.findMany({
    where: {
      userId,
    },
    include: {
      product: true,
    },
  });

  return NextResponse.json(interactions);
}
