"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Loading from "../loading";
import AdjustProdQuantity from "./adjust-prod-quantity";
import { deleteCart } from "@/lib/actions";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
} from "@nextui-org/react";

const Summary = ({
  selectedItems,
  carts,
}: {
  selectedItems: string[];
  carts: ICart[];
}) => {
  const router = useRouter();

  const summary = carts.reduce(
    (acc, cart) => {
      if (selectedItems.includes(cart.cartId)) {
        acc.total += cart.product.price * cart.quantity;
        acc.quantity++;
      }
      return acc;
    },
    { total: 0, quantity: 0 }
  );

  const handleCheckout = () => {
    sessionStorage.setItem("cart_store", JSON.stringify(selectedItems));
    router.push(`/checkout`);
  };
  return (
    <Card className="sticky bottom-0 inset-x-0 z-20" radius="none">
      <CardBody>
        <div className="mr-2">
          <span className="text-sm text-gray-500 dark:text-gray-300">{`Tổng thanh toán (${summary.quantity} sản phẩm): `}</span>
          <span className="flex items-center ml-0 text-sm font-medium text-blue-600 md:ml-1 md:inline-flex dark:text-blue-500">
            ₫{summary.total.toLocaleString("vi-VN")}
          </span>
        </div>
      </CardBody>
      <CardFooter>
        <Button
          color="primary"
          disabled={selectedItems.length > 0 ? false : true}
          onPress={handleCheckout}
        >
          Mua Hàng
        </Button>
      </CardFooter>
    </Card>
  );
};

export default function CartList({ data }: { data?: ICart[] }) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSelect = (cartId: string) => {
    const index = selectedItems.findIndex((item) => item === cartId);
    if (index === -1) {
      // Add cartId to selectedItems
      setSelectedItems([...selectedItems, cartId]);
    } else {
      // Delete cartId from selectedItems
      const newItemsSelected = [...selectedItems];
      newItemsSelected.splice(index, 1);
      setSelectedItems(newItemsSelected);
    }
  };

  return (
    <>
      {data ? (
        data.length > 0 ? (
          <div className="w-full space-y-4">
            {data.map((cart) => (
              <Card key={cart.cartId}>
                <CardHeader className="flex justify-between">
                  <Checkbox onChange={() => handleSelect(cart.cartId)}>
                    <h1 className="text-large line-clamp-1 font-medium">
                      {cart.product.productName}
                    </h1>
                  </Checkbox>
                  <form
                    action={() => deleteCart(cart.cartId)}
                    className="flex items-center"
                  >
                    <Button
                      isIconOnly
                      type="submit"
                      color="danger"
                      variant="flat"
                    >
                      <svg
                        className="w-4 h-4"
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
                          d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"
                        />
                      </svg>
                    </Button>
                  </form>
                </CardHeader>
                <CardBody>
                  <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                    <div className="relative col-span-3 sm:col-span-1 md:col-span-2">
                      <div className="relative w-full aspect-square">
                        <Image
                          className="object-cover rounded-lg"
                          src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${cart.product.images[0]}`}
                          alt={cart.product.productName}
                          fill
                          // sizes="200px"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-3 col-span-3 sm:col-span-5 md:col-span-10 gap-2">
                      <h3 className="flex items-center font-semibold">
                        {cart.product.price} VNĐ
                      </h3>
                      <div>
                        <AdjustProdQuantity
                          cartId={cart.cartId}
                          quantity={cart.quantity}
                        />
                      </div>
                      <h3 className="flex items-center font-semibold">
                        {cart.product.price * cart.quantity} VNĐ
                      </h3>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
            <Summary selectedItems={selectedItems} carts={data} />
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
