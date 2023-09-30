import prisma from "@/libs/prisma";
import { NextResponse, NextRequest } from "next/server";
import { existsSync } from "fs";
import fs from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const uploadedImages = formData.getAll("images") as File[];

  if (!uploadedImages || uploadedImages.length === 0) {
    return NextResponse.json({ error: "Không tìm thấy tệp ảnh." });
  }

  const destinationDirPath = path.join(process.cwd(), "public/upload");

  uploadedImages.forEach(async (file) => {
    const fileArrayBuffer = await file.arrayBuffer();

    if (!existsSync(destinationDirPath)) {
      fs.mkdir(destinationDirPath, { recursive: true });
    }
    await fs.writeFile(
      path.join(destinationDirPath, file.name),
      Buffer.from(fileArrayBuffer)
    );
  });

  const product = JSON.parse(formData.get("product") as string);
  product.images = uploadedImages.map((file) => file.name.toString());

  console.log(product);

  await prisma.product.create({
    data: {
      ...product,
    },
  });

  return NextResponse.json({ message: "Tải lên thành công." }, { status: 201 });
}

export async function GET(req: NextRequest) {
  const products = await prisma.product.findMany({
    include: {
      category: {
        select: {
          categoryName: true,
        },
      },
    },
  });

  return NextResponse.json(products);
}
