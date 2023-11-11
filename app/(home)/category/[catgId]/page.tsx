import ProductCard from "@/components/product-card";

export async function generateStaticParams() {
  const categories = await fetch(`${process.env.API_URL}/api/catgs/all`, {
    cache: "no-store",
  }).then((res) => res.json());

  const params = categories.map((category: ICategory) => ({
    catgId: category.categoryId,
  }));
  return params;
}

const getProducts = async (catgId: string): Promise<IProduct[]> => {
  const res = await fetch(
    `${process.env.API_URL}/api/catgs/${catgId}/products`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();
  return data;
};

export default async function Page({ params }: { params: { catgId: string } }) {
  const { catgId } = params;
  const products = await getProducts(catgId);
  return (
    <div className="mx-auto mt-4 max-w-screen-xl">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {products.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </div>
    </div>
  );
}

export const dynamicParams = false;
