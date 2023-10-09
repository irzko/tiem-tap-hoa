"use client";
import { useState } from "react";
import InputField from "@/components/ui/input-field";

export default function Page() {
  const [toggle, setToggle] = useState(false);
  const [address, setAddress] = useState<[ICity, IDistrict, IWard]>();

  return (
    <div className="grid grid-cols-2 gap-2">
      <InputField label="Họ và tên" />
      <InputField label="Số điện thoại" />
      <button
        className="block rounded-lg px-2.5 col-span-2 w-full text-sm text-start border-2 appearance-none focus:outline-none focus:ring-0 py-2.5 bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onClick={() => setToggle(true)}
      >
        {address
          ? address?.map((item) => item.name).join(", ")
          : "Chọn địa chỉ"}
      </button>

      <div className="col-span-2">
        <InputField label="Địa chỉ cụ thể" />
      </div>
    </div>
  );
}
