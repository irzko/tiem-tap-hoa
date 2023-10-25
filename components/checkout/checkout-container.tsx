"use client";
import Loading from "@/components/loading";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Link as NextLink,
} from "@nextui-org/react";
import AddAddressForm from "../user/add-address-form";

export default function CheckoutContainer({
  address,
  userId,
}: {
  address: IAddress[];
  userId: string;
}) {
  const [productsOrdered, setProductsOrdered] = useState<ICart[]>([]);

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
    <div className="grid lg:grid-cols-12 gap-4 max-w-7xl mx-auto">
      <div className="col-auto lg:col-span-8 space-y-4">
        <AddressShipping address={address} />
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-left">Sản phẩm</h2>
          </CardHeader>
          <CardBody>
            <div className="w-full text-sm text-left text-gray-500 dark:text-gray-400 p-5">
              {productsOrdered ? (
                productsOrdered.length > 0 ? (
                  <>
                    <div className="divide-y">
                      {productsOrdered.map((product) => (
                        <div
                          key={product.cartId}
                          className="dark:border-gray-700 grid sm:grid-cols-5 grid-cols-2 gap-2"
                        >
                          <div className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <Link
                              href={`/item/${product.productId}`}
                              className="flex items-center flex-wrap text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              <Image
                                src={`http://localhost:1337/${product.product.images[0]}`}
                                alt={product.product.productName}
                                width={80}
                                height={80}
                                className="object-cover aspect-square rounded-lg"
                              />
                            </Link>
                          </div>
                          <div className="sm:col-span-4 grid sm:grid-cols-4 gap-2 items-center">
                            <div className="font-medium text-gray-900 dark:text-white">
                              {product.product.productName}
                            </div>
                            <div>
                              {product.product.price.toLocaleString("vi-VN")}
                            </div>

                            <div>{product.quantity}</div>

                            <div>
                              {(
                                product.product.price * product.quantity
                              ).toLocaleString("vi-VN")}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <></>
                )
              ) : null}
            </div>
          </CardBody>
        </Card>
      </div>
      <Payment
        address={address}
        userId={userId}
        productsOrdered={productsOrdered}
      />
    </div>
  );
}

const paymentMethod = {
  COD: "Thanh toán khi nhận hàng",
  PAYPAL: "PayPal",
  PAYMENT_CARD: "Thẻ ngân hàng",
};

const Payment = ({
  address,
  userId,
  productsOrdered,
}: {
  address: IAddress[];
  userId: string;
  productsOrdered: ICart[];
}) => {
  const shippingFee = 30000;
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>();
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
    <div className="col-auto lg:col-span-4">
      <Card>
        <CardBody className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-left">
              Chọn phương thức thanh toán
            </h2>
            <Button
              // onClick={() => {
              //   showModal((onClose) => {
              //     return (
              //       <PaymentMethodModal
              //         onClose={onClose}
              //         setPaymentMethod={setSelectedPaymentMethod}
              //         // paymentMethods={paymentMethods}
              //       />
              //     );
              //   });
              // }}
              color="primary"
              variant="flat"
              className="w-full"
            >
              {selectedPaymentMethod
                ? paymentMethod[
                    selectedPaymentMethod as keyof typeof paymentMethod
                  ]
                : "Chọn phương thức thanh toán"}
            </Button>
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-left">Mã giảm giá</h2>
            <form>
              <ButtonGroup className="w-full">
                <Input
                  className=""
                  classNames={{
                    inputWrapper: "rounded-r-none",
                  }}
                  placeholder="Mã giảm giá (mã chỉ áp dụng 1 lần)"
                />
                <Button color="primary" variant="flat">
                  Áp dụng
                </Button>
              </ButtonGroup>
            </form>
          </div>
        </CardBody>
        <CardFooter className="flex flex-col items-start gap-2">
          <h2 className="text-lg font-semibold text-left">
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
          <Button
            fullWidth
            color="primary"
            variant="shadow"
            onPress={handleCheckout}
          >
            Đặt hàng
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

const AddressShipping = ({ address }: { address: IAddress[] }) => {
  return (
    <Card>
      <CardHeader>
        <div className="w-full flex justify-between items-center">
          <h2 className="text-lg font-semibold text-left">Địa chỉ nhận hàng</h2>
          <NextLink as={Link} href="/user/address/add">
            Chỉnh sửa
          </NextLink>
        </div>
      </CardHeader>
      <CardBody>
        {address ? (
          address.length > 0 ? (
            address.map((addr) => (
              <div key={addr.addressId}>
                <div className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                  <p>{addr.fullName}</p>
                  <p>{addr.phoneNumber}</p>
                  <p>
                    {addr.streetAddress}, {addr.ward.name}, {addr.district.name}
                    , {addr.city.name}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div>
              <div className="flex gap-8 justify-between items-start py-3 px-4 w-full sm:items-center lg:py-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Bạn chưa có địa chỉ nào
                </p>

                <AddAddressForm redirectPath="/checkout" />
              </div>
            </div>
          )
        ) : (
          <Loading />
        )}
      </CardBody>
    </Card>
  );
};
