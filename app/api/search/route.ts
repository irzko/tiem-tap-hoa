import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async (req: NextRequest) => {
  const keyword = req.nextUrl.searchParams.get("keyword");
  return NextResponse.json(
    await prisma.product.findMany({
      where: {
        productName: {
          search: keyword?.replace(/ /g, "|"),
        },
      },
    })
  );
};
