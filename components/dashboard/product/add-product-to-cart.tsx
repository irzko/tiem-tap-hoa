"use client";

import { useSession } from "next-auth/react";
import Button from "../../ui/button";
import { toast } from "react-toastify";
import { mutate } from "swr";

interface Props {
  productId: string;
}

export default function AddProductToCart({ productId }: Props) {
  const { data: session } = useSession();
  const handleClick = () => {
    fetch(`/api/cart`, {
      method: "POST",
      body: JSON.stringify({
        productId: productId,
        userId: session?.user?.userId,
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
