import ProductCard from "@/components/product-card";
import CategoryBreadcrumbs from "@/components/ui/category-breadcrumbs";
import Sidebar from "@/components/ui/sidebar";
import getBreadcrumb from "@/lib/getBeadcrumb";
import { Button, Divider, Input } from "@nextui-org/react";
import { redirect } from "next/navigation";

export async function generateStaticParams() {
  const categories = await fetch(`${process.env.API_URL}/api/catgs/all`, {
    cache: "no-store",
  }).then((res) => res.json());

  const params = categories.map((category: ICategory) => ({
    catgId: category.categoryId,
  }));
  return params;
}

const getProducts = async (
  catgId: string,
  searchParams: { [key: string]: string | string[] | undefined }
): Promise<IProduct[]> => {
  const res = await fetch(
    `${process.env.API_URL}/api/catgs/${catgId}/products?priceFrom=${searchParams.priceFrom}&priceTo=${searchParams.priceTo}`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();
  return data;
};

export default async function Page({
  params,
  searchParams,
}: {
  params: { catgId: string };
  searchParams: { [key: string]: string | undefined };
}) {
  const { catgId } = params;

  const products = await getProducts(catgId, searchParams);
  const breadcrumb = await getBreadcrumb(catgId);
  const filteringAction = async (formData: FormData) => {
    "use server";
    const priceFrom = formData.get("priceFrom");
    const priceTo = formData.get("priceTo");
    const query = new URLSearchParams();
    if (priceFrom) {
      query.set("priceFrom", priceFrom as string);
    }
    if (priceTo) {
      query.set("priceTo", priceTo as string);
    }
    redirect(`/category/${catgId}?${query.toString()}`);
  };
  return (
    <>
      <Sidebar>
        <div className="p-2 space-y-2">
          <h4 className="font-semibold">Đánh giá</h4>
          <div className="flex items-center space-x-2">
            <input type="checkbox" />
            <span>5 sao</span>
          </div>
          <Divider />
          <form className="space-y-2" action={filteringAction}>
            <h4 className="font-semibold">Chọn khoảng giá</h4>
            <div className="flex space-x-2 items-center">
              <Input
                labelPlacement="outside"
                variant="bordered"
                name="priceFrom"
                defaultValue={searchParams.priceFrom}
                placeholder="Từ"
              />
              <span>-</span>
              <Input
                labelPlacement="outside"
                variant="bordered"
                name="priceTo"
                defaultValue={searchParams.priceTo}
                placeholder="Đến"
              />
            </div>
            <Button type="submit" fullWidth variant="bordered" color="primary">
              Áp dụng
            </Button>
          </form>
        </div>
      </Sidebar>
      <main className="mx-auto max-w-screen-xl sm:ml-64 p-2">
        <nav>
          <CategoryBreadcrumbs items={breadcrumb} />
        </nav>
        <div className="grid grid-cols-2 mt-4 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {products.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>
      </main>
    </>
  );
}

export const dynamicParams = false;
