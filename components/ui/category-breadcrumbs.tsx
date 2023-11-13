"use client";
import React from "react";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";

export default function CategoryBreadcrumbs({
  items,
}: {
  items: {
    categoryName: string;
    categoryId: string;
  }[];
}) {
  return (
    <Breadcrumbs>
      {items.map((item) => (
        <BreadcrumbItem
          href={`/category/${item.categoryId}`}
          key={item.categoryId}
        >
          {item.categoryName}
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
}
