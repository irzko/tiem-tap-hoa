import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";



const SelectPaymentMethod = ({
  setPaymentMethod,
  data,
}: {
  setPaymentMethod: (paymentMethod: string) => void;
  data?: IPaymentMethod;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedMethod, setSelectedMethod] = useState<string>("");

  const handleConfirm = () => {
    setPaymentMethod(selectedMethod);
  };

  return (
    <>
      <Button onPress={onOpen}>Chọn phương thức thanh toán</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Chọn phương thức thanh toán
              </ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat
                  consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                  incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                  aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                  nisi consectetur esse laborum eiusmod pariatur proident Lorem
                  eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {/* <ModalHeader title="Chọn phương thức thanh toán" onClose={onClose} />
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

      <Button onClick={handleConfirm}>Xác nhận</Button> */}
    </>
  );
};

export default SelectPaymentMethod;
