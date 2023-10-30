"use client";
import CategoryContext from "@/context/CategoryContext";
import CategoryTableHeader from "./category-table-header";
import CategoryList from "./category-list";
import { useEffect, useMemo, useState } from "react";

export default function CategoryContainer({ data }: { data?: ICategory[] }) {
  const [categories, setCategories] = useState<ICategory[]>([]);
  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data]);

  const contextValue = useMemo(
    () => ({
      categories,
      // mutate,
    }),
    [categories]
  );
  return (
    <>
      {categories && (
        <CategoryContext.Provider value={contextValue}>
          <div>
            <CategoryTableHeader data={data} setData={setCategories} />
            <CategoryList data={categories} />
          </div>
        </CategoryContext.Provider>
      )}
    </>
  );
}
