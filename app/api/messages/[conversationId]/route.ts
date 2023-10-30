import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { conversationId: string } }
) => {
  const messages = await prisma.message.findMany({
    where: {
      conversationId: params.conversationId,
    },
    select: {
      messageId: true,
      content: true,
      timestamp: true,
      user: {
        select: {
          fullName: true,
          role: true,
        },
      },
    },
  });

  return NextResponse.json(messages, { status: 200 });
};
