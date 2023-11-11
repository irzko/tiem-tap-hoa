"use client";

import { addSupplier } from "@/lib/actions";
import {
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useFormState, useFormStatus } from "react-dom";

const initialState = {
  type: null,
  message: null,
};

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button color="primary" type="submit" isLoading={pending}>
      Lưu
    </Button>
  );
}

export default function CreateProductImportForm() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [state, formAction] = useFormState(addSupplier, initialState);
  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Thêm nhà cung cấp
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              {state.type === "success" && onClose()}
              <form className="flex flex-col gap-4" action={formAction}>
                <ModalHeader className="flex flex-col gap-1">
                  Thêm nhà cung cấp
                </ModalHeader>
                <ModalBody>
                  <Input
                    label="Tên nhà cung cấp"
                    name="supplierName"
                    id="supplierName"
                  />
                  <div className="flex gap-2">
                    <Input
                      label="Số điện thoại"
                      name="phoneNumber"
                      id="phoneNumber"
                    />
                    <Input label="Email" name="email" id="email" />
                  </div>
                  <Input label="Địa chỉ" id="address" name="address" />
                  <Input
                    label="Thông tin liên hệ khác"
                    id="otherInfo"
                    name="otherInfo"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <SubmitButton />
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
