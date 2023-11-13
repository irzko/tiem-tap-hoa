"use client";
import ProductCard from "@/components/product-card";
import Sidebar from "@/components/ui/sidebar";
import { Button, Divider, Input } from "@nextui-org/react";
import CategoryBreadcrumbs from "@/components/ui/category-breadcrumbs";
import { useState } from "react";
export default function Container({
  products,
  breadcrumb,
}: {
  products: IProduct[];
  breadcrumb: { categoryId: string; categoryName: string }[];
}) {
  const [prods, setProds] = useState(products);
  return (
    <>
      <Sidebar>
        <div className="p-2 space-y-2">
          <h4>Đánh giá</h4>
          <Divider />
          <form className="space-y-2">
            <h4>Chọn khoảng giá</h4>
            <div className="flex space-x-2 items-center">
              <Input
                labelPlacement="outside"
                variant="bordered"
                placeholder="Từ"
              />
              <span>-</span>
              <Input
                labelPlacement="outside"
                variant="bordered"
                placeholder="Đến"
              />
            </div>
            <Button fullWidth variant="bordered" color="primary">
              Áp dụng
            </Button>
          </form>
        </div>
      </Sidebar>
      <main className="mx-auto max-w-screen-xl sm:ml-64 p-2">
        <nav>
          <CategoryBreadcrumbs items={breadcrumb} />
        </nav>
        <div className="grid grid-cols-2 mt-4 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {prods.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>
      </main>
    </>
  );
}
