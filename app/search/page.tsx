"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";

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
          <Link
            className="flex flex-col bg-white rounded-lg border border-gray-100 hover:border-white dark:border-gray-800 dark:hover:border-gray-700 hover:shadow-lg dark:hover:shadow-lg-light  dark:bg-gray-900"
            key={product.productId}
            href={`/detail/${product.productId}`}
          >
            <div className="relative flex justify-center w-full aspect-square">
              <Image
                className="object-cover rounded-t-lg"
                src={`http://localhost:1337/${product.images[0]}`}
                alt=""
                fill
                sizes="300px"
              />
            </div>
            <div className="border-box flex flex-col p-2 max-w-full">
              <div className="mb-2 last:mb-0 min-h-[40px]">
                <h5 className="text-[0.875rem] leading-5 line-clamp-2 break-words font-semibold tracking-tight text-gray-900 dark:text-white">
                  {product.productName}
                </h5>
              </div>
              <div className="mb-2 last:mb-0 min-h-[16px]"></div>
              <div className="mb-2 last:mb-0 min-h-[20px]">
                <div className="flex items-center justify-between w-full">
                  <div className="flex flex-grow flex-shrink-0 max-w-[170.8px] box-border">
                    <div className="font-normal text-shopee-primary leading-none overflow-hidden whitespace-nowrap text-ellipsis">
                      <span aria-label="current price"></span>
                      <span className="text-xs leading-[0.875rem] text-gray-900 dark:text-white align-middle">
                        ₫
                      </span>
                      <span className="text-base align-middle text-gray-900 dark:text-white leading-[1.25rem]">
                        {product.price.toLocaleString("vi-VN")}&nbsp;₫
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
