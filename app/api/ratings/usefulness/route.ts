import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const data = await req.json();
  NextResponse.json(await prisma.review.create({ data }));
};
