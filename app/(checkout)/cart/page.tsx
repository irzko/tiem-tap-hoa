import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import CartList from "@/components/cart/cart-list";

const getCart = async (userId: string) => {
  const res = await fetch(`${process.env.API_URL}/api/cart/${userId}`, {
    cache: "no-store",
  });
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
    <div className="max-w-7xl mx-auto">
      <CartList data={cart} />
    </div>
  );
}
