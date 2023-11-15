"use client";
import Link from "next/link";
import Image from "next/image";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
  Link as NextLink,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Chip,
} from "@nextui-org/react";
import AddAddressForm, { AddressSelect } from "../user/add-address-form";
import useSWR, { Fetcher, mutate } from "swr";
import { useRouter } from "next/navigation";
import { orderAction } from "@/lib/actions";
import { Coupon } from "@prisma/client";
import { useSession } from "next-auth/react";

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
    <div className="grid md:grid-cols-12 gap-4 max-w-7xl mx-auto">
      <div className="col-auto md:col-span-8 space-y-4">
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
                              Đơn giá:{" "}
                              {product.product.price.toLocaleString("vi-VN")}
                            </div>

                            <div>Số lượng: {product.quantity}</div>

                            <div>
                              Thành tiền:{" "}
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

const Coupon = ({
  setDiscount,
  discount,
}: {
  discount: Coupon[];
  setDiscount: Dispatch<SetStateAction<Coupon[]>>;
}) => {
  const [couponCode, setCouponCode] = useState<string>("");
  const handleSubmitCoupon = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch("/api/coupon/apply?couponCode=" + couponCode)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setDiscount((prev) => [...prev, data.data]);
          setCouponCode("");
        }
      });
  };
  return (
    <>
      <form className="space-y-4" onSubmit={handleSubmitCoupon}>
        <Input
          label="Mã giảm giá"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Mã giảm giá (mã chỉ áp dụng 1 lần)"
          endContent={
            <Button type="submit" color="primary" variant="flat">
              Áp dụng
            </Button>
          }
        />
      </form>
      <ul className="text-sm space-y-2 font-medium text-gray-500 dark:text-gray-400">
        {discount.map((coupon) => (
          <li key={coupon.couponCode}>
            {coupon.couponCode}: -₫{coupon.discount.toLocaleString("vi-VN")}
          </li>
        ))}
      </ul>
    </>
  );
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
  const [selectedServiceId, setSelectedServiceId] = useState<string>("");
  const router = useRouter();
  const [shippingFee, setShippingFee] = useState<number>(0);
  const [discount, setDiscount] = useState<Coupon[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    setTotalAmount(
      productsOrdered.reduce(
        (acc, cart) => acc + cart.product.price * cart.quantity,
        0
      ) +
        shippingFee -
        discount.reduce((acc, coupon) => acc + coupon.discount, 0)
    );
  }, [discount, productsOrdered, shippingFee]);

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
    const serviceId = selectedServiceId;
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

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("VNPAY");

  const handleCheckout = () => {
    const data = {
      userId,
      shippingAddress:
        address.fullName +
        ", " +
        address.phoneNumber +
        ", " +
        address.streetAddress +
        ", " +
        address.ward.WardName +
        ", " +
        address.district.DistrictName +
        ", " +
        address.province.ProvinceName,
      paymentMethod: selectedPaymentMethod,
      totalAmount,
      shippingFee: shippingFee,
      products: productsOrdered,
    };
    if (selectedPaymentMethod === "COD") {
      orderAction(data);
    } else if (selectedPaymentMethod === "VNPAY") {
      fetch("/api/orders", {
        method: "POST",
        body: JSON.stringify(data),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.url) {
            router.push(data.url);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="col-auto md:col-span-4">
      <Card>
        <CardBody className="space-y-4">
          <RadioGroup
            value={selectedPaymentMethod}
            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
            label="Chọn phương thức thanh toán"
          >
            <Radio
              value="VNPAY"
              description="Cổng thanh toán trực tuyến VNPAY"
              classNames={{
                base: "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between max-w-full flex-row-reverse cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent data-[selected=true]:border-primary",
              }}
            >
              <Image
                src="/vnpay-logo.svg"
                alt="VNPAY"
                width={100}
                height={50}
              />
            </Radio>
            <Radio
              value="COD"
              classNames={{
                base: "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between max-w-full flex-row-reverse cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent data-[selected=true]:border-primary",
              }}
            >
              Thanh toán khi nhận hàng
            </Radio>
          </RadioGroup>
          <Divider />

          <Select
            // selectedKeys={selectedServiceId}
            // onSelectionChange={(key) => setSelectedServiceId(new Set(key))}

            onChange={(e) => setSelectedServiceId(e.target.value)}
            label="Phương thức vận chuyển"
            placeholder="Chọn phương thức vận chuyển"
            // items={services ?? []}
          >
            {services &&
              services.map((item: any) => (
                <SelectItem key={item.service_id} value={item.service_id}>
                  {item.short_name}
                </SelectItem>
              ))}
          </Select>
          <Coupon discount={discount} setDiscount={setDiscount} />
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
              Giảm giá: -₫
              {discount
                .reduce((acc, coupon) => acc + coupon.discount, 0)
                .toLocaleString("vi-VN")}
            </p>
            <p>Tổng cộng: ₫{totalAmount.toLocaleString("vi-VN")}</p>
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

const addressFetcher: Fetcher<IAddress[], string> = async (url) => {
  return fetch(url).then((res) => res.json());
};

export function AddressModal() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { data: session } = useSession();
  const [page, setPage] = useState<number>(1);
  const [selectedAddress, setSelectedAddress] = useState<[any, any, any]>([
    {},
    {},
    {},
  ]);

  const { data: addresses, error: addressError } = useSWR(
    `/api/user/address/${session?.user.userId}`,
    addressFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const renderModal = useMemo(() => {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      fetch("/api/user/address", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.userId,
          fullName: e.currentTarget.fullName.value,
          phoneNumber: e.currentTarget.phoneNumber.value,
          province: selectedAddress[0],
          district: selectedAddress[1],
          ward: selectedAddress[2],
          streetAddress: e.currentTarget.streetAddress.value,
        }),
      }).then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            if (data) {
              setPage(1);
              mutate(`/api/user/address/${session?.user.userId}`);
            }
          });
        }
      });
    };
    switch (page) {
      case 1:
        return (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Chọn địa chỉ
            </ModalHeader>
            <ModalBody>
              <Button variant="bordered" onClick={() => setPage(2)}>
                Thêm địa chỉ mới
              </Button>
              <RadioGroup>
                {addresses &&
                  addresses.map((address) => (
                    <Radio
                      key={address.addressId}
                      value={address.addressId}
                      classNames={{
                        base: "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between max-w-full flex-row-reverse cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent data-[selected=true]:border-primary",
                      }}
                    >
                      <>
                        <span
                          data-label="true"
                          className="flex-1 text-small font-normal truncate"
                        >
                          <h4 className="font-bold text-large">
                            {address.fullName}
                          </h4>
                          <p>{address.phoneNumber}</p>

                          <p>
                            {address.streetAddress}, {address.ward.WardName},{" "}
                            {address.district.DistrictName},{" "}
                            {address.province.ProvinceName}
                          </p>
                          {address.isDefault && (
                            <Chip color="warning" variant="flat">
                              Mặc định
                            </Chip>
                          )}
                        </span>
                      </>
                    </Radio>
                  ))}
              </RadioGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Hủy
              </Button>
              <Button color="primary" onPress={onClose}>
                Lưu
              </Button>
            </ModalFooter>
          </>
        );
      case 2:
        return (
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <ModalHeader className="flex items-center gap-2">
              <Button isIconOnly onClick={() => setPage(1)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
              <span>Thêm địa chỉ mới</span>
            </ModalHeader>
            <ModalBody>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input id="fullName" name="fullName" label="Họ và tên" />
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Số điện thoại"
                />
              </div>
              <AddressSelect
                selectedAddress={selectedAddress}
                setSelectedAddress={setSelectedAddress}
              />

              <Input
                id="streetAddress"
                name="streetAddress"
                label="Địa chỉ cụ thể"
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Hủy
              </Button>
              <Button type="submit" color="primary">
                Thêm
              </Button>
            </ModalFooter>
          </form>
        );
    }
  }, [addresses, onClose, page, selectedAddress, session?.user.userId]);

  return (
    <>
      <Button onPress={onOpen}>Chỉnh sửa</Button>
      <Modal
        size="xl"
        isOpen={isOpen}
        onOpenChange={() => {
          onOpenChange();
          setPage(1);
        }}
      >
        <ModalContent>{(onClose) => <>{renderModal}</>}</ModalContent>
      </Modal>
    </>
  );
}

const AddressShipping = ({ address }: { address: IAddress }) => {
  return (
    <Card>
      <CardHeader>
        <div className="w-full flex justify-between items-center">
          <h2 className="text-lg font-semibold text-left">Địa chỉ nhận hàng</h2>
          {/* <NextLink as={Link} href="/user/address">
            Chỉnh sửa
          </NextLink> */}
          <AddressModal />
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
            <div className="flex gap-8 justify-between items-start py-3 px-4 w-full sm:items-center md:py-4">
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
