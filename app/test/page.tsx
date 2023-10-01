"use client";

import AdjustProductQuantity from "@/components/adjust-product-quantity";
import React from "react";
import { toast } from "react-toastify";
const notify = () => {
  toast.success("Success Notification !");
};
export default function Page() {
  return (
    <div>
      <AdjustProductQuantity />
    </div>
  );
}
