import { useMemo, useState } from "react";
import PaymentCardAddForm from "./payment-card-add-form";
import SelectPaymentMethod from "./select-payment-method";

export default function PaymentMethodModal({
  setPaymentMethod,
}: {
  setPaymentMethod: (paymentMethod: string) => void;
}) {
  const [step, setStep] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const paymentMethod = useMemo(
    () => ({
      PAYMENT_CARD: "Thẻ",
      PAYMENT_BANK: "Chuyển khoản ngân hàng",
    }),
    []
  );
  return (
    <div className="max-w-lg">
      {step === 0 ? (
        <SelectPaymentMethod
          paymentMethod={paymentMethod}
          setStep={setStep}
          setSelectedPaymentMethod={setSelectedPaymentMethod}
        />
      ) : (
        <PaymentCardAddForm
          setPaymentMethod={setPaymentMethod}
          selectedPaymentMethod={selectedPaymentMethod}
          paymentMethod={paymentMethod}
        />
      )}
    </div>
  );
}
