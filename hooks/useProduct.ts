"use client";
import { useEffect, useState } from "react";

const useProduct = (productId: string) => {
  const [data, setData] = useState<IProduct>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/products/${productId}`);
      const product = await res.json();
      setData(product);
      setIsLoading(false);
    };
    fetchProduct();
  }, [productId]);
  return { data, isLoading };
};

export default useProduct;
