"use client";
import { Button, Card, CardBody, Input, Tab, Tabs } from "@nextui-org/react";
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";

const schema = z.object({
  fullName: z.string().min(1, "Tên không được để trống"),
  email: z
    .string()
    .min(1, "Email không được để trống")
    .email({ message: "Địa chỉ email không hợp lệ" }),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

const SignUpForm = () => {
  const {
    register,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = (data: any) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        label="Họ và tên"
        {...register("fullName")}
        onChange={() => {
          clearErrors("fullName");
        }}
        placeholder="Nhập họ và tên"
        isRequired
        isInvalid={Boolean(errors.fullName)}
        errorMessage={errors.fullName?.message?.toString()}
      />
      <Input
        label="Email"
        {...register("email")}
        onChange={() => {
          clearErrors("email");
        }}
        type="email"
        placeholder="Nhập email"
        isRequired
        isInvalid={Boolean(errors.email)}
        errorMessage={errors.email?.message?.toString()}
      />
      <Input
        label="Mật khẩu"
        {...register("password")}
        onChange={() => {
          clearErrors("password");
        }}
        type="password"
        placeholder="Nhập mật khẩu"
        isRequired
        isInvalid={Boolean(errors.password)}
        errorMessage={errors.password?.message?.toString()}
      />
      <div className="flex gap-2 justify-end">
        <Button type="submit" fullWidth color="primary">
          Đăng ký
        </Button>
      </div>
    </form>
  );
};

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div>
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
            } else {
              router.push(pathname);
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
      </form>
    </div>
  );
};

function SignUp() {
  return (
    <section>
      <div className="flex flex-col items-center p-4 justify-center mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center my-4 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          Tiệm tạp hoá
        </a>
        <div className="flex flex-col w-full md:min-h-[500px]">
          <Card className="max-w-md w-full mx-auto">
            <CardBody>
              <Tabs aria-label="Options" fullWidth>
                <Tab key="login" title="Đăng nhập">
                  <LoginForm />
                </Tab>
                <Tab key="signup" title="Đăng ký">
                  <SignUpForm />
                </Tab>
              </Tabs>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
