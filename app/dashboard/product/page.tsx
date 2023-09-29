"use client";
import ProductActionModal from "@/components/dashboard/product/product-action-modal";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [showActionModal, setShowActionModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch("http://localhost:3000/api/products");
      const json = await res.json();
      setProducts(json);
    };
    getProducts();
  }, []);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-3">
                Tên sản phẩm
              </th>
              <th scope="col" className="px-4 py-3">
                Danh mục
              </th>
              <th scope="col" className="px-4 py-3">
                Kho hàng
              </th>
              <th scope="col" className="px-4 py-3">
                Giá
              </th>
              <th scope="col" className="px-4 py-3">
                <span className="sr-only">Thao tác</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.categoryId}
                className="border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {product.productName}&#34;
                </th>
                <td className="px-4 py-3">{product.category.categoryName}</td>
                <td className="px-4 py-3">{product.stockQuantity}</td>
                <td className="px-4 py-3">{product.price}</td>
                <td className="px-4 py-3 flex items-center justify-end">
                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setShowActionModal(true);
                    }}
                    className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                    type="button"
                  >
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ProductActionModal
        product={selectedProduct as IProduct}
        showModal={showActionModal}
        setShowModal={setShowActionModal}
      />
    </>
  );
}
