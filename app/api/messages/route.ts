import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusher";

export const POST = async (req: Request) => {
  const {
    userId,
    content,
    conversationId,
  }: { userId: string; content: string; conversationId: string } =
    await req.json();

  const message = await prisma.message.create({
    data: {
      userId,
      content,
      conversationId,
    },
    include: {
      user: {
        select: {
          fullName: true,
          role: true,
        },
      },
    },
  });

  await pusherServer.trigger(conversationId, "messages:new", message);
  pusherServer.trigger(conversationId, "conversation:update", {
    conversationId,
    messages: message,
  });

  return NextResponse.json(message, { status: 201 });
};

export const GET = async (req: Request) => {
  const messages = await prisma.message.findMany();
  console.log(messages);

  return NextResponse.json(messages, { status: 200 });
};
