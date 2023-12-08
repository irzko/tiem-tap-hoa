import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { redirect } from "next/navigation";
import moment from "moment";

export async function POST(req: NextRequest) {
  const data: {
    userId: string;
    shippingAddress: string;
    products: ICart[];
    paymentMethod: PaymentType;
    totalAmount: number;
  } = await req.json();

  data.products.forEach((product) => {
    if (product.quantity > product.product.stockQuantity) {
      return NextResponse.json(
        {
          message: `Product ${product.product.productName} is out of stock`,
        },
        { status: 400 }
      );
    }
  });

  const order = await prisma.order.create({
    data: {
      userId: data.userId,
      shippingAddress: data.shippingAddress,
      statusId: "unpaid",
      totalAmount: data.totalAmount,
      orderDetails: {
        create: data.products.map((product) => ({
          productId: product.productId,
          quantity: product.quantity,
        })),
      },
      paymentMethod: {
        create: {
          paymentType: data.paymentMethod,
          accountInfo: "",
        },
      },
    },
  });

  data.products.forEach(async (product) => {
    await prisma.product.update({
      where: {
        productId: product.productId,
      },
      data: {
        stockQuantity: {
          decrement: product.quantity,
        },
      },
    });
  });

  await prisma.cart.deleteMany({
    where: {
      productId: {
        in: data.products.map((product) => product.productId),
      },
    },
  });

  await prisma.orderStatusHistory.create({
    data: {
      orderId: order.orderId,
      statusId: "unpaid",
      description: "Chờ xác nhận",
      userId: data.userId,
    },
  });

  let ipAddr = req.headers.get("x-forwarded-for") as string;
  if (ipAddr === "::1") {
    ipAddr = "127.0.0.1";
  }

  const currCode = "VND";
  const locale = "vn";
  let date = new Date();

  const createDate = moment(date).format("YYYYMMDDHHmmss");
  const orderId = moment(date).format("HHmmss");
  const params = new URLSearchParams();
  params.append("vnp_Version", "2.1.0");
  params.append("vnp_Command", "pay");
  params.append("vnp_TmnCode", `${process.env.VNP_TMN_CODE}`);
  params.append("vnp_Amount", String(order.totalAmount * 100));
  params.append("vnp_CreateDate", createDate);
  params.append("vnp_CurrCode", currCode);
  params.append("vnp_IpAddr", ipAddr);
  params.append("vnp_Locale", locale);
  params.append("vnp_OrderInfo", "Thanh toan don hang");
  params.append("vnp_ReturnUrl", `${process.env.API_URL}/VnPayReturn`);
  params.append("vnp_TxnRef", order.orderId);
  params.append("vnp_OrderType", "other");

  const secretKey = process.env.VNP_HASH_SECRET as string;

  params.sort();

  const hmac = crypto.createHmac("sha512", secretKey);
  const signed = hmac
    .update(Buffer.from(params.toString(), "utf-8"))
    .digest("hex");

  params.append("vnp_SecureHash", signed);

  data.products.forEach(async (product) => {
    await prisma.product.update({
      where: {
        productId: product.productId,
      },
      data: {
        stockQuantity: {
          decrement: product.quantity,
        },
      },
    });
  });

  return NextResponse.json(
    {
      url: `https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?${params.toString()}`,
    },
    { status: 200 }
  );
}

export async function GET(req: NextRequest, url: string) {

  // return NextResponse.json(
  //   await prisma.order.findMany({
  //     include: {
  //       orderDetails: {
  //         include: {
  //           product: true,
  //         },
  //       },
  //       orderStatus: true,
  //       paymentMethod: true,
  //     },
  //   })
  // );
  return redirect(url);
}
