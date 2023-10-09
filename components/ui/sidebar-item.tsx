import Link from "next/link";

async function getData() {
  const res = await fetch(`${process.env.BASE_URL}/api/catgs`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function SidebarItem() {
  const categoris: ICategory[] = await getData();
  return (
    <>
      <div className="h-full px-3 pb-4 overflow-y-auto">
        <ul className="space-y-2 font-medium">
          {categoris.map((catg) => (
            <li key={catg.categoryId}>
              <Link
                href={`/category/${catg.categoryId}`}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span className="flex-1 whitespace-nowrap">
                  {catg.categoryName}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
