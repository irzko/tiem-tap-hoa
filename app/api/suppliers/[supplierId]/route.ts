import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
export const DELETE = async (
  req: Request,
  { params }: { params: { supplierId: string } }
) => {
  const { supplierId } = params;
  const supplier = await prisma.supplier.delete({
    where: {
      supplierId,
    },
  });

  return NextResponse.json(supplier, { status: 200 });
};
