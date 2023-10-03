"use client";
import React, { useState } from "react";

export default function MenuButton({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [isOpenOnSmallScreens, setOpenOnSmallScreens] = useState(false);
  return (
    <>
      <button
        type="button"
        className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        onClick={() => setOpenOnSmallScreens(!isOpenOnSmallScreens)}
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      <aside
        id="logo-sidebar"
        className={`fixed sm:top-14 top-0 z-40 left-0 w-full sm:w-64 h-screen pt-20 sm:pt-6 transition-transform bg-white border border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 ${
          isOpenOnSmallScreens ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          type="button"
          className="inline-flex absolute top-3 left-3 items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          onClick={() => setOpenOnSmallScreens(!isOpenOnSmallScreens)}
        >
          <span className="sr-only">Open sidebar</span>

          <svg
            className="h-6 w-6"
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
        </button>
        {children}
      </aside>
    </>
  );
}
