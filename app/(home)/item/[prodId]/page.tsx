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
    <div className="grid max-w-7xl sm:grid-cols-3">
      <div className="flex justify-center w-full">
        <Image
          src={`/upload/${product.images[0]}`}
          alt={product.productName}
          priority
          width={300}
          height={300}
        />
      </div>
      <div className="col-span-2">
        <h2 className="text-2xl">{product.productName}</h2>
        <div className="text-red-500">
          {product.price.toLocaleString("vi-VN")}
        </div>
        <AddProductToCart productId={product.productId} />
      </div>
    </div>
  );
}
