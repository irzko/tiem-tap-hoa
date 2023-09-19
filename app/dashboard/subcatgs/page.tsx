"use client";
import CategoryActionModal from "@/components/category-action-modal";
import { useEffect, useState } from "react";
import useSWR, { Fetcher } from "swr";
import AddSubcategoryModal from "@/components/add-subcategory-modal";

const subcategoriesFetcher: Fetcher<ISubcategory[], string> = (url) =>
  fetch(url).then((res) => res.json());



export default function Page() {
  const apiUrl = "/api/subcatgs"
  const { data } = useSWR(apiUrl, subcategoriesFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showCategoryActionModal, setShowCategoryActionModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ISubcategory>();
  const [subcategories, setsubcategories] = useState<ISubcategory[]>();
  useEffect(() => {
    setsubcategories(data as ISubcategory[]);
  }, [data]);

  return (
    <>
      {subcategories && (
        <div>
          <ul className="font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white">
            {/* <TableHeader
              data={data}
              toggle={showAddCategoryModal}
              setToggle={setShowAddCategoryModal}
              setData={setsubcategories}
            /> */}
            {subcategories?.map((subcategory) => (
              <li
                key={subcategory.subcategory_id}
                className="flex w-full items-center border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
              >
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory(subcategory);
                    setShowCategoryActionModal(true);
                  }}
                  className="w-full flex justify-between items-center px-4 py-3.5 font-medium text-left border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
                >
                  <span>
                    {subcategory.subcategory_name}
                    {/* <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                      {subcategory._count.Subsubcategories}
                    </span> */}
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
          <AddSubcategoryModal
            toggle={showAddCategoryModal}
            apiUrl={apiUrl}
            setToggle={setShowAddCategoryModal}
          />
          {/* <CategoryActionModal
            apiUrl={apiUrl}
            showModal={showCategoryActionModal}
            setShowModal={setShowCategoryActionModal}
            category={selectedCategory}
          /> */}
        </div>
      )}
    </>
  );
}
