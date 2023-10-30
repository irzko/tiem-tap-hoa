"use client";
import Link from "next/link";
import Image from "next/image";
import { Key, useEffect, useState } from "react";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Link as NextLink,
  Select,
  SelectItem,
} from "@nextui-org/react";
import AddAddressForm from "../user/add-address-form";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const paymentMethod = [
  {
    label: "Thanh toán khi nhận hàng",
    value: "COD",
  },
  {
    label: "PayPal",
    value: "PAYPAL",
  },
  {
    label: "Thẻ ngân hàng",
    value: "PAYMENT_CARD",
  },
];

export default function CheckoutContainer({
  address,
  userId,
}: {
  address: IAddress;
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
                                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${product.product.images[0]}`}
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

const getServiceFetcher = async (url: string, data: any) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: process.env.NEXT_PUBLIC_GHN_TOKEN as string,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => data.data);
};

const Payment = ({
  address,
  userId,
  productsOrdered,
}: {
  address: IAddress;
  userId: string;
  productsOrdered: ICart[];
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<Set<Key>>(
    new Set([])
  );

  const router = useRouter();

  const [shippingFee, setShippingFee] = useState<number>(0);

  const { data: services, error: servicesError } = useSWR(
    `${process.env.NEXT_PUBLIC_GHN_API_URL}/v2/shipping-order/available-services`,
    (url) =>
      getServiceFetcher(url, {
        shop_id: parseInt(process.env.NEXT_PUBLIC_GHN_SHOP_ID as string),
        from_district: parseInt(
          process.env.NEXT_PUBLIC_GHN_SHOP_DISTRICT_ID as string
        ),
        to_district: address.district.DistrictID,
      }),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    const serviceId = selectedServiceId.values().next().value;
    if (serviceId && address.addressId && productsOrdered.length > 0) {
      fetch(`${process.env.NEXT_PUBLIC_GHN_API_URL}/v2/shipping-order/fee`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: process.env.NEXT_PUBLIC_GHN_TOKEN as string,
          ShopId: process.env.NEXT_PUBLIC_GHN_SHOP_ID as string,
        },
        body: JSON.stringify({
          from_district_id: parseInt(
            process.env.NEXT_PUBLIC_GHN_SHOP_DISTRICT_ID as string
          ),
          from_ward_code: process.env.NEXT_PUBLIC_GHN_SHOP_WARD_CODE as string,
          service_id: parseInt(serviceId),
          to_district_id: parseInt(address.district.DistrictID),
          to_ward_code: address.ward.WardCode,
          height: productsOrdered[0].product.height,
          length: productsOrdered[0].product.length,
          weight: productsOrdered[0].product.weight,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.code === 200) {
            setShippingFee(data.data.total);
          }
        });
    }
  }, [address, productsOrdered, selectedServiceId]);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<Set<Key>>(
    new Set([])
  );


  const handleCheckout = () => {
    const data = {
      userId: userId,
      addressId: address.addressId,
      paymentMethod: selectedPaymentMethod.entries().next().value[0],
      shippingFee: shippingFee,
      products: productsOrdered,
    };
    fetch(`/api/orders`, {
      body: JSON.stringify(data),
      method: "POST",
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          toast.success("Đặt hàng thành công");
          router.push("/user/purchase/unpaid");
        });
      }
    });
  };

  return (
    <div className="col-auto lg:col-span-4">
      <Card>
        <CardBody className="space-y-4">
          <Select
            selectedKeys={selectedPaymentMethod}
            onSelectionChange={(key) => setSelectedPaymentMethod(new Set(key))}
            label="Phương thức thanh toán"
            placeholder="Chọn phương thức thanh toán"
            items={paymentMethod}
          >
            {(item) => (
              <SelectItem key={item.value}>
                {item.label}
              </SelectItem>
            )}
          </Select>

          <Select
            selectedKeys={selectedServiceId}
            onSelectionChange={(key) => setSelectedServiceId(new Set(key))}
            label="Phương thức vận chuyển"
            placeholder="Chọn phương thức vận chuyển"
            items={services ?? []}
          >
            {(item: any) => (
              <SelectItem key={item.service_id} value={item.service_id}>
                {item.short_name}
              </SelectItem>
            )}
          </Select>
          <form className="space-y-4">
            <Input
              label="Mã giảm giá"
              placeholder="Mã giảm giá (mã chỉ áp dụng 1 lần)"
            />
            <div className="flex justify-end">
              <Button color="primary" variant="flat">
                Áp dụng
              </Button>
            </div>
          </form>
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

const AddressShipping = ({ address }: { address: IAddress }) => {
  return (
    <Card>
      <CardHeader>
        <div className="w-full flex justify-between items-center">
          <h2 className="text-lg font-semibold text-left">Địa chỉ nhận hàng</h2>
          <NextLink as={Link} href="/user/address">
            Chỉnh sửa
          </NextLink>
        </div>
      </CardHeader>
      <CardBody>
        {address ? (
          <div>
            <div className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
              <p>{address.fullName}</p>
              <p>{address.phoneNumber}</p>
              <p>
                {address.streetAddress}, {address.ward.WardName},{" "}
                {address.district.DistrictName}, {address.province.ProvinceName}
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex gap-8 justify-between items-start py-3 px-4 w-full sm:items-center lg:py-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Bạn chưa có địa chỉ nào
              </p>

              <AddAddressForm />
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
};
