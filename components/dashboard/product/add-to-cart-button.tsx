"use client";

import { useSession } from "next-auth/react";
import Button from "../../ui/button";
import { toast } from "react-toastify";
import { mutate } from "swr";
import { useRouter } from "next/navigation";

interface Props {
  productId: string;
}

export default function AddToCartButton({ productId }: Props) {
  const { data: session } = useSession();
  const router = useRouter();
  const handleClick = () => {
    if (!session) {
      router.push("/auth");
      return;
    }
    fetch(`/api/cart`, {
      method: "POST",
      body: JSON.stringify({
        productId: productId,
        userId: session.user.userId,
        quantity: 1,
      }),
    }).then((res) => {
      if (res.ok) {
        toast.success("Thêm vào giỏ hàng thành công", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        mutate(`/api/cart/count/${session?.user?.userId}`);
      }
    });
  };
  return (
    <div>
      <Button onClick={handleClick}>Thêm vào giỏ hàng</Button>
    </div>
  );
}
