import { ChangeEvent, useState } from "react";
import { mutate } from "swr";

export default function AdjustProductQuantity({
  cartId,
  quantity,
  userId,
}: {
  cartId: string;
  quantity: number;
  userId?: string;
}) {
  const [quant, setQuant] = useState<string>(quantity.toString());
  const decrease = () => {
    const currentQuant = parseInt(quant);

    if (currentQuant >= 1) {
      setQuant((currentQuant - 1).toString());
      fetch(`/api/cart`, {
        body: JSON.stringify({
          cartId: cartId,
          quantity: currentQuant - 1,
        }),
        method: "PUT",
      }).then((res) => {
        if (res.ok) {
          mutate(`/api/cart/${userId}`);
        }
      });
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    parseInt(event.target.value) < 0
      ? setQuant("0")
      : setQuant(event.target.value);
  };

  const increase = () => {
    const currentQuant = parseInt(quant);
    setQuant((currentQuant + 1).toString());
    fetch(`/api/cart`, {
      body: JSON.stringify({
        cartId: cartId,
        quantity: currentQuant + 1,
      }),
      method: "PUT",
    }).then((res) => {
      if (res.ok) {
        mutate(`/api/cart/${userId}`);
      }
    });
  };

  const handleBlur = () => {
    const currentQuant = parseInt(quant);

    if (currentQuant >= 1) {
      fetch(`/api/cart`, {
        body: JSON.stringify({
          cartId: cartId,
          quantity: currentQuant,
        }),
        method: "PUT",
      }).then((res) => {
        if (res.ok) {
          mutate(`/api/cart/${userId}`);
        }
      });
    }
  };
  return (
    <div className="flex">
      <button
        type="button"
        onClick={decrease}
        className="z-10 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-sm dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 p-2.5 h-full rounded-l-lg"
      >
        <svg
          className="w-3.5 h-3.5 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 2"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h16"
          />
        </svg>
      </button>
      <input
        type="number"
        id={cartId}
        onChange={handleChange}
        onBlur={handleBlur}
        value={quant}
        min="0"
        className="block w-16 p-2 text-gray-900 border border-gray-300 bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      />
      <button
        type="button"
        onClick={increase}
        className="z-10 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-sm dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 p-2.5 h-full rounded-r-lg"
      >
        <svg
          className="w-3.5 h-3.5 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 1v16M1 9h16"
          />
        </svg>
      </button>
    </div>
  );
}
