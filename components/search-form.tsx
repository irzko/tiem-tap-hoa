"use client";

import { Input } from "@nextui-org/react";
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
      <Input
        type="text"
        id="topbar-search"
        name="keyword"
        labelPlacement="outside"
        placeholder="Tìm kiếm"
        startContent={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        }
      />
    </form>
  );
}
