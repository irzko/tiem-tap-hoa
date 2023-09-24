"use client";
import { useState } from "react";
import InputField from "./common/input-field";
import SelectCategory from "./select-category";
import TextArea from "./textarea";

const AddProductForm = () => {
  const [selectedCategories, setSelectedCategories] =
    useState<ISubSubcategory>();
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <form>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Thêm sản phẩm mới
      </h1>
      <div className="grid md:grid-cols-6 md:gap-6">
        <label
          htmlFor="product-name"
          className="mb-2 col-span-1 text-sm  flex items-center md:justify-end font-medium text-gray-900 dark:text-white"
        >
          Tên sản phẩm
        </label>
        <div className="col-span-5 mb-4">
          <InputField
            type="text"
            id="product-name"
            placeholder="Nhập vào"
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-6 md:gap-6">
        <label
          htmlFor="product-name"
          className="mb-2 col-span-1 text-sm  flex items-center md:justify-end font-medium text-gray-900 dark:text-white"
        >
          Danh mục
        </label>
        <div className="col-span-5 mb-4">
          <InputField
            // disabled
            value={selectedCategories?.subsubcategory_name}
            onClick={() => setToggle(true)}
            type="text"
            id="category"
            placeholder="Chọn danh mục"
            required
          />
        </div>
      </div>

      <SelectCategory
        setCatg={setSelectedCategories}
        toggle={toggle}
        setToggle={setToggle}
      />

      <div className="grid md:grid-cols-6 md:gap-6">
        <label
          htmlFor="description"
          className="mb-2 col-span-1 text-sm flex md:justify-end font-medium text-gray-900 dark:text-white"
        >
          Mô tả sản phẩm
        </label>
        <div className="col-span-5 mb-4">
          <TextArea />
        </div>
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
};

export default AddProductForm;
