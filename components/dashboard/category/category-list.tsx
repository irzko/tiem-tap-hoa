import { Button, Listbox, ListboxItem } from "@nextui-org/react";
import Link from "next/link";

export default function CategoryList({
  data,
  setItemSelected,
  setShowActionModal,
}: {
  data?: ICategory[];
  setItemSelected: React.Dispatch<React.SetStateAction<ICategory | undefined>>;
  setShowActionModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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
            as={Link}
            href={`/dashboard/category/${item.categoryId}`}
            key={item.categoryId}
            endContent={
              <div className="flex items-center gap-1 text-default-400">
                <span className="text-small">{item._count.subCategories}</span>
                <Button
                  isIconOnly
                  variant="light"
                  radius="full"
                  onPress={() => {
                    setItemSelected(item);
                    setShowActionModal(true);
                  }}
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
                </Button>
              </div>
            }
          >
            {item.categoryName}
          </ListboxItem>
        )}
      </Listbox>
    </>
  );
}
