import CategoryContainer from "@/components/dashboard/category/category-container";

export async function generateStaticParams() {
  const categories = await fetch(`${process.env.BASE_URL}/api/catgs`, {
    cache: "no-store",
  }).then((res) => res.json());

  const params = categories.map((category: ICategory) => ({
    categoryId: [category.categoryId],
  }));
  params.push({ categoryId: [] });
  return params;
}

const getCategories = async (categoryId: string) => {
  if (categoryId) {
    return await fetch(`${process.env.BASE_URL}/api/catgs/${categoryId}`, {
      cache: "no-store",
    }).then((res) => res.json());
  } else {
    return await fetch(`${process.env.BASE_URL}/api/catgs`, {
      cache: "no-store",
    }).then((res) => res.json());
  }
};

export default async function Page({
  params,
}: {
  params: { categoryId: string };
}) {
  const { categoryId } = params;
  const categories = await getCategories(categoryId);
  return (
    <>
      <CategoryContainer data={categories} />
    </>
  );
}

export const dynamicParams = false;