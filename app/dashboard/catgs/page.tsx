"use client";
import AddCategoryModal from "@/components/add-category-modal";
import TableHeader from "@/components/layouts/table-header";
import Link from "next/link";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import useSWR, { Fetcher } from "swr";

const categoriesFetcher: Fetcher<ICategory[], string> = (url) =>
  fetch(url).then((res) => res.json());

export default function Page() {
  const { data: categories } = useSWR("/api/catgs", categoriesFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const [toggleAddCategoryModal, setToggleAddCategoryModal] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedCategories([...selectedCategories, e.target.name]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== e.target.name)
      );
    }
  }
  console.log(selectedCategories);
  

  return (
    <div>
      <TableHeader
        toggle={toggleAddCategoryModal}
        setToggle={setToggleAddCategoryModal}
      />
      <form>
        <ul className="font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white">
          {categories?.map((category) => (
            <li
              key={category.category_id}
              className="flex w-full capitalize pl-4 items-center border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
            >
              <input
                id={`${category.category_id}`}
                name={`${category.category_id}`}
                type="checkbox"
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              ></input>

              <Link
                className="w-full py-3.5 ml-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                href={`/dashboard/catgs/${category.category_id}`}
              >
                <span>{category.category_name.toLowerCase()}</span>
              </Link>
            </li>
          ))}
        </ul>
      </form>
      <AddCategoryModal
        toggle={toggleAddCategoryModal}
        setToggle={setToggleAddCategoryModal}
      />
    </div>
  );
}
