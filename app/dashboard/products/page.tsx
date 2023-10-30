const getProduct = async (): Promise<IProduct[]> => {
  return await fetch(`${process.env.API_URL}/api/products`, {
    next: { tags: ["product"] },
  }).then((res) => res.json());
};

export default async function Page() {
  const products = await getProduct();

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
          <tbody className="divide-y">
            {products.map((product) => (
              <tr key={product.productId} className="dark:border-gray-700">
                <th
                  scope="row"
                  className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {product.productName}
                </th>
                <td className="px-4 py-3">{product.category.categoryName}</td>
                <td className="px-4 py-3">{product.stockQuantity}</td>
                <td className="px-4 py-3">{product.price}</td>
                <td className="px-4 py-3 flex items-center justify-end"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
