import prisma from "@/libs/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { districtId: string } }
) {
  const { districtId } = params;
  const districts = await prisma.ward.findMany({
    where: {
      districtId: districtId,
    },
  });

  return NextResponse.json(districts);
}
