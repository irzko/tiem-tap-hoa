import { useMemo, useState } from "react";
import PaymentCardAddForm from "./payment-card-add-form";
import SelectPaymentMethod from "./select-payment-method";

export default function PaymentMethodModal({
  setPaymentMethod,
  // paymentMethods,
  onClose,
}: {
  setPaymentMethod: (paymentMethod: string) => void;
  // paymentMethods: IPaymentMethod[];
  onClose: () => void;
}) {
  const [indexPage, setIndexPage] = useState(0);

  // const paymentCard = useMemo(
  //   () =>
  //     paymentMethods?.find(
  //       (paymentMethod) => paymentMethod.paymentType === "PAYMENT_CARD"
  //     ),
  //   [paymentMethods]
  // );

  const page = useMemo(() => {
    return [
      <SelectPaymentMethod
        key={0}
        setPaymentMethod={setPaymentMethod}
        onClose={onClose}
        setIndex={setIndexPage}
        // data={paymentCard}
      />,
      <PaymentCardAddForm
        key={1}
        onClose={onClose}
        onBack={setIndexPage}
        // data={paymentCard}
      />,
    ];
  }, [onClose, setPaymentMethod]);

  return <>{page[indexPage]}</>;
}