"use client";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [products, setProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch("http://localhost:3000/api/products");
      const json = await res.json();
      setProducts(json);
    };
    getProducts();
  }, []);
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Tên
            </th>
            <th scope="col" className="px-6 py-3">
              Số lượng
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod, index) => (
            <tr
              key={prod.productId}
              className={`border-b dark:border-gray-700 ${
                index % 2 === 0
                  ? "bg-white dark:bg-gray-900"
                  : "bg-gray-50 dark:bg-gray-800"
              }`}
            >
              <td className="px-6 py-4">{prod.productId}</td>
              <td className="px-6 py-4">{prod.productName}</td>
              <td className="px-6 py-4">{prod.stockQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
