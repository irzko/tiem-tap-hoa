import { useSession } from "next-auth/react";
import React, { Dispatch, FormEvent, SetStateAction } from "react";
import { toast } from "react-toastify";
import ModalHeader from "../ui/modal-header";
import InputField from "../ui/input-field";
import Button from "../ui/button";

export default function PaymentCardAddForm({
  onClose,
  onBack,
  data,
}: {
  onClose: () => void;
  onBack: Dispatch<SetStateAction<number>>;
  data?: IPaymentMethod;
}) {
  const { data: session } = useSession();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const accountInfo = JSON.stringify({
      cardNumber: event.currentTarget.cardNumber.value,
      expirationDate: event.currentTarget.expirationDate.value,
      cvv: event.currentTarget.cvv.value,
      cardHolderName: event.currentTarget.cardHolderName.value,
    });

    fetch("/api/user/payment-methods", {
      method: "POST",
      body: JSON.stringify({
        userId: session?.user?.userId,
        paymentType: "PAYMENT_CARD",
        accountInfo,
      }),
    }).then((res) => {
      if (res.ok) {
        toast.success("Thêm thẻ thành công");
        onClose();
      } else {
        toast.error("Thêm thẻ thất bại");
      }
    });
  };
  return (
    <div className="max-w-lg">
      <ModalHeader
        onBack={() => onBack(0)}
        title="Thêm thẻ"
        onClose={onClose}
      />
      <form
        className="grid grid-cols-6 gap-x-4 gap-y-6"
        onSubmit={handleSubmit}
      >
        <div className="col-span-full">
          <InputField id="cardNumber" label="Số thẻ" />
        </div>
        <div className="col-span-4">
          <InputField id="expirationDate" label="Ngày hết hạn" />
        </div>

        <div className="col-span-2">
          <InputField id="cvv" label="CVV" />
        </div>
        <div className="col-span-full">
          <InputField id="cardHolderName" label="Họ và tên chủ thẻ" />
        </div>
        <Button>Thêm</Button>
      </form>
    </div>
  );
}
