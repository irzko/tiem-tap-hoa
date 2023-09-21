"use client";
import { CategoryContext } from "@/context/CategoryContext";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<ICategory[] | undefined>();

  const apiUrl = "/api/catgs";
  const fetchCategories = async () => {
    const res = await fetch(apiUrl);
    const data = await res.json();
    setCategories(data);
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const mutate = useCallback((key: string) => {
    fetch(key).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setCategories(data);
          // ref.current = data;
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
      <CategoryContext.Provider value={contextValue}>
        {children}
      </CategoryContext.Provider>
    </>
  );
}
