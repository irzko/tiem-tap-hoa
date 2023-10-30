import * as Yup from "yup";

export const productSchema = Yup.object({
  productName: Yup.string()
    .required("Không được để trống ô")
    .min(10, "Tên sản phẩm của bạn quá ngắn. Vui lòng nhập ít nhất 10 kí tự."),
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
  weight: Yup.number()
    .required("Không được để trống ô")
    .min(0, "Không được âm")
    .max(30000, "Không vượt quá 30000 gram")
    .typeError("Không được để trống ô"),
  width: Yup.number()
    .required("Không được để trống ô")
    .min(0, "Không được âm")
    .max(150, "Không vượt quá 150 cm")
    .typeError("Không được để trống ô"),
  height: Yup.number()
    .required("Không được để trống ô")
    .min(0, "Không được âm")
    .max(150, "Không vượt quá 150 cm")
    .typeError("Không được để trống ô"),
  length: Yup.number()
    .required("Không được để trống ô")
    .min(0, "Không được âm")
    .max(150, "Không vượt quá 150 cm")
    .typeError("Không được để trống ô"),
});
