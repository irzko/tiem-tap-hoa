"use client";
import { Button, Input, Link as NextLink } from "@nextui-org/react";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  const router = useRouter();
  return (
    <>
      <div className="flex p-1 h-fit gap-2 items-center flex-nowrap overflow-x-scroll scrollbar-hide bg-default-100 rounded-medium w-full">
        <button
          tabIndex={0}
          className="z-0 w-full px-3 py-1 flex group relative justify-center items-center cursor-pointer transition-opacity tap-highlight-transparent disabled:cursor-not-allowed disabled:opacity-30 outline-none focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 h-8 text-small rounded-small"
          type="button"
        >
          <span
            className="absolute z-0 inset-0 rounded-small bg-background dark:bg-default shadow-small"
            style={{ opacity: 1 }}
          ></span>
          <div className="relative z-10 whitespace-nowrap transition-colors text-default-foreground">
            Đăng nhập
          </div>
        </button>
        <Link
          tabIndex={-1}
          className="z-0 w-full px-3 py-1 flex group relative justify-center items-center cursor-pointer transition-opacity tap-highlight-transparent disabled:cursor-not-allowed disabled:opacity-30 hover:opacity-disabled outline-none focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 h-8 text-small rounded-small"
          href="/signup"
        >
          <div className="relative z-10 whitespace-nowrap transition-colors text-default-500">
            Đăng ký
          </div>
        </Link>
      </div>
      <div className="py-3 px-1 outline-none focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2">
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            signIn("credentials", {
              redirect: false,
              email: e.currentTarget.email.value,
              password: e.currentTarget.password.value,
            }).then((res) => {
              if (res?.error) {
                toast.error(res.error);
                setLoading(false);
                return;
              } else {
                setLoading(false);
                pathname === "/login"
                  ? router.push("/")
                  : router.push(pathname);
              }
            });
          }}
        >
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Nhập email"
            isRequired
          />
          <Input
            label="Mật khẩu"
            name="password"
            type="password"
            placeholder="Nhập mật khẩu"
            isRequired
          />
          <div className="flex gap-2 justify-end">
            <Button fullWidth color="primary" type="submit" isLoading={loading}>
              Đăng nhập
            </Button>
          </div>
          <NextLink
            color="primary"
            as={Link}
            href="/forgot-password"
            className="flex justify-center"
          >
            Quên mật khẩu?
          </NextLink>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
