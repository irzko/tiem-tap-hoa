import CategoryContext from "@/context/CategoryContext";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useFormState, useFormStatus } from "react-dom";
import { createCategory } from "@/lib/actions";

const initialState = {
  type: null,
  message: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button color="primary" type="submit" isLoading={pending}>
      Thêm
    </Button>
  );
}

export default function AddCategoryModal() {
  const [state, formAction] = useFormState(createCategory, initialState);

  const { categories } = useContext(CategoryContext);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        color="primary"
        startContent={
          <svg
            className="w-3.5 h-3.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
        }
        onPress={onOpen}
      >
        Thêm danh mục
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              {state?.type === "success" && onClose()}
              <form action={formAction}>
                <ModalHeader className="flex flex-col gap-1">
                  Thêm danh mục
                </ModalHeader>
                <ModalBody className="flex flex-col mb-4 space-y-4">
                  <p>{state?.message}</p>
                  <Select
                    items={categories}
                    title="Danh mục"
                    placeholder="Chọn danh mục gốc"
                  >
                    {(category) => (
                      <SelectItem key={category.categoryId}>
                        {category.categoryName}
                      </SelectItem>
                    )}
                  </Select>
                  <Input
                    id="categoryName"
                    name="categoryName"
                    label="Tên danh mục"
                    required
                  />
                </ModalBody>
                <ModalFooter>
                  <Button variant="light" onPress={onClose}>
                    Hủy
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
