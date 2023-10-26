"use client";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import Link from "next/link";

export default function HomeSidebarItem({
  categories,
}: {
  categories: ICategory[];
}) {
  const itemClasses = {
    base: "py-0 w-full",
    title: "font-normal text-medium",
    trigger:
      "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
    indicator: "text-medium",
    content: "text-small px-2",
  };
  return (
    <>
      <Accordion
        showDivider={false}
        itemClasses={itemClasses}
        className="space-y-2 p-2 font-medium"
      >
        {categories.map((catg) => (
          <AccordionItem key={catg.categoryId} title={catg.categoryName}>
            {catg.subCategories &&
              catg.subCategories.map((subCatg) => {
                return (
                  <li key={subCatg.categoryId}>
                    <Button as={Link} href={`/category/${subCatg.categoryId}`}>
                      {subCatg.categoryName}
                    </Button>
                  </li>
                );
              })}
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}
