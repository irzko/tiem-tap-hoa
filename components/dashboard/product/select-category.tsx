"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Button from "../../ui/button";

export default function SelectCategory({
  toggle,
  setToggle,
  setCatg,
}: {
  toggle: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
  setCatg: Dispatch<SetStateAction<ICategory | undefined>>;
}) {
  const [selectedCategories, setSelectedCategories] = useState<ICategory>();
  const [categories, setCategories] = useState<ICategory[] | undefined>();
  const [breadCrumb, setBreadCrumb] = useState<ICategory[]>([]);

  useEffect(() => {
    fetch("/api/catgs")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);

  const handleCategoryChange = (category: ICategory) => {
    if (category._count.subCategories !== 0) {
      setSelectedCategories(category);
      setCategories([]);
      fetch(`/api/catgs/${category.categoryId}`)
        .then((res) => res.json())
        .then((data) => {
          setBreadCrumb([...breadCrumb, category]);
          setCategories(data);
        });
    } else {
      setSelectedCategories(category);
      setBreadCrumb((prev) => [...prev, category]);
    }
  };

  const handleClick = () => {
    setCatg(selectedCategories);
    setToggle(false);
  };

  return (
    <div
      tabIndex={-1}
      aria-hidden="true"
      className={`overflow-y-auto bg-gray-900/80 overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal h-full ${
        toggle ? "flex" : "hidden"
      }`}
    >
      <div className="relative p-4 w-full max-w-xl h-full md:h-auto">
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <div className="flex justify-between items-center pb-4 rounded-t border-b mb-2 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Chọn danh mục
            </h3>
            <button
              onClick={() => setToggle(false)}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="updateProductModal"
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
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              {breadCrumb?.map((category) => (
                <li key={category.categoryId}>
                  <div className="flex items-center">
                    <svg
                      className="w-3 h-3 text-gray-400 mx-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                    <a
                      href="#"
                      className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                    >
                      {category.categoryName}
                    </a>
                  </div>
                </li>
              ))}
            </ol>
          </nav>
          <div className="overflow-y-auto h-96 pr-4">
            <ul className="flex flex-col w-full gap-2">
              {categories?.map((category) => (
                <li key={category.categoryId}>
                  <input
                    onChange={() => handleCategoryChange(category)}
                    type="radio"
                    id={category.categoryId}
                    name="category"
                    value={selectedCategories?.categoryId}
                    className="hidden peer"
                    required
                  />
                  <label
                    htmlFor={category.categoryId}
                    className="inline-flex  items-center justify-between w-full p-2.5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <div className="block">
                      <div className="w-full">{category.categoryName}</div>
                    </div>
                    <svg
                      className="w-3.5 h-3.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 8 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
                      />
                    </svg>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-end items-center pt-4 dark:border-gray-600">
            <Button type="button" onClick={handleClick}>
              Xác nhận
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
``;
