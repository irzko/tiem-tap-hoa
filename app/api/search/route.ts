import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;

  const keyword = searchParams.get("keyword");
  const priceFrom = searchParams.get("priceFrom");
  const priceTo = searchParams.get("priceTo");

  if (priceFrom && priceTo) {
    const products = await prisma.product.findMany({
      where: {
        productName: {
          search: keyword?.replace(/ /g, "|"),
        },
        price: {
          gte: Number(priceFrom),
          lte: Number(priceTo),
        },
      },
    });
    return NextResponse.json(products);
  } else if (priceFrom !== "undefined") {
    const products = await prisma.product.findMany({
      where: {
        productName: {
          search: keyword?.replace(/ /g, "|"),
        },
        price: {
          gte: Number(priceFrom),
        },
      },
    });
    return NextResponse.json(products);
  } else if (priceTo !== "undefined") {
    const products = await prisma.product.findMany({
      where: {
        productName: {
          search: keyword?.replace(/ /g, "|"),
        },
        price: {
          lte: Number(priceTo),
        },
      },
    });
    return NextResponse.json(products);
  } else {
    const products = await prisma.product.findMany({
      where: {
        productName: {
          search: keyword?.replace(/ /g, "|"),
        },
      },
    });

    return NextResponse.json(products);
  }
};
