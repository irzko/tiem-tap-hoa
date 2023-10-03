"use client";
import AdjustProductQuantity from "@/components/adjust-product-quantity";
import Loading from "@/components/loading";
import { useSession } from "next-auth/react";
import useSWR, { Fetcher, mutate } from "swr";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

const cartFetcher: Fetcher<ICart[], string> = (url) =>
  fetch(url).then((res) => res.json());

export default function Page() {
  const { data: session } = useSession();

  const [itemsSelected, setItemsSelected] = useState<ICart[]>([]);
  const [total, setTotal] = useState<number>(0);

  const { data: carts } = useSWR(
    `/api/cart/${session?.user?.userId}`,
    cartFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const handleDelete = (cartId: string) => {
    fetch(`/api/cart`, {
      body: JSON.stringify({
        cartId: cartId,
      }),
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        mutate(`/api/cart/count/${session?.user?.userId}`);
        mutate(`/api/cart/${session?.user?.userId}`);
      }
    });
  };

  const handleSelect = (cart: ICart) => {
    const index = itemsSelected.findIndex(
      (item) => item.cartId === cart.cartId
    );
    if (index === -1) {
      setItemsSelected([...itemsSelected, cart]);
      setTotal(total + cart.product.price * cart.quantity);
    } else {
      const newItemsSelected = [...itemsSelected];
      newItemsSelected.splice(index, 1);
      setItemsSelected(newItemsSelected);
      setTotal(total - cart.product.price * cart.quantity);
    }
  };

  const router = useRouter();
  const handleBuy = () => {
    localStorage.setItem("itemsSelected", JSON.stringify(itemsSelected));
    router.push("/checkout");
  };

  return (
    <div className="max-w-7xl mx-auto">
      {carts ? (
        carts.length > 0 ? (
          <>
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
                    <tr
                      key={cart.cartId}
                      className="border-b dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <form>
                          <div className="flex items-center mb-4">
                            <input
                              id="default-checkbox"
                              type="checkbox"
                              onChange={() => handleSelect(cart)}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <Link
                              href={`/item/${cart.productId}`}
                              className="ml-2 break-words flex items-center flex-wrap text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              <Image
                                src={`http://localhost:1337/${cart.product.images[0]}`}
                                alt={cart.product.productName}
                                width={80}
                                height={80}
                              />
                              {cart.product.productName}
                            </Link>
                          </div>
                        </form>
                      </th>
                      <td className="px-4 py-3">
                        {cart.product.price.toLocaleString("vi-VN")}
                      </td>
                      <td className="px-4 py-3">
                        {/* {cart.quantity} */}
                        <AdjustProductQuantity
                          quantity={cart.quantity}
                          cartId={cart.cartId}
                          userId={session?.user?.userId}
                        />
                      </td>
                      <td className="px-4 py-3">
                        {(cart.product.price * cart.quantity).toLocaleString(
                          "vi-VN"
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                          type="button"
                          onClick={() => handleDelete(cart.cartId)}
                        >
                          Xoá
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="sticky mt-2 bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-end md:p-6 dark:bg-gray-800 dark:border-gray-600">
              <div className="mr-2">
                <span className="text-sm text-gray-500 dark:text-gray-300">{`Tổng thanh toán (${itemsSelected.length} sản phẩm): `}</span>
                <span className="flex items-center ml-0 text-sm font-medium text-blue-600 md:ml-1 md:inline-flex dark:text-blue-500">
                  ₫{total.toLocaleString("vi-VN")}
                </span>
              </div>
              <Button
                disabled={itemsSelected.length > 0 ? false : true}
                onClick={handleBuy}
              >
                Mua Hàng
              </Button>
            </div>
          </>
        ) : (
          <></>
        )
      ) : (
        <Loading />
      )}
    </div>
  );
}
