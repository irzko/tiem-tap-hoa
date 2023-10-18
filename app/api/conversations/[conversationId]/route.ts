import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export const GET = async (
  req: NextRequest,
  { params }: { params: { conversationId: string } }
) => {
  const { conversationId } = params;

  const conversation = await prisma.conversation.findUnique({
    where: {
      conversationId,
    },
    include: {
      participants: true,
      messages: {
        include: {
          sender: true,
        },
      },
    },
  });

  return NextResponse.json(conversation);
};
