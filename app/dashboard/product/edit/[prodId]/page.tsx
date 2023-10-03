"use client";
import Spinner from "@/components/ui/spinner";
import UpdateProductForm from "@/components/dashboard/product/update-product-form";
import useProduct from "@/hooks/useProduct";

export default function Page({ params }: { params: { prodId: string } }) {
  const { prodId } = params;
  const { data: product, isLoading } = useProduct(prodId);

  return (
    <>
      {isLoading ? (
        <div className="absolute top-14  left-0 md:left-64 right-0 bottom-0 flex justify-center items-center">
          <Spinner height={32} width={32} fill="#2563eb" />
        </div>
      ) : (
        <UpdateProductForm product={product} />
      )}
    </>
  );
}
