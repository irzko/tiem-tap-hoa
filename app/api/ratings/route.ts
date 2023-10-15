import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export const POST = async (req: Request) => {
  const data = await req.json();

  return NextResponse.json(await prisma.review.create({ data: data }));
};

export const GET = async (req: Request) => {
  const data = await req.json();
  return NextResponse.json(await prisma.review.findMany({ where: data }));
};
