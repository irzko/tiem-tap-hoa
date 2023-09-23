"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import TableHeader from "@/components/table-header";
import ActionModal from "@/components/action-modal";
import ListGroup from "@/components/common/list-group";
import CategoryContext from "@/context/CategoryContext";

export default function Page() {
  const [showCategoryActionModal, setShowCategoryActionModal] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState<
    ISubSubcategory | undefined
  >();
  const [subcategories, setSubcategories] = useState<
    ISubSubcategory[] | undefined
  >();
  const refSubcategories = useRef<ISubSubcategory[]>();
  const searchParams = useSearchParams();
  const catgId = searchParams.get("catgId");

  const apiUrl = catgId ? `/api/catgs/${catgId}/subcatgs` : "/api/subcatgs";
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(apiUrl);
      const data = await res.json();
      setSubcategories(data);
      refSubcategories.current = data;
    };
    fetchCategories();
  }, [apiUrl]);

  const mutate = useCallback((apiUrl: string) => {
    fetch(apiUrl).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setSubcategories(data);
          refSubcategories.current = data;
        });
      }
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      parentId: catgId,
      data: subcategories,
      postApiUrl: "/api/subcatgs",
      getApiUrl: apiUrl,
      mutate,
    }),
    [apiUrl, catgId, mutate, subcategories]
  );

  return (
    <>
      {subcategories && (
        <CategoryContext.Provider value={contextValue}>
          <div>
            <TableHeader
              parentPath="/api/catgs"
              parentKeyId="category_id"
              parentKeyName="category_name"
              keyName="subcategory_name"
              data={refSubcategories.current}
              setData={setSubcategories}
            />
            <ListGroup
              data={subcategories}
              keyName="subcategory_name"
              keyId="subcategory_id"
              setItemSelected={setSelectedSubcategory}
              setShowActionModal={setShowCategoryActionModal}
            />

            <ActionModal
              childPath="/dashboard/sub-subcatgs?subcatgId="
              keyId="subcategory_id"
              keyName="subcategory_name"
              showModal={showCategoryActionModal}
              setShowModal={setShowCategoryActionModal}
              category={selectedSubcategory}
            />
          </div>
        </CategoryContext.Provider>
      )}
    </>
  );
}
