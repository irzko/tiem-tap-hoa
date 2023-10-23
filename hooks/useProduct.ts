"use client";

import useSWR, { Fetcher } from "swr";

const fetcher: Fetcher<IProduct, string> = (url) =>
  fetch(url).then((res) => res.json());

const useProduct = (productId: string) => {
  const { data, error, isLoading } = useSWR(
    `/api/products/${productId}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return {
    product: data,
    isLoading,
    isError: error,
  };
};

export default useProduct;
