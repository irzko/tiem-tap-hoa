"use client";
import CategorySelect from "@/components/dashboard/product/category-select";
import ImageSelect from "@/components/dashboard/product/image-select";
import { updateProduct } from "@/lib/actions";
import { productSchema } from "@/lib/validateSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Textarea,
} from "@nextui-org/react";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";

const UpdateProductForm = ({ product }: { product?: IProduct }) => {
  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
    mode: "onBlur",
  });
  const [selectedCategory, setSelectedCategory] = useState<
    ICategory | undefined
  >(product?.category);
  const [toggle, setToggle] = useState<boolean>(false);
  const [selectedImages, setSelectedImages] = useState<string[]>(
    product ? product.images : ([] as string[])
  );

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const formData = new FormData();

      files.forEach((file) => {
        formData.append("images", file);
      });

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setSelectedImages([...selectedImages, ...data.files]);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedFiles = Array.from(selectedImages || []);
    updatedFiles.splice(index, 1);
    setSelectedImages(updatedFiles);
  };

  return (
    <form
      className="space-y-4"
      action={(formData) => {
        formData.append("images", JSON.stringify(selectedImages));
        formData.append("categoryId", selectedCategory?.categoryId as string);
        updateProduct(formData, product?.productId as string);
      }}
    >
      <Card>
        <CardHeader>Thông tin sản phẩm</CardHeader>
        <CardBody className="flex flex-col gap-4">
          <ImageSelect
            onChange={handleFileChange}
            thumbnails={selectedImages}
            onRemoveImage={handleRemoveImage}
          />
          <Input
            label="Tên sản phẩm"
            {...register("productName")}
            placeholder="Nhập tên sản phẩm"
            isRequired
            name="productName"
            defaultValue={product?.productName}
            isInvalid={Boolean(errors.productName)}
            errorMessage={errors.productName?.message?.toString()}
          />

          <Textarea
            label="Mô tả"
            {...register("description")}
            placeholder="Nhập mô tả"
            isRequired
            defaultValue={product?.description}
            name="description"
            isInvalid={Boolean(errors.description)}
            errorMessage={errors.description?.message?.toString()}
          />
          <Input
            label="Giá"
            {...register("price")}
            placeholder="Nhập giá sản phẩm"
            isRequired
            name="price"
            defaultValue={product?.price.toString()}
            type="number"
            isInvalid={Boolean(errors.price)}
            min="1000"
            max="120000000"
            errorMessage={errors.price?.message?.toString()}
          />
          <Input
            name="category"
            label="Ngành hàng"
            defaultValue={selectedCategory?.categoryName}
            onClick={() => setToggle(true)}
            id="category"
            placeholder="Chọn ngành hàng"
          />
          <CategorySelect
            setCatg={setSelectedCategory}
            toggle={toggle}
            setToggle={setToggle}
          />
          <Input
            label="Số lượng"
            {...register("stockQuantity")}
            placeholder="Nhập số lượng"
            type="number"
            defaultValue={product?.stockQuantity.toString()}
            isRequired
            min="0"
            max="10000000"
            isInvalid={Boolean(errors.stockQuantity)}
            errorMessage={errors.stockQuantity?.message?.toString()}
          />
        </CardBody>
      </Card>
      <Card>
        <CardHeader>Vận chuyển</CardHeader>
        <CardBody>
          <div className="grid grid-cols-3 gap-4">
            <Input
              label="Chiều rộng"
              {...register("width")}
              defaultValue={product?.width.toString()}
              endContent={<span>cm</span>}
              isInvalid={Boolean(errors.width)}
              errorMessage={errors.width?.message?.toString()}
            />
            <Input
              label="Chiều dài"
              {...register("length")}
              endContent={<span>cm</span>}
              defaultValue={product?.length.toString()}
              isInvalid={Boolean(errors.length)}
              errorMessage={errors.length?.message?.toString()}
            />
            <Input
              label="Chiều cao"
              {...register("height")}
              endContent={<span>cm</span>}
              defaultValue={product?.height.toString()}
              isInvalid={Boolean(errors.height)}
              errorMessage={errors.height?.message?.toString()}
            />
            <Input
              type="number"
              className="col-span-1"
              label="Cân nặng"
              defaultValue={product?.weight.toString()}
              {...register("weight")}
              endContent={<span>gr</span>}
              isInvalid={Boolean(errors.weight)}
              errorMessage={errors.weight?.message?.toString()}
            />
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <div className="flex gap-2 w-full justify-end">
            <Button type="submit" color="primary">
              Lưu
            </Button>
          </div>
        </CardBody>
      </Card>
    </form>
  );
};

export default UpdateProductForm;
