import InputField from "@/components/common/input-field";
import CategoryContext from "@/context/CategoryContext";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import Select from "./common/select";

export default function AddModal<
  T,
  KId extends keyof T,
  KName extends keyof T,
  K
>({
  keyName,
  parentKeyId,
  parentKeyName,
  toggle,
  setToggle,
  parentData,
}: {
  parentKeyId?: KId;
  parentKeyName?: KName;
  keyName: K;
  toggle: boolean;
  parentData?: T[];
  setToggle: Dispatch<SetStateAction<boolean>>;
}) {
  const [name, setName] = useState("");

  const { mutate, parentId, getApiUrl, postApiUrl } =
    useContext(CategoryContext);
  const [selectedParentId, setSelectedParentId] = useState<string>(parentId);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = parentData
      ? {
          [parentKeyId as string]: selectedParentId,
          [keyName as string]: name,
        }
      : { [keyName as string]: name };
    console.log(payload);

    fetch(postApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((res) => {
      if (res.ok) {
        mutate(getApiUrl);
        setName("");
        setToggle(false);
      }
    });
  };
  return (
    <div
      id="defaultModal"
      tabIndex={-1}
      aria-hidden="true"
      className={`overflow-y-auto bg-gray-900/80 overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal h-full ${
        toggle ? "flex" : "hidden"
      }`}
    >
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Thêm danh mục
            </h3>
            <button
              onClick={() => setToggle(!toggle)}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="defaultModal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-4 space-y-4">
              {parentData && (
                <Select
                  value={selectedParentId}
                  onChange={(e) => {
                    setSelectedParentId(e.target.value);
                  }}
                  name="parentId"
                >
                  <option value="" disabled>
                    Chọn ngành hàng
                  </option>
                  {parentData.map((item) => (
                    <option
                      key={item[parentKeyId as KId] as string}
                      value={item[parentKeyId as KId] as string}
                    >
                      {item[parentKeyName as KName] as string}
                    </option>
                  ))}
                </Select>
              )}
              <InputField
                id="add-input"
                name={parentKeyName as string}
                label="Tên danh mục"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
                required
              />

              <button
                type="submit"
                className="text-white flex items-center justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="mr-1 -ml-1 w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Thêm danh mục mới
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
