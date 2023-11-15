"use client";
import {
  Card,
  CardBody,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  CardHeader,
  Input,
} from "@nextui-org/react";
import { Coupon } from "@prisma/client";
import { FormEvent } from "react";
import useSWR, { Fetcher, mutate } from "swr";

export function AddCouponModal() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch("/api/coupon", {
      method: "POST",
      body: JSON.stringify({
        couponCode: event.currentTarget.couponCode.value,
        description: event.currentTarget.description.value,
        discount: event.currentTarget.discount.value,
        quantity: event.currentTarget.quantity.value,
      }),
    }).then((res) => {
      if (res.ok) {
        mutate("/api/coupon");
        onClose();
      }
    });
  };

  return (
    <>
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={handleSubmit}>
                <ModalHeader className="flex flex-col gap-1">
                  Thêm mã giảm giá
                </ModalHeader>
                <ModalBody>
                  <Input
                    name="couponCode"
                    label="Mã giảm giá"
                    placeholder="Nhập mã giảm giá"
                  />
                  <Input
                    name="description"
                    label="Mô tả"
                    placeholder="Nhập mô tả"
                  />
                  <Input
                    name="discount"
                    label="Giảm giá"
                    placeholder="Nhập giảm giá"
                  />
                  <Input
                    name="quantity"
                    label="Số lượng"
                    placeholder="Nhập số lượng"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button variant="light" onPress={onClose}>
                    Hủy
                  </Button>
                  <Button color="primary" type="submit">
                    Thêm
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

const fetcher: Fetcher<Coupon[], string> = (url) =>
  fetch(url).then((res) => res.json());
export default function Page() {
  const { data: coupons, error } = useSWR("/api/coupon", fetcher);
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-2xl font-semibold">Mã giảm giá</h2>
          <AddCouponModal />
        </div>
      </CardHeader>
      <CardBody>
        {coupons && coupons.map((coupon) => coupon.couponCode)}
      </CardBody>
    </Card>
  );
}
