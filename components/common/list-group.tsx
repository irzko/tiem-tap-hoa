import Link from "next/link";

export default function ListGroup({
  data,
  setItemSelected,
  setShowActionModal,
}: {
  setItemSelected: React.Dispatch<React.SetStateAction<ICategory | undefined>>;
  data?: ICategory[];
  setShowActionModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <ul className="font-medium text-gray-900 bg-white border border-t-0 rounded-t-none border-gray-200 last:rounded-lg rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white">
      {data?.map((item) => (
        <li
          key={item.categoryId}
          className="flex w-full items-center  border-gray-200 cursor-pointer hover:bg-gray-100 border-b hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
        >
          <Link
            href={`/dashboard/catgs?id=${item.categoryId}`}
            className="w-full flex justify-between items-center px-4 py-3.5 font-medium text-left"
          >
            <span>
              {item.categoryName}
              <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
            {item._count.subCategories}
          </span>
            </span>
          </Link>
          <button
            onClick={() => {
              setItemSelected(item);
              setShowActionModal(true);
            }}
            className="px-4 py-3.5"
          >
            <svg
              className="w-3.5 h-3.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 8 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
              />
            </svg>
          </button>
        </li>
      ))}
    </ul>
  );
}
