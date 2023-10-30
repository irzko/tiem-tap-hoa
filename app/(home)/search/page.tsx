"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ProductCard from "@/components/product-card";

export default function Page() {
  const searchParams = useSearchParams();
  const search = searchParams.get("keyword");
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    if (search) {
      fetch(`/api/search?keyword=${decodeURIComponent(search)}`).then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setProducts(data);
          });
        }
      });
    }
  }, [search]);

  return (
    <div className="mx-auto max-w-screen-xl">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {products.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </div>
    </div>
  );
}
