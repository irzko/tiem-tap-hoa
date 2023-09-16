import InputField from "@/components/layouts/input-field";
import CategorySelect from "./components/category-select";

export default function Page() {
  return (
    <form>
      <h2 className="text-gray-900 dark:text-white">Thông tin cơ bản</h2>
      <div className="mb-6 grid md:grid-cols-6 md:gap-6">
        <label
          htmlFor="product-name"
          className="mb-2 col-span-1 text-sm  flex items-center md:justify-end font-medium text-gray-900 dark:text-white"
        >
          Tên sản phẩm
        </label>
        <div className="col-span-5">
          <InputField
            type="text"
            id="product-name"
            placeholder="Nhập vào"
            required
          ></InputField>
        </div>
      </div>
      <div>
        <CategorySelect />
      </div>

      <div className="flex items-start mb-6">
        <div className="flex items-center h-5">
          <input
            id="remember"
            type="checkbox"
            value=""
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
            required
          ></input>
        </div>
        <label
          htmlFor="remember"
          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          I agree with the{" "}
          <a
            href="#"
            className="text-blue-600 hover:underline dark:text-blue-500"
          >
            terms and conditions
          </a>
          .
        </label>
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
}
