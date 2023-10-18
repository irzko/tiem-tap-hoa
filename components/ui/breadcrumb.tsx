import React from "react";

export default function Breadcrumb({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <nav
      className="flex px-5 py-3 mb-4 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {children}
      </ol>
    </nav>
  );
}
