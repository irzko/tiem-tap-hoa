"use client";
import { useSidebarContext } from "@/context/SidebarContext";
import { Button } from "@nextui-org/react";

export default function SidebarToggle() {
  const { isOpenOnSmallScreens, setOpenOnSmallScreens } = useSidebarContext();
  return (
    <Button
      type="button"
      variant="bordered"
      isIconOnly
      className="md:hidden"
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
    </Button>
  );
}
