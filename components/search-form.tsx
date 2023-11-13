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
            className="w-4 h-4"
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
        }
      />
    </form>
  );
}
