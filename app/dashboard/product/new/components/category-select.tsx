"use client";
import Select from "@/components/common/select";
import { useState } from "react";
import useSWR, { Fetcher } from "swr";

const categoriesFetcher: Fetcher<ISubSubcategory[], string> = (url) =>
  fetch(url).then((res) => res.json());

const CategorySelect = () => {
  const [selectedCategories, setSelectedCategories] = useState<string>("");
  const [subcategories, setSubcategories] = useState<ISubSubcategory[]>([]);

  const { data: categories } = useSWR("/api/catgs", categoriesFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  //
  const onCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCategories(value);
    fetch(`/api/catgs/${value}/subcatgs`)
      .then((res) => res.json())
      .then((data) => {
        setSubcategories(data);
      });
  };

  return (
    <div>
      <div className="grid md:grid-cols-6 md:gap-6 mb-6">
        <label
          htmlFor="category"
          className="mb-2 text-sm flex items-center md:justify-end font-medium col-span-1 text-gray-900 dark:text-white"
        >
          Nhóm ngành
        </label>
        <Select
          defaultValue=""
          onChange={onCategoryChange}
          id="category"
          required
        >
          <option disabled value="">
            Chọn nhóm ngành
          </option>
          {categories?.map((category) => (
            <option key={category.category_id} value={category.category_id}>
              {category.category_name}
            </option>
          ))}
        </Select>
      </div>

      <div
        className={`grid md:grid-cols-6 md:gap-6 ${
          selectedCategories ? "block" : "hidden"
        }`}
      >
        <label
          htmlFor="subcategory"
          className="mb-2 flex items-center md:justify-end text-sm font-medium text-gray-900 dark:text-white"
        >
          Ngành hàng
        </label>
        <select
          // {...(selectedCategories === "" && { disabled: true })}
          id="subcategory"
          className="bg-gray-50 col-span-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        >
          <option hidden></option>
          {subcategories.map((subcategory) => (
            <option
              key={subcategory.category_id}
              value={subcategory.category_id}
            >
              {subcategory.subcategory_name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CategorySelect;
