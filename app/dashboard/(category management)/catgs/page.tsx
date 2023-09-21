"use client";
import CategoryActionModal from "@/components/category-action-modal";
import TableHeader from "@/components/table-header";
import CategoryContext from "@/context/CategoryContext";
import React, { useCallback, useMemo } from "react";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const [showCategoryActionModal, setShowCategoryActionModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    ICategory | undefined
  >();
  const [categories, setCategories] = useState<ICategory[] | undefined>();
  const apiUrl = "/api/catgs";
  const ref = useRef<ICategory[]>();

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(apiUrl);
      const data = await res.json();
      setCategories(data);
      ref.current = data;
    };
    fetchCategories();
  }, []);

  const mutate = useCallback((apiUrl: string) => {
    fetch(apiUrl).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setCategories(data);
          ref.current = data;
        });
      }
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      categories,
      mutate,
    }),
    [mutate, categories]
  );

  const handleCategoryClick = (category: ICategory) => {
    setSelectedCategory(category);
    setShowCategoryActionModal(true);
  };

  return (
    <>
      {categories && (
        <CategoryContext.Provider value={contextValue}>
          <div>
            <ul className="font-medium text-gray-900 bg-white border border-gray-200 last:rounded-lg rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white">
              <TableHeader
                keyName="category_name"
                apiUrl={apiUrl}
                keyId="category_id"
                data={ref.current}
                setData={setCategories}
              />
              {categories?.map((category) => (
                <li
                  key={category.category_id}
                  className="flex w-full items-center  border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
                >
                  <button
                    id={category.category_id}
                    type="button"
                    onClick={() => handleCategoryClick(category)}
                    className="w-full flex justify-between border-b items-center px-4 py-3.5 font-medium text-left border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
                  >
                    <span>
                      {category.category_name}
                      <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                        {category._count.Subcategories}
                      </span>
                    </span>
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
                  </button>
                </li>
              ))}
            </ul>
            <CategoryActionModal
              childPath="/dashboard/subcatgs?catgId="
              keyId="category_id"
              keyName="category_name"
              apiUrl={apiUrl}
              showModal={showCategoryActionModal}
              setShowModal={setShowCategoryActionModal}
              category={selectedCategory}
            />
          </div>
        </CategoryContext.Provider>
      )}
    </>
  );
}
