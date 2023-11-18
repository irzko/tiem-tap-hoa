import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { userId }: { userId: string } = await req.json();

  const conversation = await prisma.participant.findFirst({
    where: {
      userId,
    },
    select: {
      conversation: true,
    },
  });

  if (conversation) {
    return NextResponse.json(
      {
        message: "success",
        data: conversation,
      },
      { status: 200 }
    );
  } else {
    const conversation = await prisma.conversation.create({
      data: {
        Participant: {
          create: [
            {
              userId,
            },
          ],
        },
      },
    });
    return NextResponse.json(
      {
        message: "success",
        data: conversation,
      },
      { status: 201 }
    );
  }
};


export const GET = async (req: Request) => {
  const conversation = await prisma.conversation.findMany({
    select: {
      Participant: {
        select: {
          userId: true,
        },
      },
    },
  });

  return NextResponse.json(conversation, { status: 200 });
};