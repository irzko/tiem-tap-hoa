import { adjustProductQuantity } from "@/libs/actions";

export default function AdjustProdQuantity({
  cartId,
  quantity,
}: {
  cartId: string;
  quantity: number;
}) {
  const handleSubmit = () => {};
  const handleBlur = () => {
    handleSubmit();
  };
  return (
    <div className="flex h-full md:h-auto">
      <form action={() => adjustProductQuantity(cartId, quantity - 1)}>
        <button
          type="submit"
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
      </form>
      <form
        id="adjust-quantity"
        action={(formData) =>
          adjustProductQuantity(
            cartId,
            formData.get(`${cartId}`) as unknown as number
          )
        }
        onSubmit={handleSubmit}
      >
        <input
          type="number"
          id={cartId}
          form="adjust-quantity"
          onBlur={handleBlur}
          defaultValue={quantity}
          min="0"
          className="block w-16 p-2 text-gray-900 border border-gray-300 bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </form>
      <form action={() => adjustProductQuantity(cartId, quantity + 1)}>
        <button
          type="submit"
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
      </form>
    </div>
  );
}
