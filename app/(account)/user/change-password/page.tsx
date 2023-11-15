import getSession from "@/lib/getSession";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from "@nextui-org/react";
import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { hash } from "bcryptjs";

export default async function Page() {
  const session = await getSession();
  const changePassword = async (formData: FormData) => {
    "use server";
    await prisma.user.update({
      where: {
        userId: session?.user.userId!,
      },
      data: {
        password: await hash(formData.get("newPassword") as string, 10),
      },
    });
    revalidateTag("user");
  };
  return (
    <div className="max-w-screen-md mx-auto">
      <form
        className="space-y-4 md:space-y-6 flex flex-col"
        action={changePassword}
      >
        <Card>
          <CardHeader>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Đổi mật khẩu
            </h1>
          </CardHeader>
          <CardBody className="gap-4">
            <Input
              label="Mật khẩu hiện tại"
              type="password"
              placeholder="Nhập mật khẩu hiện tại"
              name="currentPassword"
            />
            <Input
              label="Mật khẩu mới"
              type="password"
              name="newPassword"
              placeholder="Nhập mật khẩu mới"
            />
            <Input
              label="Nhập lại mật khẩu mới"
              type="password"
              name="rePassword"
              placeholder="Nhập lại mật khẩu mới"
            />
          </CardBody>
          <CardFooter>
            <Button color="primary" type="submit">
              Cập nhật
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
