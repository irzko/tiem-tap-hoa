"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { orderStatus } from "./order-status";

export default function OrderTabs({ baseURL }: { baseURL: string }) {
  const pathname = usePathname();

  const tabType = pathname.split("/")[3];

  return (
    <div className="text-sm sticky top-14 bg-white dark:bg-gray-900 font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <ul className="flex overflow-x-auto -mb-px">
        {orderStatus.map((orderTab, index) => (
          <li className="mr-2" key={index}>
            <Link
              href={`${baseURL}/${orderTab.type}`}
              className={`inline-block p-4 whitespace-nowrap border-b-2 rounded-t-lg ${
                tabType === orderTab.type
                  ? "text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500"
                  : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 border-transparent"
              }`}
            >
              {orderTab.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
