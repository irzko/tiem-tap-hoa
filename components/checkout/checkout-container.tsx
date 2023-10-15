"use client";
import Loading from "@/components/loading";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/button";
import InputField from "@/components/ui/input-field";
import useModal from "@/hooks/useModal";
import { useEffect, useState } from "react";
import PaymentMethodModal from "./payment-method-modal";

const paymentMethod = {
  COD: "Thanh toán khi nhận hàng",
  PAYPAL: "PayPal",
  PAYMENT_CARD: "Thẻ ngân hàng",
};

export default function CheckoutContainer({
  address,
  // paymentMethods,
  userId,
}: {
  address: IAddress[];
  // paymentMethods: IPaymentMethod[];
  userId: string;
}) {
  const [modal, showModal] = useModal();
  const [productsOrdered, setProductsOrdered] = useState<ICart[]>([]);
  const shippingFee = 30000;
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>();

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

  const handleCheckout = () => {
    const data = {
      userId: userId,
      addressId: address[0].addressId,
      paymentMethod: selectedPaymentMethod,
      shippingFee: shippingFee,
      products: productsOrdered,
    };
    fetch(`/api/orders`, {
      body: JSON.stringify(data),
      method: "POST",
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          console.log(data);
        });
      }
    });
  };
  return (
    <div className="grid lg:grid-cols-12 gap-4 max-w-7xl mx-auto">
      <div className="col-auto lg:col-span-8">
        <div className="bg-white dark:bg-gray-800 relative shadow-md rounded-lg overflow-hidden">
          <div className="p-5">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                Địa chỉ nhận hàng
              </h2>
              <Link
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                href="/user/address/add"
              >
                Chỉnh sửa
              </Link>
            </div>
            {address ? (
              address.length > 0 ? (
                address.map((addr) => (
                  <div key={addr.addressId}>
                    <div className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                      <p>{addr.fullName}</p>
                      <p>{addr.phoneNumber}</p>
                      <p>
                        {addr.streetAddress}, {addr.ward.name},{" "}
                        {addr.district.name}, {addr.city.name}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div>
                  <div className="flex gap-8 justify-between items-start py-3 px-4 w-full bg-gray-50 border border-b border-gray-200 sm:items-center dark:border-gray-700 lg:py-4 dark:bg-gray-800">
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Bạn chưa có địa chỉ nào
                    </p>
                    <Link href={`/user/address/add`}>
                      <Button>Thêm địa chỉ</Button>
                    </Link>
                  </div>
                </div>
              )
            ) : (
              <Loading />
            )}
          </div>
          <div className="overflow-x-auto">
            {productsOrdered ? (
              productsOrdered.length > 0 ? (
                <>
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
                    <tbody className="divide-y">
                      {productsOrdered.map((cart) => (
                        <tr key={cart.cartId} className="dark:border-gray-700">
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
                            {(
                              cart.product.price * cart.quantity
                            ).toLocaleString("vi-VN")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              ) : (
                <></>
              )
            ) : null}
          </div>
        </div>
      </div>
      <div className="col-auto lg:col-span-4">
        <div className="bg-white flex flex-col space-y-4 dark:bg-gray-800 rounded-lg p-5">
          <div>
            <h2 className="text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
              Chọn phương thức thanh toán
            </h2>
            <button
              onClick={() => {
                showModal((onClose) => {
                  return (
                    <PaymentMethodModal
                      onClose={onClose}
                      setPaymentMethod={setSelectedPaymentMethod}
                      // paymentMethods={paymentMethods}
                    />
                  );
                });
              }}
              className="inline-flex  items-center justify-between w-full p-2.5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              {selectedPaymentMethod
                ? paymentMethod[
                    selectedPaymentMethod as keyof typeof paymentMethod
                  ]
                : "Chọn phương thức thanh toán"}
            </button>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
              Mã giảm giá
            </h2>
            <form className="flex space-x-2">
              <div className="w-full">
                <InputField placeholder="Mã giảm giá (mã chỉ áp dụng 1 lần)" />
              </div>
              <Button style={{ whiteSpace: "nowrap", height: "100%" }}>
                Áp dụng
              </Button>
            </form>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
              Thông tin đơn hàng
            </h2>
            <div className="text-sm space-y-2 font-medium text-gray-500 dark:text-gray-400">
              <p>
                Tạm tính: ₫
                {productsOrdered
                  .reduce(
                    (acc, cart) => acc + cart.product.price * cart.quantity,
                    0
                  )
                  .toLocaleString("vi-VN")}
              </p>
              <p>Phí vận chuyển: ₫{shippingFee.toLocaleString("vi-VN")}</p>
              <p>
                Tổng cộng: ₫
                {(
                  productsOrdered.reduce(
                    (acc, cart) => acc + cart.product.price * cart.quantity,
                    0
                  ) + shippingFee
                ).toLocaleString("vi-VN")}
              </p>
            </div>
          </div>
          <Button onClick={handleCheckout}>Đặt hàng</Button>
        </div>
      </div>

      {modal}
    </div>
  );
}
