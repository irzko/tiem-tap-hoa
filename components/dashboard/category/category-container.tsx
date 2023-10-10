"use client";
import CategoryContext from "@/context/CategoryContext";
import TableHeader from "./table-header";
import ListGroupCategory from "./list-group-category";
import ActionModal from "./action-modal";
import { useCallback, useMemo, useRef, useState } from "react";

export default function CategoryContainer({ data }: { data?: ICategory[] }) {
  const [showCategoryActionModal, setShowCategoryActionModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    ICategory | undefined
  >();
  const refCategories = useRef<ICategory[]>(data || []);
  const [categories, setCategories] = useState<ICategory[] | undefined>(data);

  const mutate = useCallback((apiUrl: string) => {
    fetch(apiUrl).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setCategories(data);
          refCategories.current = data;
        });
      }
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      categories,
      mutate,
    }),
    [mutate, categories]
  );
  return (
    <>
      {categories && (
        <CategoryContext.Provider value={contextValue}>
          <div>
            <TableHeader data={refCategories.current} setData={setCategories} />
            <ListGroupCategory
              data={categories}
              setItemSelected={setSelectedCategory}
              setShowActionModal={setShowCategoryActionModal}
            />
            <ActionModal
              showModal={showCategoryActionModal}
              setShowModal={setShowCategoryActionModal}
              category={selectedCategory}
            />
          </div>
        </CategoryContext.Provider>
      )}
    </>
  );
}
