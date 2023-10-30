import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
export const DELETE = async (
  req: Request,
  { params }: { params: { productImportId: string } }
) => {
  const { productImportId } = params;
  const productImport = await prisma.productImport.delete({
    where: {
      productImportId,
    },
  });

  return NextResponse.json(productImport, { status: 200 });
};
