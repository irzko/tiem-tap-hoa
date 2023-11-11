import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  const existingInteraction = await prisma.interaction.findFirst({
    where: {
      AND: [
        {
          userId: data.userId,
        },
        {
          productId: data.productId,
        },
        {
          interactionType: data.interactionType,
        },
      ],
    },
  });

  if (existingInteraction) {
    return NextResponse.json(
      await prisma.interaction.update({
        where: {
          interactId: existingInteraction.interactId,
        },
        data: {
          times: existingInteraction.times + 1,
        },
      }),
      {
        status: 200,
      }
    );
  } else {
    return NextResponse.json(await prisma.interaction.create({ data }), {
      status: 201,
    });
  }
}