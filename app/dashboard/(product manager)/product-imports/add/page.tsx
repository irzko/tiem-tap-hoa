"use client";

import useProducts from "@/hooks/useProducts";
import { Button, Card, CardBody, CardFooter, Input } from "@nextui-org/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import useSWR, { Fetcher } from "swr";
import Select, { SingleValue } from "react-select";
import { useRouter } from "next/navigation";

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

  const [data, setData] = useState<
    {
      productId: string;
      quantity: string;
      price: string;
    }[]
  >([
    {
      productId: "",
      quantity: "",
      price: "",
    },
  ]);

  const handleProductChange = (
    e: SingleValue<{ label: string; value: string }>,
    index: number
  ) => {
    const newData = [...data];
    newData[index] = {
      ...newData[index],
      productId: e?.value || "",
    };
    setData(newData);
  };


  const router = useRouter();

  const handleQuantityChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newData = [...data];
    newData[index] = {
      ...newData[index],
      quantity: e.target.value,
    };
    setData(newData);
  };

  const handlePriceChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newData = [...data];
    newData[index] = {
      ...newData[index],
      price: e.target.value,
    };
    setData(newData);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch(`/api/product-imports`, {
      method: "POST",
      body: JSON.stringify({
        supplierId: e.currentTarget.supplierId.value,
        data: data.map((item) => ({
          productId: item.productId,
          quantity: parseInt(item.quantity),
          price: parseInt(item.price),
        })),
      }),
    }).then((res) => {
      if (res.status === 201) {
        toast.success("Thêm nhà cung cấp thành công");
        router.push("/dashboard/product-imports");
      } else {
        toast.error("Thêm nhà cung cấp thất bại");
      }
    });
  };
  return (
    <form onSubmit={handleSubmit}>
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
          {data.map((item, index) => (
            <div key={index}>
              <div className="my-4">
                <div className="grid md:grid-cols-3 gap-2">
                  <Select
                    name="productId"
                    placeholder="Chọn sản phẩm"
                    onChange={(e) => handleProductChange(e, index)}
                    options={
                      products?.map((product) => ({
                        label: product.productName,
                        value: product.productId,
                      })) ?? []
                    }
                  />
                  <Input
                    placeholder="Số lượng"
                    name="quantity"
                    radius="none"
                    variant="bordered"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(e, index)}
                    labelPlacement="outside"
                    id="quantity"
                  />
                  <Input
                    placeholder="Giá nhập hàng"
                    name="price"
                    radius="none"
                    variant="bordered"
                    value={item.price}
                    id="price"
                    onChange={(e) => handlePriceChange(e, index)}
                    labelPlacement="outside"
                  />
                </div>
              </div>
            </div>
          ))}
          <div className="text-right">
            <Button
              type="button"
              onPress={() => {
                setData([...data, { productId: "", quantity: "", price: "" }]);
              }}
            >
              Thêm sản phẩm
            </Button>
          </div>
        </CardBody>
        <CardFooter>
          <Button color="primary" type="submit">
            Lưu
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
