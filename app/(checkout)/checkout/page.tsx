"use client";
import Loading from "@/components/loading";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import useSWR, { Fetcher } from "swr";
import { useSession } from "next-auth/react";

const addressFetcher: Fetcher<IAddress[], string> = (url) =>
  fetch(url).then((res) => res.json());
export default function Page() {
  const { data: session } = useSession();
  const [itemsSelected, setItemsSelected] = useState<ICart[]>([]);

  const { data: address } = useSWR(`/api/user/address/${session?.user.userId}`, addressFetcher);

  useEffect(() => {
    const localData = localStorage.getItem("itemsSelected");
    if (localData) {
      setItemsSelected(JSON.parse(localData));
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <div>
        <h2>{session?.user.fullName}</h2>
      </div>
      {itemsSelected ? (
        itemsSelected.length > 0 ? (
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
                  </tr>
                </thead>
                <tbody>
                  {itemsSelected.map((cart) => (
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
                      <td className="px-4 py-3">{cart.quantity}</td>
                      <td className="px-4 py-3">
                        {(cart.product.price * cart.quantity).toLocaleString(
                          "vi-VN"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
