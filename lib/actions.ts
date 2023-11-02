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
  revalidateTag("product");
  redirect(`/dashboard/products`);
};

export const updateProduct = async (formData: FormData, id: string) => {
  await prisma.product.update({
    where: {
      productId: id,
    },
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
  revalidateTag("product");
  redirect(`/dashboard/products`);
};

export const addAddress = async (formData: FormData) => {
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

export const createCategory = async (prevState: any, formData: FormData) => {
  const categoryName = formData.get("categoryName") as string;
  const parentCategoryId = formData.get("parentId") as string;
  const exists = await prisma.category.findUnique({
    where: {
      categoryName,
    },
  });
  if (exists) {
    return { type: "error", message: "Danh mục này đã tồn tại" };
  } else {
    await prisma.category.create({
      data: {
        categoryName,
        parentCategoryId,
      },
    });
    revalidateTag("category");
    return { type: "success", message: "Tạo danh mục thành công" };
  }
};

export const deleteCategory = async (prevState: any, categoryId: string) => {
  const category = await prisma.category.delete({
    where: {
      categoryId,
    },
  });
  if (category) {
    revalidateTag("category");
    return { type: "success", message: "Xóa danh mục thành công" };
  } else {
    return { type: "error", message: "Xóa danh mục thất bại" };
  }
};

export const updateCategory = async (prevState: any, formData: FormData) => {
  const categoryId = formData.get("categoryId") as string;
  const categoryName = formData.get("categoryName") as string;
  const category = await prisma.category.update({
    where: {
      categoryId,
    },
    data: {
      categoryName,
    },
  });
  if (category) {
    revalidateTag("category");
    return { type: "success", message: "Cập nhật danh mục thành công" };
  } else {
    return { type: "error", message: "Cập nhật danh mục thất bại" };
  }
};

export const initDescription = async (input: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_COPY_AI_END_POINT}`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "x-copy-ai-api-key": `${process.env.NEXT_PUBLIC_COPY_AI_API_KEY!}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      startVariables: {
        initial_manual_input: input,
      },
      metadata: { api: true },
    }),
  });
  const data = await res.json();
  return data.data.id;
};

export const getDescription = async (id: string) => {
  return fetch(`${process.env.NEXT_PUBLIC_COPY_AI_END_POINT}/${id}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-copy-ai-api-key": `${process.env.NEXT_PUBLIC_COPY_AI_API_KEY!}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data.data.output.generate_description);
};

export const addSupplier = async (prevState: any, formData: FormData) => {
  const supplierName = formData.get("supplierName") as string;
  const address = formData.get("address") as string;
  const email = formData.get("email") as string;
  const phoneNumber = formData.get("phoneNumber") as string;
  const otherInfo = formData.get("otherInfo") as string;
  const supplier = await prisma.supplier.create({
    data: {
      supplierName,
      address,
      email,
      phoneNumber,
      otherInfo,
    },
  });
  if (supplier) {
    revalidateTag("supplier");
    return { type: "success", message: "Tạo nhà cung cấp thành công" };
  } else {
    return { type: "error", message: "Tạo nhà cung cấp thất bại" };
  }
};

export const unpaidAction = async (orderId: string, userId: string) => {
  await prisma.order.update({
    where: {
      orderId: orderId,
    },
    data: {
      statusId: "toship",
    },
  });

  await prisma.orderStatusHistory.create({
    data: {
      orderId: orderId,
      statusId: "unpaid",
      userId: userId,
    },
  });
  revalidateTag("order");
};

export const orderAction = async (data: {
  userId: string;
  addressId: string;
  products: ICart[];
  paymentMethod: PaymentType;
}) => {
  data.products.forEach((product) => {
    if (product.quantity > product.product.stockQuantity) {
      return {
        type: "error",
        message: `Product ${product.product.productName} is out of stock`,
      };
    }
  });

  await prisma.order.create({
    data: {
      userId: data.userId,
      addressId: data.addressId,
      statusId: "unpaid",
      totalAmount: data.products.reduce(
        (acc, product) => acc + product.product.price * product.quantity,
        0
      ),
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
  revalidateTag("cart");
  revalidateTag("cartNum");
  revalidateTag("order");
  redirect("/user/purchase/unpaid");
};
