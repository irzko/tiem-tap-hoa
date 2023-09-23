"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import TableHeader from "@/components/table-header";
import ActionModal from "@/components/action-modal";
import ListGroup from "@/components/common/list-group";
import CategoryContext from "@/context/CategoryContext";

export default function Page() {
  const [showActionModal, setShowActionModal] = useState(false);
  const [selectedSubSubcategory, setSelectedSubSubcategory] = useState<
    ISubSubcategory | undefined
  >();
  const [subSubcategories, setSubSubcategories] = useState<
    ISubSubcategory[] | undefined
  >();
  const refSubSubcategories = useRef<ISubSubcategory[]>();
  const searchParams = useSearchParams();
  const subcatgId = searchParams.get("subcatgId");

  const apiUrl = subcatgId
    ? `/api/subcatgs/${subcatgId}/sub-subcatgs`
    : "/api/subcatgs";
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(apiUrl);
      const data = await res.json();
      setSubSubcategories(data);
      refSubSubcategories.current = data;
    };
    fetchCategories();
  }, [apiUrl]);

  const mutate = useCallback((apiUrl: string) => {
    fetch(apiUrl).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setSubSubcategories(data);
          refSubSubcategories.current = data;
        });
      }
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      parentId: subcatgId,
      data: subSubcategories,
      postApiUrl: "/api/sub-subcatgs",
      getApiUrl: apiUrl,
      mutate,
    }),
    [apiUrl, subcatgId, mutate, subSubcategories]
  );

  return (
    <>
      {subSubcategories && (
        <CategoryContext.Provider value={contextValue}>
          <div>
            <TableHeader
              parentPath="/api/subcatgs"
              parentKeyId="subcategory_id"
              parentKeyName="subcategory_name"
              keyName="subsubcategory_name"
              data={refSubSubcategories.current}
              setData={setSubSubcategories}
            />
            <ListGroup
              data={subSubcategories}
              keyName="subsubcategory_name"
              keyId="subsubcategory_id"
              setItemSelected={setSelectedSubSubcategory}
              setShowActionModal={setShowActionModal}
            />

            <ActionModal
              // childPath="/dashboard/sub-subcatgs?subcatgId="
              keyId="subsubcategory_id"
              keyName="subsubcategory_name"
              showModal={showActionModal}
              setShowModal={setShowActionModal}
              category={selectedSubSubcategory}
            />
          </div>
        </CategoryContext.Provider>
      )}
    </>
  );
}
