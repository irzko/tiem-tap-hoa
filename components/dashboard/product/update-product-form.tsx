"use client";
import { ChangeEvent, useState } from "react";
import InputField from "../../ui/input-field";
import SelectCategory from "./select-category";
import TextArea from "../../ui/textarea";
import SelectImage from "./select-image";
import * as Yup from "yup";
import { Form, FormikProvider, useField, useFormik } from "formik";
import Button from "../../ui/button";
import Spinner from "../../ui/spinner";

const TextField = ({
  helpText,
  ...props
}: {
  placeholder?: string;
  defaultValue?: string;
  onClick?: () => void;
  helpText?: string;
  value?: string;
  id?: string;
  name: string;
  type?: string;
  min?: string;
  max?: string;
}) => {
  const [field, meta] = useField(props);
  const showFeedback = meta.touched;

  return (
    <div>
      <InputField
        {...props}
        {...field}
        color={meta.error && meta.touched ? "danger" : "primary"}
        aria-describedby={`${props.id}-feedback ${props.id}-help`}
        helperText={showFeedback ? meta.error : helpText}
      />
    </div>
  );
};

const TextAreaField = ({
  helpText,
  row,
  ...props
}: {
  row?: number;
  helpText?: string;
  id: string;
  name: string;
}) => {
  const [field, meta] = useField(props);
  const showFeedback = meta.touched;

  return (
    <div>
      <TextArea
        {...props}
        {...field}
        color={meta.error && meta.touched ? "danger" : "primary"}
        aria-describedby={`${props.id}-feedback ${props.id}-help`}
        helperText={showFeedback ? meta.error : helpText}
      />
    </div>
  );
};

const UpdateProductForm = ({ product }: { product?: IProduct }) => {
  const [selectedCategories, setSelectedCategories] = useState<
    ICategory | undefined
  >(product?.category);
  const [toggle, setToggle] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>(
    product!.images!.map((image) => `/upload/` + image)
  );
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles(files);

      const imagePreviews: string[] = [];

      files.forEach((file) => {
        const reader = new FileReader();

        reader.onload = (event) => {
          if (event.target) {
            imagePreviews.push(event.target.result as string);
            setPreviewImages([...imagePreviews]);
          }
        };

        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedPreviews = [...previewImages];
    updatedPreviews.splice(index, 1);
    setPreviewImages(updatedPreviews);

    const updatedFiles = Array.from(selectedFiles || []);
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  const formik = useFormik({
    initialValues: {
      productName: product?.productName,
      // category: "",
      description: product?.description,
      stockQuantity: product?.stockQuantity,
      price: product?.price,
    },
    onSubmit: async (values) => {
      const formData = new FormData();

      if (selectedFiles) {
        for (let i = 0; i < selectedFiles.length; i++) {
          formData.append("images", selectedFiles[i]);
        }
      }

      formData.append(
        "product",
        JSON.stringify({
          categoryId: selectedCategories?.categoryId,
          ...values,
        })
      );

      fetch("/api/products", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    },
    validationSchema: Yup.object({
      productName: Yup.string()
        .required("Không được để trống ô")
        .min(
          10,
          "Tên sản phẩm của bạn quá ngắn. Vui lòng nhập ít nhất 10 kí tự."
        ),
      // category: Yup.string().required("Không được để trống ô"),
      description: Yup.string()
        .min(
          100,
          "Mô tả sản phẩm của bạn quá ngắn. Vui lòng nhập ít nhất 100 kí tự."
        )
        .required("Không được để trống ô"),
      price: Yup.number()
        .required("Không được để trống ô")
        .min(1000, "Giá trị phải ít nhất 1.000")
        .max(120000000, "Giá đã vượt quá giá trị tối đa 120.000.000"),
      stockQuantity: Yup.number()
        .required("Không được để trống ô")
        .min(0, "Số lượng kho phải lớn hơn 0 và nhỏ hơn 10000000.")
        .max(10000000, "Số lượng kho phải lớn hơn 0 và nhỏ hơn 10000000."),
    }),
  });

  return (
    <FormikProvider value={formik}>
      <Form className="space-y-4 md:space-y-6 flex flex-col">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Thêm sản phẩm mới
        </h1>
        <div className="grid md:grid-cols-6 md:gap-6">
          <label
            htmlFor="product-name"
            className="mb-2 col-span-1 text-sm  flex md:justify-end font-medium text-gray-900 dark:text-white"
          >
            Hình ảnh sản phẩm
          </label>
          <div className="col-span-5">
            <SelectImage
              onChange={handleFileChange}
              previewImages={previewImages}
              onRemoveImage={handleRemoveImage}
            />
          </div>
        </div>
        <div className="grid md:grid-cols-6 md:gap-6">
          <label
            htmlFor="productName"
            className="mb-2 col-span-1 text-sm  flex items-center md:justify-end font-medium text-gray-900 dark:text-white"
          >
            Tên sản phẩm
          </label>
          <div className="col-span-5">
            <TextField
              id="productName"
              name="productName"
              type="text"
              placeholder="Nhập vào"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-6 md:gap-6">
          <label
            htmlFor="category"
            className="mb-2 col-span-1 text-sm  flex items-center md:justify-end font-medium text-gray-900 dark:text-white"
          >
            Ngành hàng
          </label>
          <div className="col-span-5">
            <TextField
              name="category"
              defaultValue={selectedCategories?.categoryName}
              onClick={() => setToggle(true)}
              id="category"
              placeholder="Chọn ngành hàng"
            />
          </div>
        </div>

        <SelectCategory
          setCatg={setSelectedCategories}
          toggle={toggle}
          setToggle={setToggle}
        />

        <div className="grid md:grid-cols-6 md:gap-6">
          <label
            htmlFor="description"
            className="mb-2 col-span-1 text-sm flex md:justify-end font-medium text-gray-900 dark:text-white"
          >
            Mô tả sản phẩm
          </label>
          <div className="col-span-5">
            <TextAreaField id="description" name="description" />
          </div>
        </div>

        <div className="grid md:grid-cols-6 md:gap-6">
          <label
            htmlFor="price"
            className="mb-2 col-span-1 text-sm  flex items-center md:justify-end font-medium text-gray-900 dark:text-white"
          >
            Giá
          </label>
          <div className="col-span-5">
            <TextField
              id="price"
              name="price"
              type="number"
              placeholder="Nhập vào"
              min="1000"
              max="120000000"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-6 md:gap-6">
          <label
            htmlFor="stockQuantity"
            className="mb-2 col-span-1 text-sm  flex items-center md:justify-end font-medium text-gray-900 dark:text-white"
          >
            Kho hàng
          </label>
          <div className="col-span-5">
            <TextField
              id="stockQuantity"
              name="stockQuantity"
              type="number"
              placeholder="Nhập vào"
              min="0"
              max="10000000"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? <Spinner fill="#fff" /> : <p>Thêm sản phẩm</p>}
          </Button>
        </div>
      </Form>
    </FormikProvider>
  );
};

export default UpdateProductForm;
