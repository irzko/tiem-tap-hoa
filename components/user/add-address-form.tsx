"use client";
import { useState } from "react";
import InputField from "@/components/ui/input-field";
import { SelectAddress } from "./select-address";
import Button from "../ui/button";

export default function AddAddressForm() {
  const [toggle, setToggle] = useState(false);
  const [address, setAddress] = useState<[ICity, IDistrict, IWard]>();

  return (
    <form className="flex flex-col space-y-2">
      <div className="grid sm:grid-cols-2 gap-2">
        <InputField label="Họ và tên" />
        <InputField label="Số điện thoại" />
      </div>
      <button
        className="block rounded-lg px-2.5 w-full text-sm text-start border-2 appearance-none focus:outline-none focus:ring-0 py-2.5 bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onClick={() => setToggle(true)}
      >
        {address
          ? address?.map((item) => item.name).join(", ")
          : "Chọn địa chỉ"}
      </button>
      <SelectAddress
        toggle={toggle}
        onClose={setToggle}
        setAddress={setAddress}
      />

      <InputField label="Địa chỉ cụ thể" />
      <InputField label="Ghi chú" />
      <div className="grid sm:grid-cols-2 gap-2">
        <Button>Xác nhận</Button>
        <Button>Hủy</Button>
      </div>
    </form>
  );
}
