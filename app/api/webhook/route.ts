import { NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusher";

export const POST = async (req: Request) => {
  const data = await req.json();

  await pusherServer.trigger("new-product", "workflowRun.completed", data);

  return NextResponse.json({ status: "success" }, { status: 201 });
};
