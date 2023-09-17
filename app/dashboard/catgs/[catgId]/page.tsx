"use client";
import Link from "next/link";
import useSWR, { Fetcher } from "swr";

const categoriesFetcher: Fetcher<ISubcategory[], string> = (url) =>
  fetch(url).then((res) => res.json());

export default function Page({ params }: { params: { catgId: string } }) {
  const { data: subcategories } = useSWR(
    `/api/catgs/${params.catgId}/subcatgs`,
    categoriesFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return (
    <div>
      <ul className="font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {subcategories?.map((subcategory) => (
          <li key={subcategory.category_id}>
            <Link
              className="block w-full capitalize py-3.5 px-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
              href={`/dashboard/catgs/${params.catgId}/${subcategory.subcategory_id}`}
            >
              {subcategory.subcategory_name.toLowerCase()}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
