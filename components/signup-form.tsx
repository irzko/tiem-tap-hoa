"use client";
import { useState } from "react";
import { useFormik, FormikProvider, Form, useField } from "formik";
import * as Yup from "yup";
import Spinner from "./layouts/spinner";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
      <div className="relative">
        <input
          {...props}
          {...field}
          placeholder=" "
          className={`block rounded-lg px-2.5 pb-1 pt-4 w-full text-sm border-2 appearance-none focus:outline-none focus:ring-0 peer ${
            meta.error && meta.touched
              ? "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
              : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          }`}
          aria-describedby={`${props.id}-feedback ${props.id}-help`}
        />
        <label
          className={`absolute text-sm duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 ${
            meta.error && meta.touched
              ? "text-red-900 dark:text-red-500"
              : "text-gray-500 dark:text-gray-400 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
          }`}
          htmlFor={props.id}
        >
          {label}
        </label>
        <div className="text-xs" id={`${props.id}-help`} tabIndex={-1}>
          {helpText}
        </div>
      </div>
      {showFeedback ? (
        <p
          id={`${props.id}-feedback`}
          aria-live="polite"
          className="mt-2 text-sm text-red-600 dark:text-red-500"
        >
          {meta.error ? meta.error : null}
        </p>
      ) : null}
    </div>
  );
};

const SignUpForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      full_name: "",
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
      full_name: Yup.string().required("Tên không được để trống"),
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
          id="full_name"
          name="full_name"
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
        <button
          type="submit"
          disabled={loading}
          className={`${
            loading
              ? "cursor-not-allowed border-gray-200 bg-gray-100"
              : "border-black bg-blue-700 text-white hover:bg-blue-800 dark:hover:bg-blue-700"
          } focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:focus:ring-blue-800`}
        >
          {loading ? <Spinner /> : <p>Đăng ký</p>}
        </button>

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
