import { Dispatch, SetStateAction, useContext } from "react";
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
import { deleteCategory } from "@/lib/actions";

const initialState = {
  type: null,
  message: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" color="danger" isLoading={pending}>
      Xác nhận xóa
    </Button>
  );
}

export default function DeleteCategoryModal({
  category,
}: {
  category?: ICategory;
}) {
  const [state, formAction] = useFormState(deleteCategory, initialState);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // const handleDelete = () => {
  //   fetch("/api/catgs", {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       categoryId: category?.categoryId,
  //     }),
  //   }).then((res) => {
  //     if (res.ok) {
  //       setShowModal(false);
  //       mutate("/api/catgs");
  //     }
  //   });
  // };

  return (
    <>
      <Button
        startContent={
          <svg
            className="w-3.5 h-3.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"
            />
          </svg>
        }
        color="danger"
        onPress={onOpen}
      >
        Xóa danh mục
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              {state.type === "success" && onClose()}
              <form action={() => formAction(category?.categoryId!)}>
                <ModalHeader className="flex flex-col gap-1">
                  Xác nhận xoá danh mục
                </ModalHeader>
                <ModalBody>
                  <p>Bạn có chắc chắn muốn xóa danh mục này?</p>
                  <p>{category?.categoryName}</p>
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
