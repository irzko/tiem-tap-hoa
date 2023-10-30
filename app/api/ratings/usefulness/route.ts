import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const data = await req.json();
  NextResponse.json(await prisma.review.create({ data }));
};
