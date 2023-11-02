"use client";
import { unpaidAction } from "@/lib/actions";
import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";

export default function ButtonConfirm({ orderId }: { orderId: string }) {
  const { data: session } = useSession();

  return (
    <Button
      color="primary"
      onPress={() => unpaidAction(orderId, session?.user.userId!)}
    >
      Xác nhận
    </Button>
  );
}
