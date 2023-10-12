"use client";
import { FormEvent, useState } from "react";
import InputField from "@/components/ui/input-field";
import { SelectAddress } from "@/components/user/select-address";
import Button from "@/components/ui/button";
import useModal from "@/hooks/useModal";
import { useSession } from "next-auth/react";
import ModalHeader from "@/components/ui/modal-header";

export default function AddAddressForm() {
  const [address, setAddress] = useState<[ICity, IDistrict, IWard]>();
  const [modal, showModal] = useModal();
  const { data: session } = useSession();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetch("/api/user/address", {
      method: "POST",
      body: JSON.stringify({
        userId: session?.user?.userId,
        fullName: event.currentTarget.fullName.value,
        phoneNumber: event.currentTarget.phoneNumber.value,
        streetAddress: event.currentTarget.streetAddress.value,
        cityId: address?.[0].cityId,
        districtId: address?.[1].districtId,
        wardId: address?.[2].wardId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        showModal((onClose) => (
          <div>
            <ModalHeader title="Thông báo" onClose={onClose} />
            <p>Thêm địa chỉ thành công</p>
            <button onClick={onClose}>Close</button>
          </div>
        ));
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-4 max-w-xl mx-auto"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <InputField id="fullName" label="Họ và tên" />
        <InputField id="phoneNumber" label="Số điện thoại" />
      </div>
      <button
        type="button"
        className="block rounded-lg px-2.5 w-full text-sm text-start border-2 appearance-none focus:outline-none focus:ring-0 py-2.5 bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onClick={() =>
          showModal((onClose) => {
            return <SelectAddress onClose={onClose} setAddress={setAddress} />;
          })
        }
      >
        {address
          ? address?.map((item) => item.name).join(", ")
          : "Chọn địa chỉ"}
      </button>

      <InputField id="streetAddress" label="Địa chỉ cụ thể" />
      <Button type="submit">Xác nhận</Button>
      {modal}
    </form>
  );
}
