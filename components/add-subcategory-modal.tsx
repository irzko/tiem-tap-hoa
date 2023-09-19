import InputField from "@/components/common/input-field";
import { Dispatch, SetStateAction, useState } from "react";
import useSWR, { Fetcher, mutate } from "swr";
import Button from "./common/button";

const categoriesFetcher: Fetcher<ICategory[], string> = (url) =>
  fetch(url).then((res) => res.json());
const DropdownCategories = () => {
  const { data: categories } = useSWR("/api/catgs", categoriesFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return (
    <div>
      <select
        defaultValue=""
        id="subcategory_id"
        name="subcategory_id"
        required
        className="bg-gray-50 border-2 col-span-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 outline-none focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option disabled value="">
          Chọn nhóm ngành
        </option>
        {categories?.map((category) => (
          <option key={category.category_id} value={category.category_id}>
            {category.category_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default function AddSubcategoryModal({
  toggle,
  setToggle,
  apiUrl,
}: {
  toggle: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
  apiUrl: string;
}) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subcategory_name: e.currentTarget.subcategory_name.value,
        category_id: e.currentTarget.subcategory_id.value,
      }),
    }).then((res) => {
      if (res.ok) {
        setToggle(false);
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
        toggle ? "flex" : "hidden"
      }`}
    >
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Thêm danh mục
            </h3>
            <button
              onClick={() => setToggle(!toggle)}
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
              <DropdownCategories />
              <InputField
                id="subcategory_name"
                name="subcategory_name"
                label="Tên danh mục"
                required
              />
              <Button type="submit">
                <svg
                  className="mr-1 -ml-1 w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Thêm danh mục mới
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
