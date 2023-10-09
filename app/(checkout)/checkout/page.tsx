"use client";
import Loading from "@/components/loading";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import useSWR, { Fetcher } from "swr";
import { useSession } from "next-auth/react";
import Button from "@/components/ui/button";
import useModal from "@/hooks/useModal";
import AddAddressForm from "@/components/user/add-address-form";

const addressFetcher: Fetcher<IAddress[], string> = (url) =>
  fetch(url).then((res) => res.json());

const cartFetcher: Fetcher<ICart[], string> = (url) =>
  fetch(url).then((res) => res.json());

export default function Page() {
  const [modal, showModal] = useModal();
  const { data: session } = useSession();
  const [productsOrdered, setProductsOrdered] = useState<ICart[]>([]);

  const { data: address } = useSWR(
    `/api/user/address/${session?.user.userId}`,
    addressFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    const cartStore = sessionStorage.getItem("cart_store");
    if (cartStore) {
      fetch(`/api/checkout`, {
        body: cartStore,
        method: "POST",
      }).then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setProductsOrdered(data);
          });
        }
      });
    }
  }, []);

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <div>
          <h5>Địa chỉ nhận hàng</h5>
          {address ? (
            address.length > 0 ? (
              address.map((addr) => (
                <div key={addr.addressId}>
                  <div>
                    <p>{addr.city}</p>
                    <p>{addr.district}</p>
                    <p>{addr.ward}</p>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <div className="flex gap-8 justify-between items-start py-3 px-4 w-full bg-gray-50 border border-b border-gray-200 sm:items-center dark:border-gray-700 lg:py-4 dark:bg-gray-800">
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Bạn chưa có địa chỉ nào
                  </p>
                  <Button
                    onClick={() =>
                      showModal("Thêm địa chỉ", (onClose) => {
                        return <AddAddressForm />;
                      })
                    }
                  >
                    Thêm địa chỉ
                  </Button>
                </div>
              </div>
            )
          ) : (
            <Loading />
          )}
        </div>
        <div>
          <h2>{session?.user.fullName}</h2>
        </div>
        {productsOrdered ? (
          productsOrdered.length > 0 ? (
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
                    {productsOrdered.map((cart) => (
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
                                {cart.product.images ? (
                                  <Image
                                    src={`http://localhost:1337/${cart.product.images[0]}`}
                                    alt={cart.product.productName}
                                    width={80}
                                    height={80}
                                  />
                                ) : (
                                  <></>
                                )}
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
      {modal}
    </>
  );
}
