import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  await prisma.warehouse.create({ data });

  return NextResponse.json(
    {
      status: "success",
      message: "Warehouse created",
    },
    {
      status: 201,
    }
  );
}

export async function GET() {
  const warehouses = await prisma.warehouse.findMany();
  return NextResponse.json(warehouses);
}

export async function PUT(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const warehouseId = params.get("warehouseId")!;
  const data = await req.json();
  await prisma.warehouse.update({
    where: { warehouseId: warehouseId },
    data,
  });
  return NextResponse.json(
    {
      status: "success",
      message: "Warehouse updated",
    },
    {
      status: 200,
    }
  );
}

export async function DELETE(req: NextRequest) {
  const data: { warehouseId: string } = await req.json();
  await prisma.warehouse.delete({ where: { warehouseId: data.warehouseId } });
  return NextResponse.json(
    {
      status: "success",
      message: "Warehouse deleted",
    },
    {
      status: 200,
    }
  );
}
