import prisma from "@/libs/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { cityId: string } }
) {
  const { cityId } = params;
  const districts = await prisma.district.findMany({
    where: {
      cityId: cityId,
    },
  });

  return NextResponse.json(districts);
}
