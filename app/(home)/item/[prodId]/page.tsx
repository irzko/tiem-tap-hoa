import AddProductToCart from "@/components/dashboard/product/add-product-to-cart";
import Image from "next/image";
async function getData(productId: string) {
  const res = await fetch(`${process.env.BASE_URL}/api/products/${productId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page({ params }: { params: { prodId: string } }) {
  const { prodId } = params;
  const product: IProduct = await getData(prodId);

  return (
    <div className="grid max-w-7xl md:grid-cols-3 gap-2">
      <div className="flex justify-center w-full">
        {product.images.length > 0 ? (
          <Image
            src={`${process.env.IMAGE_URL}/${product.images[0]}`}
            alt={product.productName}
            priority
            width={300}
            height={300}
          />
        ) : (
          <div className="sm:w-[300px] w-screen aspect-square flex justify-center items-center bg-white dark:bg-gray-700">
            <svg
              className="w-16 h-16 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
            </svg>
          </div>
        )}
      </div>
      <div className="col-span-2">
        <h5 className="text-xl line-clamp-2 font-semibold tracking-tight text-gray-900 dark:text-white">
          {product.productName}
        </h5>
        <div className="my-4 text-3xl font-bold text-gray-900 dark:text-white">
          {product.price.toLocaleString("vi-VN")}&nbsp;₫
        </div>
        <AddProductToCart productId={product.productId} />
      </div>
    </div>
  );
}
