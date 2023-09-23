"use client";
import ActionModal from "@/components/action-modal";
import ListGroup from "@/components/common/list-group";
import TableHeader from "@/components/table-header";
import CategoryContext from "@/context/CategoryContext";
import React, { useCallback, useMemo } from "react";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const [showCategoryActionModal, setShowCategoryActionModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    ICategory | undefined
  >();
  const [categories, setCategories] = useState<ICategory[] | undefined>();
  const apiUrl = "/api/catgs";
  const ref = useRef<ICategory[]>();

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(apiUrl);
      const data = await res.json();
      setCategories(data);
      ref.current = data;
    };
    fetchCategories();
  }, []);

  const mutate = useCallback((apiUrl: string) => {
    fetch(apiUrl).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setCategories(data);
          ref.current = data;
        });
      }
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      data:categories,
      mutate,
      getApiUrl: apiUrl,
      postApiUrl: "/api/catgs",
    }),
    [mutate, categories]
  );

  return (
    <>
      {categories && (
        <CategoryContext.Provider value={contextValue}>
          <div>
            <TableHeader
              keyName="category_name"
              data={ref.current}
              setData={setCategories}
            />
            <ListGroup
              data={categories}
              keyName="category_name"
              keyId="category_id"
              setItemSelected={setSelectedCategory}
              setShowActionModal={setShowCategoryActionModal}
            />
            <ActionModal
              childPath="/dashboard/subcatgs?catgId="
              keyId="category_id"
              keyName="category_name"
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
