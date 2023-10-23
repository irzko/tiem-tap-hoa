"use client";

import useSWR, { Fetcher } from "swr";

const fetcher: Fetcher<IProduct[], string> = (url) =>
  fetch(url).then((res) => res.json());

const useProducts = () => {
  const { data, error, isLoading } = useSWR(`/api/products/`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    products: data,
    isLoading,
    isError: error,
  };
};

export default useProducts;
