import ProductCard from "@/components/product-card";

async function getProducts(): Promise<IProduct[]> {
  const res = await fetch(`${process.env.API_URL}/api/products`, {
    next: { tags: ["products"] },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page() {
  const products = await getProducts();

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
