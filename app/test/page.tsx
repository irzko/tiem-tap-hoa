"use client";
import { CategoryGroup, Category } from "@/lib/types";
import { useEffect, useState } from "react";

const Page = () => {
  const [categoryGroups, setCategoryGroups] = useState<CategoryGroup[]>([]);
  const [selectedCategoryGroup, setSelectedCategoryGroup] =
    useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    fetch("/api/category-group")
      .then((res) => res.json())
      .then((data) => {
        setCategoryGroups(data);
      });
  }, []);

  const onCategoryGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCategoryGroup(value);
    fetch(`/api/category-group/${value}`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="z-10 w-full sm:max-w-3xl bg-gray-50 dark:bg-gray-700">
        <div className="grid grid-cols-2 gap-2 p-2">
          <form>
            <label
              htmlFor="category-group"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Nhóm ngành
            </label>
            <select
              defaultValue={selectedCategoryGroup}
              onChange={onCategoryGroupChange}
              id="category-group"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option hidden disabled></option>
              {categoryGroups.map((categoryGroup) => (
                <option key={categoryGroup.id} value={categoryGroup.id}>
                  {categoryGroup.name}
                </option>
              ))}
            </select>
          </form>

          <form>
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ngành hàng
            </label>
            <select
              {...(selectedCategoryGroup === "" && { disabled: true })}
              id="category"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option hidden></option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </form>
        </div>

        <div className="grid grid-cols-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetch("/api/category-group", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: e.currentTarget.name }),
              }).then((res) => {
                if (res.ok) {
                  console.log("ok");

                  window.location.reload();
                } else {
                  alert("Có lỗi xảy ra");
                }
              });
            }}
          >
            <input
              id="add-category-group"
              name="name"
              type="text"
              placeholder="Nhập tên nhóm"
              required
            ></input>
            <button>Thêm</button>
          </form>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetch("/api/category", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: e.currentTarget["category-name"].value,
                  group: selectedCategoryGroup,
                }),
              }).then((res) => {
                if (res.ok) {
                  console.log("ok");

                  window.location.reload();
                } else {
                  alert("Có lỗi xảy ra");
                }
              });
            }}
          >
            <input
              id="add-category"
              name="category-name"
              type="text"
              placeholder="Nhập tên ngành hàng"
              required
            ></input>
            <button>Thêm</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
