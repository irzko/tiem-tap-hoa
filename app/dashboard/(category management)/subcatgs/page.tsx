"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import TableHeader from "@/components/table-header";
import CategoryActionModal from "@/components/category-action-modal";
import SubcategoryContext from "@/context/SubcategoryContext";

export default function Page() {
  const [showCategoryActionModal, setShowCategoryActionModal] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState<
    ISubcategory | undefined
  >();
  const [subcategories, setSubcategories] = useState<
    ISubcategory[] | undefined
  >();
  const refSubcategories = useRef<ISubcategory[]>();
  const searchParams = useSearchParams();
  const catgId = searchParams.get("catgId");

  

  const apiUrl = catgId ? `/api/catgs/${catgId}/subcatgs` : "/api/subcatgs";
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(apiUrl);
      const data = await res.json();
      setSubcategories(data);
      refSubcategories.current = data;
    };
    fetchCategories();
  }, [apiUrl]);

  const mutate = useCallback((apiUrl: string) => {
    fetch(apiUrl).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setSubcategories(data);
          refSubcategories.current = data;
        });
      }
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      subcategories,
      mutate,
    }),
    [mutate, subcategories]
  );

  return (
    <>
      {subcategories && (
        <SubcategoryContext.Provider value={contextValue}>
          <div className="font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white">
            <TableHeader
              apiUrl={apiUrl}
              keyId="subcategory_id"
              keyName="subcategory_name"
              data={refSubcategories.current}
              setData={setSubcategories}
            />

            <ul>
              {subcategories?.map((subcategory) => (
                <li
                  key={subcategory.subcategory_id}
                  className="flex w-full items-center border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSubcategory(subcategory);
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
            <CategoryActionModal
              childPath="/dashboard/subsubcatgs?subcatgId="
              keyId="subcategory_id"
              keyName="subcategory_name"
              apiUrl={apiUrl}
              showModal={showCategoryActionModal}
              setShowModal={setShowCategoryActionModal}
              category={selectedSubcategory}
            />
          </div>
        </SubcategoryContext.Provider>
      )}
    </>
  );
}
