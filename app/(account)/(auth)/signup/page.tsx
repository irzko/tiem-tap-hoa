"use client";
import { Button, Input } from "@nextui-org/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { signUp } from "@/libs/actions";
import { useState } from "react";

const schema = z.object({
  fullName: z.string().min(1, "Tên không được để trống"),
  email: z
    .string()
    .min(1, "Email không được để trống")
    .email({ message: "Địa chỉ email không hợp lệ" }),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    await signUp(data);
    setLoading(false);
  };
  return (
    <>
      <div className="flex p-1 h-fit gap-2 items-center flex-nowrap overflow-x-scroll scrollbar-hide bg-default-100 rounded-medium w-full">
        <Link
          tabIndex={-1}
          className="z-0 w-full px-3 py-1 flex group relative justify-center items-center cursor-pointer transition-opacity tap-highlight-transparent disabled:cursor-not-allowed disabled:opacity-30 hover:opacity-disabled outline-none focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 h-8 text-small rounded-small"
          href="/login"
        >
          <div className="relative z-10 whitespace-nowrap transition-colors text-default-500">
            Đăng nhập
          </div>
        </Link>
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
            Đăng ký
          </div>
        </button>
      </div>
      <div className="py-3 px-1 outline-none focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            label="Họ và tên"
            {...register("fullName")}
            placeholder="Nhập họ và tên"
            isRequired
            isInvalid={Boolean(errors.fullName)}
            errorMessage={errors.fullName?.message?.toString()}
          />
          <Input
            label="Email"
            {...register("email")}
            type="email"
            placeholder="Nhập email"
            isRequired
            isInvalid={Boolean(errors.email)}
            errorMessage={errors.email?.message?.toString()}
          />
          <Input
            label="Mật khẩu"
            {...register("password")}
            type="password"
            placeholder="Nhập mật khẩu"
            isRequired
            isInvalid={Boolean(errors.password)}
            errorMessage={errors.password?.message?.toString()}
          />
          <div className="flex gap-2 justify-end">
            <Button type="submit" color="primary" fullWidth isLoading={loading}>
              Đăng ký
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUpForm;
