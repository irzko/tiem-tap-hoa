"use client";
import { useSession, signOut, signIn } from "next-auth/react";
import Avatar from "./ui/avatar";
import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "./ui/button";
export default function DropdownUser() {
  const { data: session } = useSession();

  const [showDropdown, setShowDropdown] = useState(false);
  useEffect(() => {
    function handleMobileTapInsideMain(event: MouseEvent) {
      const main = document.querySelector("main");
      const isClickInsideMain = main?.contains(event.target as Node);
      if (isClickInsideMain) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleMobileTapInsideMain);
    return () => {
      document.removeEventListener("mousedown", handleMobileTapInsideMain);
    };
  }, []);

  return (
    <>
      {session ? (
        <div className="flex items-center ml-3">
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex text-sm rounded-full focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
              aria-expanded="false"
            >
              <span className="sr-only">Open user menu</span>

              <Avatar />
            </button>
            <div
              className={`z-50 my-4 text-base list-none w-48 bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600 absolute top-8 right-0 bottom-auto left-auto ${
                showDropdown ? "block" : "hidden"
              }
              `}
              id="dropdown-user"
            >
              <div className="px-4 py-3" role="none">
                <p
                  className="text-sm text-gray-900 dark:text-white"
                  role="none"
                >
                  {session.user?.fullName}
                </p>
                <p
                  className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                  role="none"
                >
                  {session.user?.email}
                </p>
              </div>
              <ul className="py-1" role="none">
                {session.user?.role === "ADMIN" && (
                  <li>
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Dashboard
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    href="/user/purchase/unpaid"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                  >
                    Đơn mua
                  </Link>
                </li>
                <li>
                  <Link
                    href="/user/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                  >
                    Tài khoản
                  </Link>
                </li>
                <li>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                    onClick={() => signOut()}
                  >
                    Đăng xuất
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <button
          className="whitespace-nowrap font-medium rounded-lg text-sm flex items-center justify-center text-gray-900 dark:text-white"
          onClick={() => signIn()}
        >
          Đăng nhập
        </button>
      )}
    </>
  );
}
