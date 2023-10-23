"use client";

import { Badge, Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import useSWR, { Fetcher } from "swr";

const cartNumberFetch: Fetcher<{
  cartNum: number;
  sucsses: boolean;
}> = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

const CartButton = () => {
  const { data: session } = useSession();
  const { data: cartNumber } = useSWR(
    `/api/cart/count/${session?.user.userId}`,
    cartNumberFetch,
    {
      // revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return (
    <Badge content={cartNumber?.cartNum} color="primary">
      <Link href="/cart">
        <Button isIconOnly variant="flat" type="button">
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
      </Link>
    </Badge>
  );
};

export default CartButton;
