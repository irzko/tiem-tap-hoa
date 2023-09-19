import InputField from "@/components/common/input-field";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { mutate } from "swr";

export default function RenameCategoryModal({
  showModal,
  setShowModal,
  category,
  apiUrl,
}: {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  category?: ICategory;
  apiUrl: string;
}) {
  const [categoryName, setCategoryName] = useState<string>();
  useEffect(() => {
    setCategoryName(category?.category_name);
  }, [category]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category_id: category?.category_id,
        category_name: e.currentTarget.category_name.value,
      }),
    }).then((res) => {
      if (res.ok) {
        setShowModal(false);
        mutate(apiUrl);
      }
    });
  };
  return (
    <div
      id="defaultModal"
      tabIndex={-1}
      aria-hidden="true"
      className={`overflow-y-auto bg-gray-900/80 overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal h-full ${
        showModal ? "flex" : "hidden"
      }`}
    >
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Đổi tên danh mục
            </h3>
            <button
              onClick={() => setShowModal(false)}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="defaultModal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-4 space-y-4">
              <InputField
                id="category_name"
                name="category_name"
                label="Tên danh mục"
                onChange={(e) => setCategoryName(e.target.value)}
                value={categoryName}
                required
              />

              <button
                type="submit"
                className="text-white flex items-center justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Đổi tên
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
