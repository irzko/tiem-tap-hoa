import { Chip, Listbox, ListboxItem } from "@nextui-org/react";
import Link from "next/link";
import CategoryActionModal from "./category-action-modal";

export default function CategoryList({ data }: { data?: ICategory[] }) {
  return (
    <>
      <Listbox
        items={data}
        aria-label="User Menu"
        className="p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 overflow-visible shadow-small rounded-medium"
        itemClasses={{
          base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
        }}
      >
        {(item) => (
          <ListboxItem
            key={item.categoryId}
            endContent={
              <div className="flex items-center gap-1 text-default-400">
                <Chip color="danger" variant="flat">
                  {item._count.subCategories} danh mục con
                </Chip>

                <CategoryActionModal category={item} />
              </div>
            }
          >
            <Link href={`/dashboard/category/${item.categoryId}`}>
              {item.categoryName}
            </Link>
          </ListboxItem>
        )}
      </Listbox>
    </>
  );
}
