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
        <Image
          src={`${process.env.IMAGE_URL}/${product.images[0]}`}
          alt={product.productName}
          priority
          width={300}
          height={300}
        />
      </div>
      <div className="col-span-2">
        <h5 className="text-xl line-clamp-2 break-words font-semibold tracking-tight text-gray-900 dark:text-white">
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
