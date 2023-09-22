"use client";
import AddCategoryModal from "@/components/add-category-modal";
import CategoryActionModal from "@/components/category-action-modal";
import TableHeader from "@/components/table-header";
import { useSearchParams } from "next/navigation";
import {  useState } from "react";
import useSWR, { Fetcher } from "swr";


const subcategoriesFetcher: Fetcher<ISubsubcategory[], string> = (url) =>
  fetch(url).then((res) => res.json());

export default function Page({ params }: { params: { subcatgId: string } }) {
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showCategoryActionModal, setShowCategoryActionModal] = useState(false);
  const [selectedSubsubcategory, setSelectedSubsubcategory] =
    useState<ISubsubcategory>();
  const [subSubcategories, setSubSubcategories] = useState<
    ISubsubcategory[] | undefined
  >();
  const searchParams = useSearchParams();
  const subcatgId = searchParams.get("subcatgId");

  const apiUrl = subcatgId ? `/api/subcatgs/${subcatgId}/sub-subcatgs` : "/api/sub-subcatgs";

  const subSubcategoriesFetcher: Fetcher<ISubsubcategory[], string> = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setSubSubcategories(data);
    return data;
  };

  const { data } = useSWR(apiUrl, subSubcategoriesFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });


  return (
    <div className="font-medium text-gray-900 bg-white  border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white">
      <TableHeader
        keyName="subsubcategory_name"
        data={data}
        setData={setSubSubcategories}
        toggle={showAddCategoryModal}
        setToggle={setShowAddCategoryModal}
      />
      <ul className="divide-y dark:divide-gray-700 divide-gray-200">
        {subSubcategories?.map((subsubcategory) => (
          <li
            key={subsubcategory.subcategory_id}
            className="flex w-full items-center border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
          >
            <button
              type="button"
              onClick={() => {
                setSelectedSubsubcategory(subsubcategory);
                setShowCategoryActionModal(true);
              }}
              className="w-full flex justify-between items-center px-4 py-3.5 font-medium text-left border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
            >
              <span>
                {subsubcategory.subsubcategory_name}
                {/* <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                      {subsubcategory._count.Subsubcategories}
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

      <AddCategoryModal
        keyId="subsubcategory_id"
        keyName="subsubcategory_name"
        toggle={showAddCategoryModal}
        apiUrl={apiUrl}
        setToggle={setShowAddCategoryModal}
      />
      <CategoryActionModal
        keyId="subsubcategory_id"
        keyName="subsubcategory_name"
        apiUrl={apiUrl}
        showModal={showCategoryActionModal}
        setShowModal={setShowCategoryActionModal}
        category={selectedSubsubcategory}
      />
    </div>
  );
}
