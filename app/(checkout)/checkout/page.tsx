import CheckoutContainer from "@/components/checkout/checkout-container";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const getAddress = async (userId: string) => {
  const res = await fetch(`${process.env.BASE_URL}/api/user/address/${userId}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
};

const getPaymentMethods = async (userId: string) => {
  const res = await fetch(
    `${process.env.BASE_URL}/api/user/payment-methods/${userId}`,
    {
      cache: "no-store",
    }
  );
  const data = await res.json();
  return data;
};

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  const userId = session.user.userId;
  const address = await getAddress(userId);
  const paymentMethods = await getPaymentMethods(userId);
  return <CheckoutContainer address={address} userId={userId} paymentMethods={paymentMethods} />;
}
