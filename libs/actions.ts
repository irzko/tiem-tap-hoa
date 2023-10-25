"use server";
import { revalidatePath, revalidateTag } from "next/cache";
import prisma from "./prisma";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";

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

export const login = async (prevState: any, formData: FormData) => {
  signIn("credentials", {
    redirect: false,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }).then((res) => {
    if (res?.error) {
      return { message: res.error };
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
    },
  });
  revalidateTag("products");
  redirect(`/dashboard/products`);
};

export const addAddress = async (formData: FormData, redirectPath: string) => {
  await prisma.address.create({
    data: {
      cityId: formData.get("cityId") as string,
      streetAddress: formData.get("streetAddress") as string,
      districtId: formData.get("districtId") as string,
      wardId: formData.get("wardId") as string,
      userId: formData.get("userId") as string,
      fullName: formData.get("fullName") as string,
      phoneNumber: formData.get("phoneNumber") as string,
    },
  });
  revalidateTag("address");
  redirect(redirectPath);
};
