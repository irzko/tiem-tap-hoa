"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Spinner from "./ui/spinner";
import InputField from "./ui/input-field";
import Button from "./ui/button";
import { toast } from "react-toastify";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        signIn("credentials", {
          // redirect: false,
          email: e.currentTarget.email.value,
          password: e.currentTarget.password.value,
        }).then((res) => {
          if (res?.error) {
            toast.error(res.error);
            setLoading(false);
          } else {
            toast.success("Đăng nhập thành công");
          }
        });
      }}
      className="space-y-4 md:space-y-6 flex flex-col"
    >
      <InputField
        id="email"
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        required
      />

      <InputField
        id="password"
        name="password"
        type="password"
        label="Mật khẩu"
        required
      />
      <div className="flex items-center justify-between">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="remember"
              aria-describedby="remember"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
            />
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor="remember"
              className="text-gray-500 dark:text-gray-300"
            >
              Ghi nhớ tôi
            </label>
          </div>
        </div>
        <a
          href="#"
          className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          Quên mật khẩu?
        </a>
      </div>
      <Button disabled={loading}>
        {loading ? <Spinner fill="#fff" /> : <p>Đăng nhập</p>}
      </Button>
      <p className="text-center text-sm text-gray-900 dark:text-white">
        Bạn chưa có tài khoản?&nbsp;
        <Link
          href="/signup"
          className="font-semibold text-blue-600 dark:text-blue-500"
        >
          Đăng ký
        </Link>
      </p>
    </form>
  );
}
