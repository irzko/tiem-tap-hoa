"use client";

import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function SearchForm() {
  const router = useRouter();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const keyword = e.currentTarget.keyword.value;
    router.push(`/search?keyword=${keyword}`);
  };
  return (
    <form onSubmit={handleSubmit} className="hidden lg:block">
      <label htmlFor="topbar-search" className="sr-only">
        Search
      </label>
      <div className="relative lg:w-96">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="text"
          id="topbar-search"
          name="keyword"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-9 px-2.5 h-8 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="Tìm kiếm"
        />
      </div>
    </form>
  );
}
