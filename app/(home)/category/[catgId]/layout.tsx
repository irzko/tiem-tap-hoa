import Breadcrumb from "@/components/ui/breadcrumb";
import BreadcrumbItem from "@/components/ui/breadcrumb-item";
import getBreadcrumb from "@/lib/getBeadcrumb";
import React from "react";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { catgId: string };
}) {
  const { catgId } = params;
  const breadcrumb = await getBreadcrumb(catgId);
  return (
    <div>
      <Breadcrumb>
        {breadcrumb.map((item) => (
          <BreadcrumbItem
            href={`/category/${item.categoryId}`}
            key={item.categoryId}
          >
            {item.categoryName}
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
      {children}
    </div>
  );
}
