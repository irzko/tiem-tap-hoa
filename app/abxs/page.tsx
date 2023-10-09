import React from "react";
import fs from "fs";
import prisma from "@/libs/prisma";

export default async function page() {
  // Đường dẫn tới tệp CSV của bạn
  const filePath = "du-lieu.csv";

  // Đọc file CSV đồng bộ
  try {
    const lines = fs.readFileSync(filePath, "utf-8").split("\n");

    // Xử lý từng dòng
    for (const line of lines) {
      try {
        // Tách dữ liệu CSV thành các trường dữ liệu (có thể sử dụng thư viện CSV parsing nếu cần)
        const [thanhPho, quanHuyen, phuongXa] = line.split(",");

        // Thêm dữ liệu vào cơ sở dữ liệu bằng Prisma
        const existingThanhPho = await prisma.city.findFirst({
          where: {
            name: thanhPho.trim(),
          },
          include: {
            districts: {
              where: {
                name: quanHuyen.trim(),
              },
              include: {
                wards: {
                  where: {
                    name: phuongXa.trim(),
                  },
                },
              },
            },
          },
        });

        if (!existingThanhPho) {
          const city = await prisma.city.create({
            data: {
              name: thanhPho.trim(),
              districts: {
                create: {
                  name: quanHuyen.trim(),
                  wards: {
                    create: {
                      name: phuongXa.trim(),
                    },
                  },
                },
              },
            },
          });
        } else {
        }
      } catch (error) {
        console.error("Error adding record to database:", error);
      }
    }

    console.log("Kết thúc đọc tệp CSV.");

    // Đóng kết nối tới cơ sở dữ liệu
  } catch (error) {
    console.error("Error reading file:", error);
  }

  return <div>page</div>;
}
