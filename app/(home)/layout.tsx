"use client";
import Sidebar from "@/components/ui/sidebar";
import Navbar from "@/components/ui/navbar";
import { SidebarProvider } from "@/context/SidebarContext";
import Link from "next/link";

const Cart = () => {
  return (
    <Link href="/cart">
      <svg
        className="w-6 h-6 text-gray-800 dark:text-white"
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
          d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1"
        />
      </svg>
    </Link>
  );
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar />
      <Navbar>
        <div className="w-full flex justify-end mx-2">
          <Cart />
        </div>
      </Navbar>
      <main>
        <div className="p-4 sm:ml-64">
          <div className="p-4 mt-14">{children}</div>
        </div>
      </main>
    </SidebarProvider>
  );
}
