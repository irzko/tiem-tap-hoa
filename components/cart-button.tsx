import getSession from "@/lib/getSession";
import { Badge, Button } from "@nextui-org/react";
import Link from "next/link";

const getCartNumber = async (
  userId: string
): Promise<{ cartNum: number; sucsses: boolean }> => {
  const res = await fetch(`${process.env.API_URL}/api/cart/count/${userId}`, {
    next: { tags: ["cartNum"] },
  });
  const data = await res.json();
  return data;
};

const CartButton = async () => {
  const session = await getSession();
  const cartNumber = await getCartNumber(session?.user.userId as string);
  return (
    <Badge content={cartNumber?.cartNum} color="primary">
      <Button isIconOnly as={Link} href="/cart" variant="flat" type="button">
        <svg
          className="w-4 h-4 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1"
          />
        </svg>
        <span className="sr-only">Cart</span>
      </Button>
    </Badge>
  );
};

export default CartButton;
