import UpdateProductForm from "@/components/dashboard/product/update-product-form";

export async function generateStaticParams() {
  const products = await fetch(`${process.env.API_URL}/api/products`, {
    next: { tags: ["products"] },
  }).then((res) => res.json());

  const params = products.map((product: IProduct) => ({
    prodId: product.productId,
  }));
  return params;
}

const getProduct = async (prodId: string) => {
  return await fetch(`${process.env.API_URL}/api/products/${prodId}`, {
    next: { tags: ["products"] },
  }).then((res) => res.json());
};

export default async function Page({ params }: { params: { prodId: string } }) {
  const { prodId } = params;
  const product = await getProduct(prodId);
  return (
    <>
      <UpdateProductForm product={product} />
    </>
  );
}
