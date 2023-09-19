import { Dispatch, SetStateAction, useState } from "react";
import DeleteCategoryModal from "./detete-category-modal";
import RenameCategoryModal from "./rename-category-modal";

export default function CategoryActionModal({
  showModal,
  setShowModal,
  category,
  apiUrl,
}: {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  category?: ICategory;
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
                {category?.category_name}
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
      <DeleteCategoryModal
        apiUrl={apiUrl}
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        category={category}
      />
      <RenameCategoryModal
        apiUrl={apiUrl}
        showModal={showRenameModal}
        setShowModal={setShowRenameModal}
        category={category}
      />
    </>
  );
}
