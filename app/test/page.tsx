import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import CartList from "@/components/cart-list";
const getCart = async (userId: string) => {
  const res = await fetch(`${process.env.BASE_URL}/api/cart/${userId}`);
  const data = await res.json();
  return data;
};

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <div>loading...</div>;
  }
  const cart = await getCart(session.user.userId);
  return <CartList data={cart} />;
}
