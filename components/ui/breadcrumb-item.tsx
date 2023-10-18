import Link from "next/link";

Link;

export default function BreadcrumbItem({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <li className="inline-flex items-center">
      <svg
        className="w-3 h-3 mx-1 text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 6 10"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m1 9 4-4-4-4"
        />
      </svg>
      <Link
        href={href}
        className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
      >
        {children}
      </Link>
    </li>
  );
}
