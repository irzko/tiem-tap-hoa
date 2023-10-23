"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import Button from "../ui/button";
import { useRouter } from "next/navigation";
import Loading from "../loading";
import AdjustProdQuantity from "./adjust-prod-quantity";
import { deleteCart } from "@/libs/actions";

export default function CartList({ data }: { data?: ICart[] }) {
  const [itemsSelected, setItemsSelected] = useState<ICart[]>([]);
  const [total, setTotal] = useState<number>(0);
  const router = useRouter();

  const handleSelect = (cart: ICart) => {
    const index = itemsSelected.findIndex(
      (item) => item.cartId === cart.cartId
    );
    if (index === -1) {
      // const newItemsSelected = [...itemsSelected];
      setItemsSelected([...itemsSelected, cart]);
      setTotal(total + cart.product.price * cart.quantity);
    } else {
      const newItemsSelected = [...itemsSelected];
      newItemsSelected.splice(index, 1);
      setItemsSelected(newItemsSelected);
      setTotal(total - cart.product.price * cart.quantity);
    }
  };

  const handleCheckout = () => {
    sessionStorage.setItem(
      "cart_store",
      JSON.stringify(itemsSelected.map((item) => item.cartId))
    );
    router.push(`/checkout`);
  };

  return (
    <>
      {data ? (
        data.length > 0 ? (
          <div className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <div className="divide-y">
              {data.map((cart) => (
                <div
                  key={cart.cartId}
                  className="dark:border-gray-700 grid md:grid-cols-6 grid-cols-2 gap-2 py-4"
                >
                  <div className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
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
                          className="ml-2 flex items-center flex-wrap text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          <Image
                            src={`http://localhost:1337/${cart.product.images[0]}`}
                            alt={cart.product.productName}
                            width={80}
                            height={80}
                          />
                        </Link>
                      </div>
                    </form>
                  </div>
                  <div className="md:col-span-5 grid md:grid-cols-5 gap-2 items-center">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {cart.product.productName}
                    </div>
                    <div>{cart.product.price.toLocaleString("vi-VN")}</div>

                    <AdjustProdQuantity
                      quantity={cart.quantity}
                      cartId={cart.cartId}
                    />
                    <div>
                      {(cart.product.price * cart.quantity).toLocaleString(
                        "vi-VN"
                      )}
                    </div>
                    <div>
                      <form action={() => deleteCart(cart.cartId)}>
                        <button
                          className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                          type="submit"
                        >
                          Xoá
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              ))}
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
                onClick={handleCheckout}
              >
                Mua Hàng
              </Button>
            </div>
          </div>
        ) : (
          <></>
        )
      ) : (
        <Loading />
      )}
    </>
  );
}
