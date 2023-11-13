import CheckoutContainer from "@/components/checkout/checkout-container";
import getSession from "@/lib/getSession";

const getAddress = async (userId: string): Promise<IAddress> => {
  const res = await fetch(
    `${process.env.API_URL}/api/user/address/${userId}/default`,
    {
      next: { tags: ["address"] },
    }
  );
  const data = await res.json();
  return data;
};

export default async function Page() {
  const session = await getSession();
  if (!session) {
    return null;
  }
  const userId = session.user.userId;
  const address = await getAddress(userId);

  return <CheckoutContainer address={address} userId={userId} />;
}
