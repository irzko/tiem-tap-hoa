"use client";
import ActionModal from "@/components/dashboard/category/action-modal";
import ListGroupCategory from "@/components/dashboard/category/list-group-category";
import TableHeader from "@/components/dashboard/category/table-header";
import CategoryContext from "@/context/CategoryContext";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const [showCategoryActionModal, setShowCategoryActionModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    ICategory | undefined
  >();
  const [categories, setCategories] = useState<ICategory[] | undefined>();
  const refCategories = useRef<ICategory[]>();

  const searchParams = useSearchParams();
  const categoryId = searchParams.get("id");

  const apiUrl = categoryId ? `/api/catgs/${categoryId}` : "/api/catgs";

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(apiUrl);
      const data = await res.json();
      setCategories(data);
      refCategories.current = data;
    };
    fetchCategories();
  }, [apiUrl]);

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
