import vietnameseToAscii from "@/libs/vietnameseToAscii";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import AddCategoryModal from "./add-category-modal";
import { Button } from "@nextui-org/react";

export default function CategoryTableHeader({
  data,
  setData,
}: {
  data?: ICategory[];
  parentPath?: string;
  setData: Dispatch<SetStateAction<ICategory[] | undefined>>;
}) {
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
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
    <div>
      <div className="relative bg-white border dark:bg-gray-800 border-gray-200 dark:border-gray-600 rounded-t-lg">
        <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
          <div className="w-full md:w-1/2">
            <form className="flex items-center">
              <label htmlFor="simple-search" className="sr-only">
                Tìm kiếm danh mục
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
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
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Tìm kiếm danh mục"
                  onChange={onChange}
                  required
                />
              </div>
            </form>
          </div>
          <div className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
            <Button type="button" onClick={() => setShowAddCategoryModal(true)}>
              <svg
                className="w-3.5 h-3.5 mr-2"
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
              Thêm danh mục
            </Button>
          </div>
        </div>
      </div>
      <AddCategoryModal
        toggle={showAddCategoryModal}
        setToggle={setShowAddCategoryModal}
      />
    </div>
  );
}
