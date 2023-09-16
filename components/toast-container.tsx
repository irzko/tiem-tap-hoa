"use client";

import { ToastContainer as Toast } from "react-toastify";

const contextClass = {
  success: "bg-blue-600",
  error: "bg-red-600",
  info: "bg-gray-600",
  warning: "bg-orange-400",
  default: "dark:text-gray-400 dark:bg-gray-800 text-gray-500 bg-white",
  dark: "bg-white-600 font-gray-300",
};

const ToastContainer = () => {
  return (
    <Toast
      theme="dark"
      // toastClassName={({ type }) =>
      //   contextClass[type || "default"] +
      //   " relative flex my-2 items-center w-full max-w-xs p-4 rounded-lg shadow"
      // }
      // hideProgressBar={true}
      // closeButton={
      //   <button
      //     type="button"
      //     className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
      //     data-dismiss-target="#toast-success"
      //     aria-label="Close"
      //   >
      //     <span className="sr-only">Close</span>
      //     <svg
      //       className="w-3 h-3"
      //       aria-hidden="true"
      //       xmlns="http://www.w3.org/2000/svg"
      //       fill="none"
      //       viewBox="0 0 14 14"
      //     >
      //       <path
      //         stroke="currentColor"
      //         strokeLinecap="round"
      //         strokeLinejoin="round"
      //         strokeWidth="2"
      //         d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
      //       />
      //     </svg>
      //   </button>
      // }
      // autoClose={3000}
    />
  );
};

export default ToastContainer;
