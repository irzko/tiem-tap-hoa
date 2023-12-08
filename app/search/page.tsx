"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ProductCard from "@/components/product-card";
import Sidebar from "@/components/ui/sidebar";
import { Button, Divider, Input } from "@nextui-org/react";

export default function Page() {
  const searchParams = useSearchParams();
  const search = searchParams.get("keyword");
  const priceFrom = searchParams.get("priceFrom");
  const priceTo = searchParams.get("priceTo");
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    if (search) {
      fetch(
        `/api/search?keyword=${decodeURIComponent(search)}${
          priceFrom ? `&priceFrom=${priceFrom}` : ""
        }${priceTo ? `&priceTo=${priceTo}` : ""}`
      ).then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setProducts(data);
          });
        }
      });
    }
  }, [priceFrom, priceTo, search]);

  const router = useRouter();
  const handleApplyFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const priceFrom = e.currentTarget.priceFrom.value;
    const priceTo = e.currentTarget.priceTo.value;
    const query = new URLSearchParams();
    if (priceFrom) {
      query.set("priceFrom", priceFrom as string);
    }
    if (priceTo) {
      query.set("priceTo", priceTo as string);
    }
    router.push(`/search?keyword=${search}&${query.toString()}`);
  };

  return (
    <>
      <Sidebar>
        <div className="p-2 space-y-2">
          <form className="space-y-2" onSubmit={handleApplyFilter}>
            <h4 className="font-semibold">Chọn khoảng giá</h4>
            <div className="flex space-x-2 items-center">
              <Input
                labelPlacement="outside"
                variant="bordered"
                name="priceFrom"
                defaultValue={searchParams.get("priceFrom") ?? undefined}
                placeholder="Từ"
              />
              <span>-</span>
              <Input
                labelPlacement="outside"
                variant="bordered"
                name="priceTo"
                defaultValue={searchParams.get("priceTo") ?? undefined}
                placeholder="Đến"
              />
            </div>
            <Button type="submit" fullWidth variant="bordered" color="primary">
              Áp dụng
            </Button>
          </form>
        </div>
      </Sidebar>
      <main className="mx-auto max-w-screen-xl sm:ml-64 p-2">
        <div className="grid grid-cols-2 mt-4 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {products.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>
      </main>
    </>
  );
}
