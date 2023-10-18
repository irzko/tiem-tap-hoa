import Link from "next/link";
import Accordion from "./accordion";

async function getData() {
  const res = await fetch(`${process.env.API_URL}/api/catgs`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function HomeSidebarItem() {
  const categoris: ICategory[] = await getData();
  return (
    <>
      <div className="h-full p-3 overflow-y-auto">
        <ul className="space-y-2 font-medium">
          {categoris.map((catg) => (
            // <li key={catg.categoryId}>
            //   <Link
            //     href={`/category/${catg.categoryId}`}
            //     className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            //   >
            //     <span className="flex-1 whitespace-nowrap">
            //       {catg.categoryName}
            //     </span>
            //   </Link>
            // </li>
            <Accordion key={catg.categoryId} heading={catg.categoryName}>
              <ul className="mt-2 space-y-4">
                {catg.subCategories &&
                  catg.subCategories.map((subCatg) => {
                    return (
                      <li
                        key={subCatg.categoryId}
                        className="text-gray-500 dark:text-gray-400"
                      >
                        <Link href={`/category/${subCatg.categoryId}`}>
                          {subCatg.categoryName}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </Accordion>
          ))}
        </ul>
      </div>
    </>
  );
}
