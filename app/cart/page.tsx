"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

export default function Page() {
  const { data: session } = useSession();
  const [carts, setCarts] = useState<ICart[]>();
  useEffect(() => {
    if (session) {
      fetch(`/api/cart/${session.user.userId}`).then((res) => {
        res.json().then((data) => {
          setCarts(data);
        });
      });
    }
  }, [session]);

  const handleDelete = (cartId: string) => {
    fetch(`/api/cart`, {
      body: JSON.stringify({
        cartId: cartId,
      }),
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        setCarts(carts?.filter((cart) => cart.cartId !== cartId));
      }
    });
  };

  return (
    <>
      {carts && carts.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Sản phẩm
                </th>
                <th scope="col" className="px-4 py-3">
                  Đơn Giá
                </th>
                <th scope="col" className="px-4 py-3">
                  Số Lượng
                </th>
                <th scope="col" className="px-4 py-3">
                  Số Tiền
                </th>
                <th scope="col" className="px-4 py-3">
                  <span className="sr-only">Thao tác</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {carts.map((cart) => (
                <tr key={cart.cartId} className="border-b dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {cart.product.productName}
                  </th>
                  <td className="px-4 py-3">
                    {cart.product.price.toLocaleString("vi-VN")}
                  </td>
                  <td className="px-4 py-3">{cart.quantity}</td>
                  <td className="px-4 py-3">
                    {(cart.product.price * cart.quantity).toLocaleString(
                      "vi-VN"
                    )}
                  </td>
                  <td className="px-4 py-3 flex items-center justify-end">
                    <button
                      className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                      type="button"
                      onClick={() => handleDelete(cart.cartId)}
                    >
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <></>
      )}
      <Toaster />
    </>
  );
}
