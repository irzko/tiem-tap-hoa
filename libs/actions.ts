"use server";
import { revalidatePath, revalidateTag } from "next/cache";
import prisma from "./prisma";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";
import { hash } from "bcryptjs";

export const deleteCart = async (id: string) => {
  await prisma.cart.delete({
    where: {
      cartId: id,
    },
  });
  revalidatePath("/cart");
  revalidateTag("cartNum");
  redirect("/cart");
};

export const adjustProductQuantity = async (
  cartId: string,
  quantity: number
) => {
  await prisma.cart.update({
    where: {
      cartId: cartId,
    },
    data: {
      quantity: quantity,
    },
  });
  revalidatePath("/cart");
  redirect(`/cart`);
};

export const addRating = async (
  productId: string,
  rating: number,
  review: string,
  userId: string
) => {
  await prisma.review.create({
    data: {
      productId,
      rating,
      review,
      userId,
    },
  });
  revalidatePath(`/detail/${productId}`);
  redirect(`/detail/${productId}`);
};

export const loginAction = async (
  formData: FormData,
  redirectPath?: string
) => {
  signIn("credentials", {
    redirect: false,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }).then((res) => {
    if (res?.error) {
      return { message: res.error };
    } else {
      redirectPath && redirect(redirectPath);
    }
  });
};

export const addProduct = async (formData: FormData) => {
  await prisma.product.create({
    data: {
      productName: formData.get("productName") as string,
      price: Number(formData.get("price") as string),
      description: formData.get("description") as string,
      images: JSON.parse(formData.get("images") as string),
      stockQuantity: Number(formData.get("stockQuantity") as string),
      categoryId: formData.get("categoryId") as string,
      weight: Number(formData.get("weight") as string),
      height: Number(formData.get("height") as string),
      length: Number(formData.get("length") as string),
      width: Number(formData.get("width") as string),
    },
  });
  revalidateTag("products");
  redirect(`/dashboard/products`);
};

export const addAddress = async (formData: FormData, redirectPath?: string) => {
  await prisma.address.create({
    data: {
      province: JSON.parse(formData.get("province") as string),
      streetAddress: formData.get("streetAddress") as string,
      district: JSON.parse(formData.get("district") as string),
      ward: JSON.parse(formData.get("ward") as string),
      userId: formData.get("userId") as string,
      fullName: formData.get("fullName") as string,
      phoneNumber: formData.get("phoneNumber") as string,
    },
  });
  revalidateTag("address");
  redirectPath && redirect(redirectPath);
};

export const signUp = async (data: any) => {
  const { fullName, email, password } = data;

  const exists = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (exists) {
    return { message: "Người dùng đã tồn tại" };
  } else {
    await prisma.user.create({
      data: {
        fullName,
        email,
        password: await hash(password, 10),
      },
    });
  }
  revalidateTag("user");
  redirect("/login");
};
