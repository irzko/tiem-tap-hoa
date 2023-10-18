import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const data: { senderId: string; content: string; conversationId: string } =
    await req.json();

  const conversation = await prisma.conversation.findUnique({
    where: {
      conversationId: data.conversationId,
    },
    include: {
      participants: true,
    },
  });

  if (!conversation) {
    return NextResponse.json({
      status: 404,
      message: "Conversation not found",
    });
  } else if (
    !conversation.participants.find(
      (participant) => participant.userId === data.senderId
    )
  ) {
    return NextResponse.json({
      status: 403,
      message: "You are not a participant in this conversation",
    });
  } else {
    const message = await prisma.message.create({
      data: {
        senderId: data.senderId,
        content: data.content,
        conversationId: data.conversationId,
      },
    });
    return NextResponse.json(message);
  }
};

export const GET = async (req: NextRequest) => {
  const userId = req.nextUrl.searchParams.get("userId");
  const conversation = await prisma.conversation.findMany({
    where: {
      participants: {
        some: {
          userId: userId as string,
        },
      },
    },
    include: {
      participants: true,
      messages: {
        select: {
          content: true,
          createdAt: true,
          senderId: true,
          sender: {
            select: {
              fullName: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    },
  });
  return NextResponse.json(conversation);
};

export const DELETE = async (req: NextRequest) => {
  // const userId = req.nextUrl.searchParams.get("userId");
  await prisma.message.deleteMany({});
  await prisma.participant.deleteMany({});
  const messages = await prisma.conversation
    .deleteMany
    //   {
    //   where: {
    //     conversationId: userId as string,
    //   },
    // }
    ();

  return NextResponse.json(messages);
};
