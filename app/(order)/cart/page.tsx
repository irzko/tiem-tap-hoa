import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import CartList from "@/components/cart/cart-list";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giỏ hàng",
};

const getCart = async (userId: string) => {
  const res = await fetch(`${process.env.API_URL}/api/cart/${userId}`);
  const data = await res.json();
  return data;
};

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  const cart = await getCart(session.user.userId);
  return (
    <div className="max-w-screen-md mx-auto">
      <CartList data={cart} />
    </div>
  );
}
