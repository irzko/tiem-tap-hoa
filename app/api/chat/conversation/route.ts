import { data } from "./../../../dashboard/(product manager)/page";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { userId }: { userId: string } = await req.json();

  const participant = await prisma.participant.findFirst({
    where: {
      userId,
    },
    select: {
      conversation: {
        select: {
          conversationId: true,
        },
      },
    },
  });

  console.log(participant);

  if (participant) {
    return NextResponse.json(
      {
        message: "success",
        data: participant,
      },
      { status: 200 }
    );
  } else {
    const conversation = await prisma.conversation.create({
      data: {},
    });
    const data = await prisma.participant.create({
      data: {
        conversationId: conversation.conversationId,
        userId,
      },
      select: {
        conversation: {
          select: {
            conversationId: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: "success",
        data,
      },
      { status: 201 }
    );
  }
};

export const GET = async (req: Request) => {
  const conversation = await prisma.conversation.findMany({
    select: {
      conversationId: true,
      Participant: {
        select: {
          userId: true,
          user: {
            select: {
              fullName: true,
              role: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json(conversation, { status: 200 });
};
