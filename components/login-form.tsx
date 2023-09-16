"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Spinner from "./layouts/spinner";
import InputField from "./layouts/input-field";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);

        signIn("credentials", {
          redirect: false,
          email: e.currentTarget.email.value,
          password: e.currentTarget.password.value,
          // @ts-ignore
        }).then(({ error }) => {
          if (error) {
            setLoading(false);
          } else {
            setTimeout(() => {
              router.push("/dashboard");
            }, 1000);
          }
        });
      }}
      className="flex flex-col space-y-4 bg-white dark:bg-gray-900 px-4 py-8 sm:px-8  "
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
      <button
        disabled={loading}
        className={`${
          loading
            ? "cursor-not-allowed border-gray-200 bg-gray-100"
            : "border-black bg-blue-700 text-white hover:bg-blue-800 dark:hover:bg-blue-700"
        } focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:focus:ring-blue-800`}
      >
        {loading ? <Spinner /> : <p>Đăng nhập</p>}
      </button>
      <p className="text-center text-sm text-gray-900 dark:text-white">
        Bạn chưa có tài khoản?&nbsp;
        <Link href="/signup" className="font-semibold text-blue-600">
          Đăng ký
        </Link>
      </p>
    </form>
  );
}
