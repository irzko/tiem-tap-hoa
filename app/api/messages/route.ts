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

  console.log(userId, content, conversationId);

  const message = await prisma.message.create({
    data: {
      userId,
      content,
      conversationId,
    },
  });

  await pusherServer.trigger(conversationId, "messages:new", message);

  return NextResponse.json(message, { status: 201 });
};

export const GET = async (req: Request) => {
  const messages = await prisma.message.findMany();
  console.log(messages);

  return NextResponse.json(messages, { status: 200 });
};
