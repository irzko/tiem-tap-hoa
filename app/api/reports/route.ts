import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import moment from "moment";

export const GET = async (req: NextRequest) => {
  const params = req.nextUrl.searchParams;

  // const date = new Date(params.get("date")!);
  const date = new Date();

  const sold: number[] = [];
  for (let i = -2; i <= 2; i++) {
    console.log(
      new Date(
        date.getFullYear() + "-" + date.getMonth() + "-" + (date.getDate() + i)
      )
    );

    const report = await prisma.orderDetail.count({
      where: {
        // AND: [
        //   {
        //     createdAt: {
        //       gte: new Date(
        //         date.getFullYear() +
        //           "-" +
        //           date.getMonth() +
        //           "-" +
        //           (date.getDate() + i) +
        //           "T00:00:00.000Z"
        //       ),
        //     },
        //   },
        //   {
        //     createdAt: {
        //       lte: new Date(
        //         date.getFullYear() +
        //           "-" +
        //           date.getMonth() +
        //           "-" +
        //           (date.getDate() + i) +
        //           "T23:59:59.000Z"
        //       ),
        //     },
        //   },
        // ],
        createdAt: {
          lte: new Date(
            date.getFullYear() +
              "-" +
              date.getMonth() +
              "-" +
              (date.getDate() + i + 4)
          ).toISOString(),
          gte: new Date(
            date.getFullYear() +
              "-" +
              date.getMonth() +
              "-" +
              (date.getDate() + i - 4)
          ).toISOString(),
        },
      },
    });
    // console.log(new Date(date.setDate(date.getDate() + i)));

    // console.log(new Date(date.setDate(date.getDate() + i)).toISOString());
    console.log(report);

    report ? sold.push(report) : sold.push(0);
  }

  return NextResponse.json({ data: sold, message: "success" }, { status: 200 });
};
