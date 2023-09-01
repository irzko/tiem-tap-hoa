"use client";
import { CategoryGroup } from "@/lib/types";
import { useEffect, useState } from "react";

const CategoryGroup = ({ categoryGroup }: { categoryGroup: CategoryGroup }) => {
  return (
    <div className="flex items-center mb-4">
      <input
        id={categoryGroup.id}
        type="radio"
        value={categoryGroup.id}
        name="categoryGroup"
        className="hidden peer"
      ></input>
      <label
        htmlFor={categoryGroup.id}
        className="text-sm font-medium peer-checked:text-blue-600 text-gray-900 dark:text-gray-300"
      >
        {categoryGroup.name}
      </label>
    </div>
  );
};

const Page = () => {
  const [showFormAddGroup, setShowFormAddGroup] = useState(false);
  const [categoryGroups, setCategoryGroups] = useState<CategoryGroup[]>([]);
  useEffect(() => {
    fetch("/api/category-group")
      .then((res) => res.json())
      .then((data) => {
        setCategoryGroups(data);
      });
  }, []);

  const handleClick = () => {
    setShowFormAddGroup(!showFormAddGroup);
    const releventDiv = document.getElementById("add-category-group");
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="z-10 w-full sm:max-w-3xl bg-gray-50 dark:bg-gray-700">
        {/* <div className="flex flex-col items-center justify-center space-y-3 border-b border-b-gray-200 dark:border-b-gray-600 px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Chỉnh sửa ngành hàng
          </h3>
        </div> */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <div className="flex justify-between bg-white dark:bg-gray-800">
              <h3>Chọn nhóm</h3>
              <button
                onClick={() => {
                  setShowFormAddGroup(!showFormAddGroup);
                  document.querySelector(
                    "#add-category-group"
                  )?.scrollIntoView();
                }}
              >
                +
              </button>
            </div>
          </div>
          <div className="flex justify-between bg-white dark:bg-gray-800">
            <h3>Chọn nhóm</h3>
            <button onClick={() => setShowFormAddGroup(!showFormAddGroup)}>
              +
            </button>
          </div>
          <div className="h-96 px-3 pb-4 overflow-auto">
            {categoryGroups.map((categoryGroup) => (
              <CategoryGroup
                key={categoryGroup.id}
                categoryGroup={categoryGroup}
              />
            ))}
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
              className={`${showFormAddGroup ? "block" : "hidden"}`}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
