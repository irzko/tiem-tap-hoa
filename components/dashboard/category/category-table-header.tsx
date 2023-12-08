import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import AddCategoryModal from "./add-category-modal";
import { Card, CardBody, Input } from "@nextui-org/react";
import { toLowerCaseNonAccentVietnamese } from "@/lib/nonAccentVietnamese";

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
        return toLowerCaseNonAccentVietnamese(item.categoryName).includes(
          toLowerCaseNonAccentVietnamese(inputValue)
        );
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
              type="text"
              id="category-search"
              labelPlacement="outside"
              placeholder="Tìm kiếm danh mục"
              onChange={onChange}
              startContent={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              }
              required
            />
            <AddCategoryModal />
          </div>``
        </CardBody>
      </Card>
    </div>
  );
}
