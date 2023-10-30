import vietnameseToAscii from "@/lib/vietnameseToAscii";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import AddCategoryModal from "./add-category-modal";
import { Card, CardBody, Input } from "@nextui-org/react";

export default function CategoryTableHeader({
  data,
  setData,
}: {
  data?: ICategory[];
  parentPath?: string;
  setData: Dispatch<SetStateAction<ICategory[]>>;
}) {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (!data) return;
    if (inputValue === "") {
      setData(data);
    } else {
      const result = data.filter((item) => {
        const string = vietnameseToAscii(item.categoryName);
        const stringNotSigned = vietnameseToAscii(inputValue);
        return string.includes(stringNotSigned);
      });
      setData(result);
    }
  };

  return (
    <div className="mb-4">
      <Card>
        <CardBody>
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              startContent={
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              type="text"
              id="category-search"
              placeholder="Tìm kiếm danh mục"
              onChange={onChange}
              required
            />
            <AddCategoryModal />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
