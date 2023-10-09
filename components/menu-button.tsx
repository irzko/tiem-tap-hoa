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
        className="sm:hidden relative text-gray-900 w-8 h-8 flex justify-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-full text-sm text-center items-center mr-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:text-white dark:hover:border-gray-600"
        onClick={() => setOpenOnSmallScreens(!isOpenOnSmallScreens)}
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-4 h-4 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 16 12"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h14M1 6h14M1 11h7"
          />
        </svg>
      </button>
      <aside
        id="logo-sidebar"
        className={`fixed sm:top-14 top-0 z-40 space-y-2 left-0 w-full sm:w-64 h-screen transition-transform bg-white border border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 ${
          isOpenOnSmallScreens ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="sm:hidden w-full p-3 flex items-center justify-between bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <button
            type="button"
            className="text-gray-900 w-8 h-8 flex justify-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-full text-sm text-center items-center mr-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:text-white dark:hover:border-gray-600"
            onClick={() => setOpenOnSmallScreens(!isOpenOnSmallScreens)}
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
          {children}
      </aside>
    </>
  );
}
