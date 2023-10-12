import { useState } from "react";
import Button from "../ui/button";
import ModalHeader from "../ui/modal-header";
import { PaymentType } from "@prisma/client";

const SelectPaymentMethod = ({
  setIndex,
  setPaymentMethod,
  onClose,
  data,
}: {
  setPaymentMethod: (paymentMethod: PaymentType) => void;
  onClose: () => void;
  setIndex: (index: number) => void;
  data?: IPaymentMethod;
}) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentType>();

  const handleSelectPaymentMethod = (paymentMethod: PaymentType) => {
    switch (paymentMethod) {
      case "PAYMENT_CARD":
        // if (!data) {
        //   setIndex(1);
        // }
        break;
      default:
        break;
    }
    setSelectedMethod(paymentMethod);
  };

  const handleConfirm = () => {
    setPaymentMethod(selectedMethod as PaymentType);
    onClose();
  };

  return (
    <div className="w-full">
      <ModalHeader title="Chọn phương thức thanh toán" onClose={onClose} />
      <ul className="flex flex-col w-full gap-2">
        <li>
          <input
            type="radio"
            id="COD"
            name="payment"
            onChange={() => handleSelectPaymentMethod("COD")}
            className="hidden peer"
            required
          />
          <label
            htmlFor="COD"
            className="inline-flex  items-center justify-between w-full p-2.5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <div className="block">
              <div className="w-full">Thanh toán khi nhận hàng</div>
            </div>
          </label>
        </li>
        <li>
          <input
            type="radio"
            id="paypal"
            name="payment"
            onChange={() => handleSelectPaymentMethod("PAYPAL")}
            className="hidden peer"
            required
          />
          <label
            htmlFor="paypal"
            className="inline-flex  items-center justify-between w-full p-2.5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <div className="block">
              <div className="w-full">PayPal</div>
            </div>
          </label>
        </li>
        <li>
          <input
            type="radio"
            id="payment_card"
            name="payment"
            onChange={() => handleSelectPaymentMethod("PAYMENT_CARD")}
            className="hidden peer"
            required
          />
          <label
            htmlFor="payment_card"
            className="inline-flex  items-center justify-between w-full p-2.5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <div className="block">
              <div className="w-full">Thẻ ngân hàng</div>
            </div>
          </label>
        </li>
      </ul>

      <Button onClick={handleConfirm}>Xác nhận</Button>
    </div>
  );
};

export default SelectPaymentMethod;
