const getBreadcrumb = async (catgId: string) => {
  const breadcrumb: { categoryName: string; categoryId: string }[] = [];
  await fetch(`${process.env.API_URL}/api/catgs/${catgId}/parents`, {
    cache: "no-store",
  })
    .then((res) => res.json())
    .then((data: ICategory) => {
      breadcrumb.push({
        categoryName: data.categoryName,
        categoryId: data.categoryId,
      });
      if (data.parentCategoryId) {
        breadcrumb.push({
          categoryName: data.parentCategory.categoryName,
          categoryId: data.parentCategory.categoryId,
        });
        if (data.parentCategory.parentCategoryId) {
          getBreadcrumb(data.parentCategory.parentCategoryId);
        }
      } else {
        return breadcrumb;
      }
    });
  return breadcrumb.reverse();
};

export default getBreadcrumb;
