import { Card, CardBody, CardHeader } from "@nextui-org/react";
import AddSupplierForm from "./add-supplier";

// const supplierFetcher: Fetcher<ISupplier[], string> = async (url) => {
//   const res = await fetch(url);
//   const data = await res.json();
//   return data;
// };

// const ActionModal = ({
//   supplier,
//   onClose,
// }: {
//   supplier: ISupplier;
//   onClose: () => void;
// }) => {
//   const [currentModal, setCurrentModal] = useState(0);

//   const handleDelete = (supplierId: string) => {
//     fetch(`/api/suppliers/${supplierId}`, {
//       method: "DELETE",
//     }).then((res) => {
//       if (res.status === 200) {
//         toast.success("Xóa nhà cung cấp thành công");
//         mutate(`/api/suppliers`);
//         onClose();
//       }
//     });
//   };

//   const handleSubmit = (e: FormEvent<HTMLFormElement>, onClose: () => void) => {
//     e.preventDefault();
//     fetch(`/api/suppliers`, {
//       method: "PUT",
//       body: JSON.stringify({
//         supplierId: supplier.supplierId,
//         supplierName: e.currentTarget.supplierName.value,
//         email: e.currentTarget.email.value,
//         phoneNumber: e.currentTarget.phoneNumber.value,
//         address: e.currentTarget.address.value,
//         otherInfo: e.currentTarget.otherInfo.value,
//       }),
//     }).then((res) => {
//       if (res.status === 201) {
//         toast.success("Cập nhật nhà cung cấp thành công");
//         mutate(`/api/suppliers`);
//         onClose();
//       } else {
//         toast.error("Cập nhật nhà cung cấp thất bại");
//       }
//     });
//   };

//   const modalContent = [
//     <>
//       <ModalHeader title="Tùy chọn" onClose={onClose} />
//       <div className="space-y-2 flex flex-col">
//         <Button color="light" onClick={() => setCurrentModal(2)}>
//           Cập nhật thông tin
//         </Button>
//         <Button color="failure" onClick={() => setCurrentModal(1)}>
//           Xóa
//         </Button>
//       </div>
//     </>,
//     <>
//       <ModalHeader
//         onBack={() => setCurrentModal(0)}
//         title="Xác nhận xóa"
//         onClose={onClose}
//       />

//       <div className="p-4">
//         <p>Bạn có chắc chắn muốn xóa nhà cung cấp này?</p>
//         <div className="flex justify-end gap-2">
//           <Button color="light" onClick={() => setCurrentModal(0)}>
//             Hủy
//           </Button>
//           <Button
//             color="failure"
//             onClick={() => handleDelete(supplier.supplierId)}
//           >
//             Xóa
//           </Button>
//         </div>
//       </div>
//     </>,
//     <>
//       <div>
//         <ModalHeader
//           onBack={() => setCurrentModal(0)}
//           title="Cập nhật nhà cung cấp"
//           onClose={onClose}
//         />
//         <form
//           onSubmit={(e) => handleSubmit(e, onClose)}
//           className="flex flex-col gap-4"
//         >
//           <Input
//             label="Tên nhà cung cấp"
//             name="supplierName"
//             id="supplierName"
//             defaultValue={supplier.supplierName}
//           />
//           <div className="flex gap-2">
//             <Input
//               label="Số điện thoại"
//               name="phoneNumber"
//               id="phoneNumber"
//               defaultValue={supplier.phoneNumber}
//             />
//             <Input
//               label="Email"
//               name="email"
//               id="email"
//               defaultValue={supplier.email}
//             />
//           </div>
//           <Input
//             label="Địa chỉ"
//             id="address"
//             name="address"
//             defaultValue={supplier.address}
//           />
//           <Input
//             label="Thông tin liên hệ khác"
//             id="otherInfo"
//             name="otherInfo"
//             defaultValue={supplier.otherInfo}
//           />
//           <Button>Lưu</Button>
//         </form>
//       </div>
//     </>,
//   ];

//   return <>{modalContent[currentModal]}</>;
// };

const getData = async (): Promise<ISupplier[]> => {
  const res = await fetch(`${process.env.API_URL}/api/suppliers`, {
    next: {
      tags: ["supplier"],
    },
  });
  const data = await res.json();
  return data;
};

export default async function Suppliers() {
  const data = await getData();
  return (
    <>
      <div className="max-w-screen-md mx-auto flex flex-col">
        <div className="mb-4 self-end">
          <AddSupplierForm />
        </div>

        <div>
          {data?.map((supplier) => {
            return (
              <Card key={supplier.supplierId}>
                <CardHeader>{supplier.supplierName}</CardHeader>
                <CardBody>
                  <div className="dark:border-gray-700 px-4 py-3">
                    <div className="flex justify-between items-center">
                      {/* <IconButton
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
                  </IconButton> */}
                    </div>
                    <p>Địa chỉ: {supplier.address}</p>
                    <p>Số điện thoại: {supplier.phoneNumber}</p>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
}
