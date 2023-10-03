"use client";

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
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return (
    <Link href="/cart" scroll={false}>
      <button
        type="button"
        className="relative text-gray-900 w-8 h-8 flex justify-center bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-full text-sm text-center items-center mr-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600 dark:hover:border-gray-600"
      >
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
        {cartNumber && cartNumber.cartNum > 0 ? (
          <div className="absolute inline-flex items-center justify-center p-0.5 leading-none px-2 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -translate-y-1/2 translate-x-1/2 left-auto top-0 right-0 dark:border-gray-900">
            {cartNumber.cartNum}
            {/* 1351 */}
          </div>
        ) : null}
      </button>
    </Link>
  );
};

export default CartButton;
