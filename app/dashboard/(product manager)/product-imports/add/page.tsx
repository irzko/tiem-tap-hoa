"use client";

import useProducts from "@/hooks/useProducts";
import { Button, Card, CardBody, CardFooter, Input} from "@nextui-org/react";
import { FormEvent } from "react";
import { toast } from "react-toastify";
import useSWR, { Fetcher, mutate } from "swr";
import Select from "react-select"

const supplierFetcher: Fetcher<ISupplier[], string> = async (url) => {
  return fetch(url).then((res) => res.json());
};

export default function Page() {
  const { products } = useProducts();
  const { data: suppliers } = useSWR(`/api/suppliers`, supplierFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch(`/api/product-imports`, {
      method: "POST",
      body: JSON.stringify({
        supplierId: e.currentTarget.supplierId.value,
        productId: e.currentTarget.productId.value,
        quantity: e.currentTarget.quantity.value,
        price: e.currentTarget.price.value,
        status: "Đang chờ",
      }),
    }).then((res) => {
      if (res.status === 201) {
        toast.success("Thêm nhà cung cấp thành công");
        mutate(`/api/product-imports`);
      } else {
        toast.error("Thêm nhà cung cấp thất bại");
      }
    });
  };
  return (
    <form>
      <Card>
        <CardBody>
        <Select
                    name="supplierId"
                    placeholder="Chọn nhà cung cấp"
                    options={
                      suppliers?.map((supplier) => ({
                        label: supplier.supplierName,
                        value: supplier.supplierId,
                      })) ?? []
                    }
                  />

                  {/* <Select
                    name="warehouseId"
                    placeholder="Chọn nhà kho"
                    options={
                      warehouses?.map((warehouse) => ({
                        label: warehouse.warehouseName,
                        value: warehouse.warehouseId,
                      })) ?? []
                    }
                  /> */}

                  <Select
                    name="productId"
                    placeholder="Chọn sản phẩm"
                    options={
                      products?.map((product) => ({
                        label: product.productName,
                        value: product.productId,
                      })) ?? []
                    }
                  />

                  <div className="flex gap-2">
                    <Input label="Số lượng" name="quantity" id="quantity" />
                    <Input label="Giá nhập hàng" name="price" id="price" />
                  </div>
        </CardBody>
        <CardFooter>
        <Button variant="light">
                    Close
                  </Button>
                  <Button color="primary" type="submit">
                    Lưu
                  </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
