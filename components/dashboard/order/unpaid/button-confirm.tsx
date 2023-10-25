"use client";
import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

export default function ButtonConfirm({ orderId }: { orderId: string }) {
  const { data: session } = useSession();
  const handleConfirm = () => {
    fetch(`/api/orders/unpaid`, {
      method: "PUT",
      body: JSON.stringify({ orderId, userId: session?.user?.userId }),
    }).then((res) => {
      if (res.ok) {
        toast.success("Xác nhận thành công");
      } else {
        toast.error("Xác nhận thất bại");
      }
    });
  };
  return <Button onPress={handleConfirm}>Xác nhận</Button>;
}
