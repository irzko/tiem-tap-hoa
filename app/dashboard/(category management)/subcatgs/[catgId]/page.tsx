"use client";
import Button from "@/components/common/button";
import InputField from "@/components/common/input-field";
import Select from "@/components/common/select";
import vietnameseToAscii from "@/libs/vietnamese-to-ascii";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import useSWR, { Fetcher, mutate } from "swr";

function search(arr: ISubcategory[], str: string) {
  const stringNotSigned = vietnameseToAscii(str);
  const result: ISubcategory[] = [];
  for (let i = 0; i < arr.length; i++) {
    const string = vietnameseToAscii(arr[i].subcategory_name);
    if (string.includes(stringNotSigned)) {
      result.push(arr[i]);
    }
  }
  return result;
}

function TableHeader({
  toggle,
  setSubcategories,
  data,
  categoryId,
  setToggle,
}: {
  toggle: boolean;
  setSubcategories: Dispatch<SetStateAction<ISubcategory[]>>;
  filteredData?: ISubcategory[];
  categoryId?: string;
  setToggle: Dispatch<SetStateAction<boolean>>;
  data?: ISubcategory[];
}) {
  const router = useRouter();

  const { data: categories, isLoading } = useSWR(
    `/api/catgs/`,
    categoriesFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") return setSubcategories(data as ISubcategory[]);
    const result = search(data || [], e.target.value);
    setSubcategories(result);
  };

  const onCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(`/dashboard/subcatgs/${e.target.value}`);
  };

  return (
    <>
      {!isLoading && (
        <div>
          <div className="relative bg-white border-b dark:bg-gray-800 border-gray-200 dark:border-gray-600 rounded-t-lg">
            <div className="flex flex-col md:flex-row justify-end w-full  pt-4 px-4 md:w-auto">
              <Button type="button" onClick={() => setToggle(!toggle)}>
                <svg
                  className="w-3.5 h-3.5 mr-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
                Thêm danh mục
              </Button>
            </div>
            <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
              <div className="w-full grid md:grid-cols-2 gap-4">
                <form className="flex items-center">
                  <label htmlFor="simple-search" className="sr-only">
                    Tìm kiếm danh mục
                  </label>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="simple-search"
                      className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Tìm kiếm danh mục"
                      onChange={onChange}
                      required
                    />
                  </div>
                </form>
                <form className="flex items-center">
                  <Select
                    value={categoryId}
                    onChange={onCategoryChange}
                    id="category"
                    required
                  >
                    <option value="all">Tất cả</option>
                    {categories?.map((category) => {
                      return (
                        <option
                          key={category.category_id}
                          value={category.category_id}
                        >
                          {category.category_name}
                        </option>
                      );
                    })}
                  </Select>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function SubcategoryActionModal({
  showModal,
  setShowModal,
  subcategory,
  apiUrl,
}: {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  subcategory?: ISubcategory;
  apiUrl: string;
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);

  return (
    <>
      <div
        tabIndex={-1}
        aria-hidden="true"
        className={`overflow-y-auto bg-gray-900/80 overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal h-full ${
          showModal ? "flex" : "hidden"
        }`}
      >
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
          <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {subcategory?.subcategory_name}
              </h3>
              <button
                onClick={() => setShowModal(!showModal)}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
            <div className="font-medium text-gray-900 border dark:text-white dark:bg-gray-700 rounded-lg bg-white dark:border-gray-600 border-gray-200">
              <button
                onClick={() => {
                  setShowModal(false);
                  setShowRenameModal(true);
                }}
                className="relative rounded-t-lg border-b inline-flex items-center w-full px-4 py-3.5 text-sm font-medium border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
              >
                <svg
                  className="w-3.5 h-3.5 mr-2 -ml-1 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 21 21"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7.418 17.861 1 20l2.139-6.418m4.279 4.279 10.7-10.7a3.027 3.027 0 0 0-2.14-5.165c-.802 0-1.571.319-2.139.886l-10.7 10.7m4.279 4.279-4.279-4.279m2.139 2.14 7.844-7.844m-1.426-2.853 4.279 4.279"
                  />
                </svg>
                Đổi tên danh mục
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(true);
                  setShowModal(false);
                }}
                className="relative rounded-b-lg inline-flex items-center w-full px-4 py-3.5 text-sm font-medium border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
              >
                <svg
                  className="mr-2 -ml-1 w-3.5 h-3.5 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"
                  />
                </svg>
                Xoá danh mục
              </button>
            </div>
          </div>
        </div>
      </div>
      <DeleteSubcategoryModal
        apiUrl={apiUrl}
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        subcategory={subcategory}
      />
      <RenameSubcategoryModal
        apiUrl={apiUrl}
        showModal={showRenameModal}
        setShowModal={setShowRenameModal}
        subcategory={subcategory}
      />
    </>
  );
}


function AddSubcategoryModal({
  toggle,
  setToggle,
  apiUrl,
}: {
  toggle: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
  apiUrl: string;
}) {
  const { data: categories} = useSWR(
    `/api/catgs/`,
    categoriesFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subcategory_name: e.currentTarget.subcategory_name.value,
        category_id: e.currentTarget.category_id.value,
      }),
    }).then((res) => {
      if (res.ok) {
        setToggle(false);
        mutate(apiUrl);
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
              <Select
                defaultValue=""
                id="category_id"
                name="category_id"
                required
              >
                <option disabled value="">
                  Chọn nhóm ngành
                </option>
                {categories?.map((category) => (
                  <option
                    key={category.category_id}
                    value={category.category_id}
                  >
                    {category.category_name}
                  </option>
                ))}
              </Select>
              <InputField
                id="subcategory_name"
                name="subcategory_name"
                label="Tên danh mục"
                required
              />
              <Button type="submit">
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
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function DeleteSubcategoryModal({
  showModal,
  setShowModal,
  subcategory,
  apiUrl,
}: {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  subcategory?: ISubcategory;
  apiUrl: string;
}) {
  const handleDelete = () => {
    fetch(apiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subcategory_id: subcategory?.subcategory_id,
      }),
    }).then((res) => {
      if (res.ok) {
        setShowModal(false);
        mutate(apiUrl);
      }
    });
  };
  return (
    <div
      tabIndex={-1}
      aria-hidden="true"
      className={`overflow-y-auto bg-gray-900/80 overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal h-full ${
        showModal ? "flex" : "hidden"
      }`}
    >
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <button
            type="button"
            className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={() => setShowModal(false)}
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
          <h3 className="text-lg text-center font-semibold text-gray-900 dark:text-white">
            Xác nhận xoá danh mục
          </h3>
          <p className="mb-4 text-center text-gray-500 dark:text-gray-300">
            Bạn có chắc chắn muốn xóa danh mục này?
          </p>
          <div className="mb-4 font-medium text-gray-900 dark:text-white dark:bg-gray-700 rounded-lg bg-white px-4 py-3.5">
            {subcategory?.subcategory_name}
          </div>
          <div className="flex justify-center items-center space-x-4">
            <button
              onClick={() => setShowModal(false)}
              type="button"
              className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Huỷ
            </button>
            <button
              onClick={handleDelete}
              className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
            >
              Xác nhận xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RenameSubcategoryModal({
  showModal,
  setShowModal,
  subcategory,
  apiUrl,
}: {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  subcategory?: ISubcategory;
  apiUrl: string;
}) {
  const [subcategoryName, setSubcategoryName] = useState<string>("");
  useEffect(() => {
    setSubcategoryName(subcategory?.subcategory_name || "");
  }, [subcategory]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subcategory_id: subcategory?.subcategory_id,
        subcategory_name: e.currentTarget.subcategory_name.value,
      }),
    }).then((res) => {
      if (res.ok) {
        setShowModal(false);
        mutate(apiUrl);
      }
    });
  };
  return (
    <div
      id="defaultModal"
      tabIndex={-1}
      aria-hidden="true"
      className={`overflow-y-auto bg-gray-900/80 overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal h-full ${
        showModal ? "flex" : "hidden"
      }`}
    >
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Đổi tên danh mục
            </h3>
            <button
              onClick={() => setShowModal(false)}
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
              <InputField
                id="subcategory_name"
                name="subcategory_name"
                label="Tên danh mục"
                onChange={(e) => setSubcategoryName(e.target.value)}
                value={subcategoryName}
                required
              />

              <button
                type="submit"
                className="text-white flex items-center justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Đổi tên
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const categoriesFetcher: Fetcher<ICategory[], string> = (url) =>
  fetch(url).then((res) => res.json());

const subcategoriesFetcher: Fetcher<ISubcategory[], string> = (url) =>
  fetch(url).then((res) => res.json());

export default function Page({ params }: { params: { catgId: string } }) {
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showCategoryActionModal, setShowCategoryActionModal] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] =
    useState<ISubcategory>();
  const [subcategories, setSubcategories] = useState<ISubcategory[]>([]);
  const apiUrl = "/api/subcatgs";

  const { data } = useSWR(
    `/api/catgs/${params.catgId}/subcatgs`,
    subcategoriesFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    setSubcategories(data || []);
  }, [data]);

  return (
    <div className="font-medium text-gray-900 bg-white  border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white">
      <TableHeader
        categoryId={params.catgId}
        // filteredData={filteredData}
        // setFilteredData={setFilteredData}
        data={data}
        setSubcategories={setSubcategories}
        toggle={showAddCategoryModal}
        setToggle={setShowAddCategoryModal}
        // setData={setSubcategories}
      />
      <ul className="divide-y dark:divide-gray-700 divide-gray-200">
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
              className="w-full flex justify-between items-center px-4 py-3.5 font-medium text-left border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
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
      <SubcategoryActionModal
        apiUrl={apiUrl}
        showModal={showCategoryActionModal}
        setShowModal={setShowCategoryActionModal}
        subcategory={selectedSubcategory}
      />
    </div>
  );
}
