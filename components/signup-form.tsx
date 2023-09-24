"use client";
import { useState } from "react";
import { useFormik, FormikProvider, Form, useField } from "formik";
import * as Yup from "yup";
import Spinner from "./common/spinner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import InputField from "./common/input-field";
import Button from "./common/button";

const TextField = ({
  label,
  helpText,
  ...props
}: {
  label: string;
  helpText?: string;
  id: string;
  name: string;
  type: string;
}) => {
  const [field, meta] = useField(props);
  const showFeedback = meta.touched;

  return (
    <div>
      <InputField
        {...props}
        {...field}
        label={label}
        color={meta.error && meta.touched ? "danger" : "primary"}
        aria-describedby={`${props.id}-feedback ${props.id}-help`}
        helperText={showFeedback ? meta.error : helpText}
      />
    </div>
  );
};

const SignUpForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setLoading(true);

      fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then(async (res) => {
        setLoading(false);
        if (res.status === 200) {
          setTimeout(() => {
            router.push("/login");
          }, 2000);
        } else {
          const { error } = await res.json();
        }
      });
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Tên không được để trống"),
      email: Yup.string()
        .email("Địa chỉ email không hợp lệ")
        .required("Email không được để trống"),
      password: Yup.string()
        .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
        .required("Mật khẩu không được để trống"),
    }),
  });

  return (
    <FormikProvider value={formik}>
      <Form className="space-y-4 md:space-y-6 flex flex-col">
        <TextField
          label="Tên đầy đủ"
          id="fullName"
          name="fullName"
          type="text"
        />
        <TextField label="Email" id="email" name="email" type="text" />
        <TextField label="Mật khẩu" id="password" name="password" type="text" />
        <div className="flex items-start mb-6">
          <span className="ml-2 text-xs text-gray-900 dark:text-gray-300">
            Bằng cách đăng ký, bạn đồng ý với
            <Link
              href="#"
              className="text-blue-600 hover:underline dark:text-blue-500"
            >
              &nbsp;Điều khoản
            </Link>
            ,
            <Link
              href="#"
              className="text-blue-600 hover:underline dark:text-blue-500"
            >
              &nbsp;Chính sách quyền riêng tư&nbsp;
            </Link>
            và
            <Link
              href="#"
              className="text-blue-600 hover:underline dark:text-blue-500"
            >
              &nbsp;Chính sách cookie&nbsp;
            </Link>
            của chúng tôi.
          </span>
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? <Spinner fill="#fff" /> : <p>Đăng ký</p>}
        </Button>

        <p className="text-center text-sm text-gray-900 dark:text-white">
          Bạn đã có tài khoản?&nbsp;
          <Link
            href="/login"
            className="font-semibold text-blue-600 hover:underline dark:text-blue-500"
          >
            Đăng nhập
          </Link>
        </p>
      </Form>
    </FormikProvider>
  );
};

export default SignUpForm;
