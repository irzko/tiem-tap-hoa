import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function ProductCard({ product }: { product: IProduct }) {
  return (
    <Link
      className="flex flex-col bg-white rounded-lg border border-gray-100 hover:border-white dark:border-gray-800 dark:hover:border-gray-700 hover:shadow-lg dark:hover:shadow-lg-light  dark:bg-gray-900"
      href={`/detail/${product.productId}`}
    >
      <div className="relative flex justify-center w-full aspect-square">
        <Image
          className="object-cover rounded-t-lg"
          src={`${process.env.IMAGE_URL || "http://localhost:1337"}/${product.images[0]}`}
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
  );
}
