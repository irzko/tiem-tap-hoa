import { updateCategory } from "@/lib/actions";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { useFormState, useFormStatus } from "react-dom";

const initialState = {
  type: null,
  message: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" color="primary" isLoading={pending}>
      Lưu
    </Button>
  );
}

export default function RenameModal({ category }: { category?: ICategory }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [state, formAction] = useFormState(updateCategory, initialState);

  return (
    <>
      <Button
        onPress={onOpen}
        startContent={
          <svg
            className="w-3.5 h-3.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 21 21"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7.418 17.861 1 20l2.139-6.418m4.279 4.279 10.7-10.7a3.027 3.027 0 0 0-2.14-5.165c-.802 0-1.571.319-2.139.886l-10.7 10.7m4.279 4.279-4.279-4.279m2.139 2.14 7.844-7.844m-1.426-2.853 4.279 4.279"
            />
          </svg>
        }
      >
        Đổi tên danh mục
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              {state?.type === "success" && onClose()}
              <form
                action={(formData) => {
                  formData.append("categoryId", category?.categoryId!);
                  formAction(formData);
                }}
              >
                <p>{state?.message}</p>
                <ModalHeader className="flex flex-col gap-1">
                  Đổi tên danh mục
                </ModalHeader>
                <ModalBody>
                  <Input
                    id="categoryName"
                    name="categoryName"
                    label="Tên danh mục"
                    defaultValue={category?.categoryName}
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
