"use client";
import Button from "@/components/ui/button";
import IconButton from "@/components/ui/icon-button";
import InputField from "@/components/ui/input-field";
import ModalHeader from "@/components/ui/modal-header";
import useModal from "@/hooks/useModal";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import useSWR, { Fetcher, mutate } from "swr";
import Select from "react-select";
import useProducts from "@/hooks/useProducts";

function AddProductImportForm({ onClose }: { onClose: () => void }) {
  const { data: suppliers } = useSWR(`/api/suppliers`, supplierFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const { products } = useProducts();

  const handleSubmit = (e: FormEvent<HTMLFormElement>, onClose: () => void) => {
    e.preventDefault();
    fetch(`/api/suppliers`, {
      method: "POST",
      body: JSON.stringify({
        supplierId: e.currentTarget.supplierId.value,
        productId: e.currentTarget.productId.value,
        quantity: e.currentTarget.quantity.value,
        price: e.currentTarget.price.value,
        status: "Đang chờ",
      }),
    }).then((res) => {
      if (res.status === 201) {
        toast.success("Thêm nhà cung cấp thành công");
        mutate(`/api/product-imports`);
        onClose();
      } else {
        toast.error("Thêm nhà cung cấp thất bại");
      }
    });
  };

  return (
    <>
      <div>
        <ModalHeader title="Tạo hóa đơn mới" onClose={onClose} />
        <form
          onSubmit={(e) => handleSubmit(e, onClose)}
          className="flex flex-col gap-4"
        >
          <Select
            name="supplierId"
            placeholder="Chọn nhà cung cấp"
            options={suppliers?.map((supplier) => ({
              label: supplier.supplierName,
              value: supplier.supplierId,
            }))}
          />

          <Select
            name="productId"
            placeholder="Chọn sản phẩm"
            options={products?.map((product) => ({
              label: product.productName,
              value: product.productId,
            }))}
          />

          <div className="flex gap-2">
            <InputField label="Số lượng" name="quantity" id="quantity" />
            <InputField label="Giá nhập hàng" name="price" id="price" />
          </div>
          <Button>Lưu</Button>
        </form>
      </div>
    </>
  );
}

const supplierFetcher: Fetcher<ISupplier[], string> = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

const ActionModal = ({
  supplier,
  onClose,
}: {
  supplier: ISupplier;
  onClose: () => void;
}) => {
  const [currentModal, setCurrentModal] = useState(0);

  const handleDelete = (supplierId: string) => {
    fetch(`/api/suppliers/${supplierId}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.status === 200) {
        toast.success("Xóa nhà cung cấp thành công");
        mutate(`/api/suppliers`);
        onClose();
      }
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>, onClose: () => void) => {
    e.preventDefault();
    fetch(`/api/suppliers`, {
      method: "PUT",
      body: JSON.stringify({
        supplierId: supplier.supplierId,
        supplierName: e.currentTarget.supplierName.value,
        email: e.currentTarget.email.value,
        phoneNumber: e.currentTarget.phoneNumber.value,
        address: e.currentTarget.address.value,
        otherInfo: e.currentTarget.otherInfo.value,
      }),
    }).then((res) => {
      if (res.status === 201) {
        toast.success("Cập nhật nhà cung cấp thành công");
        mutate(`/api/suppliers`);
        onClose();
      } else {
        toast.error("Cập nhật nhà cung cấp thất bại");
      }
    });
  };

  const modalContent = [
    <>
      <ModalHeader title="Tùy chọn" onClose={onClose} />
      <div className="space-y-2 flex flex-col">
        <Button color="light" onClick={() => setCurrentModal(2)}>
          Cập nhật thông tin
        </Button>
        <Button color="failure" onClick={() => setCurrentModal(1)}>
          Xóa
        </Button>
      </div>
    </>,
    <>
      <ModalHeader
        onBack={() => setCurrentModal(0)}
        title="Xác nhận xóa"
        onClose={onClose}
      />

      <div className="p-4">
        <p>Bạn có chắc chắn muốn xóa nhà cung cấp này?</p>
        <div className="flex justify-end gap-2">
          <Button color="light" onClick={() => setCurrentModal(0)}>
            Hủy
          </Button>
          <Button
            color="failure"
            onClick={() => handleDelete(supplier.supplierId)}
          >
            Xóa
          </Button>
        </div>
      </div>
    </>,
    <>
      <div>
        <ModalHeader
          onBack={() => setCurrentModal(0)}
          title="Cập nhật nhà cung cấp"
          onClose={onClose}
        />
        <form
          onSubmit={(e) => handleSubmit(e, onClose)}
          className="flex flex-col gap-4"
        >
          <InputField
            label="Tên nhà cung cấp"
            name="supplierName"
            id="supplierName"
            defaultValue={supplier.supplierName}
          />
          <div className="flex gap-2">
            <InputField
              label="Số điện thoại"
              name="phoneNumber"
              id="phoneNumber"
              defaultValue={supplier.phoneNumber}
            />
            <InputField
              label="Email"
              name="email"
              id="email"
              defaultValue={supplier.email}
            />
          </div>
          <InputField
            label="Địa chỉ"
            id="address"
            name="address"
            defaultValue={supplier.address}
          />
          <InputField
            label="Thông tin liên hệ khác"
            id="otherInfo"
            name="otherInfo"
            defaultValue={supplier.otherInfo}
          />
          <Button>Lưu</Button>
        </form>
      </div>
    </>,
  ];

  return <>{modalContent[currentModal]}</>;
};

export default function Page() {
  const [modal, showModal] = useModal();

  const { data } = useSWR(`/api/product-imports`, supplierFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return (
    <>
      <div className="max-w-screen-md mx-auto flex flex-col">
        <div className="mb-4  self-end">
          <Button
            onClick={() =>
              showModal((onClose) => <AddProductImportForm onClose={onClose} />)
            }
          >
            Tạo đơn mới
          </Button>
        </div>

        <div className="bg-white divide-y dark:bg-gray-800 relative shadow-md sm:rounded-lg w-full text-sm text-left text-gray-500 dark:text-gray-400">
          {data?.map((supplier) => {
            return (
              <div
                className="dark:border-gray-700 px-4 py-3"
                key={supplier.supplierId}
              >
                <div className="flex justify-between items-center">
                  <p className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {supplier.supplierName}
                  </p>

                  <IconButton
                    onClick={() =>
                      showModal((onClose) => {
                        return (
                          <>
                            <ActionModal
                              supplier={supplier}
                              onClose={onClose}
                            />
                          </>
                        );
                      })
                    }
                  >
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 3"
                    >
                      <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                    </svg>
                  </IconButton>
                </div>
                <p>Địa chỉ: {supplier.address}</p>
                <p>Số điện thoại: {supplier.phoneNumber}</p>
              </div>
            );
          })}
        </div>
      </div>
      {modal}
    </>
  );
}
