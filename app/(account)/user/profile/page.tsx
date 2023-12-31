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
import { toast } from "react-toastify";

const getUser = async (userId: string) => {
  return fetch(`${process.env.API_URL}/api/user/profile/${userId}`, {
    next: {
      tags: ["user"],
    },
  })
    .then((res) => res.json())
    .then((data) => data);
};

export default async function Page() {
  const session = await getSession();
  const profile = await getUser(session?.user.userId!);
  const updateProfile = async (formData: FormData) => {
    "use server";
    await prisma.user.update({
      where: {
        userId: session?.user.userId!,
      },
      data: {
        fullName: formData.get("fullName") as string,
        email: formData.get("email") as string,
      },
    });
    revalidateTag("user");
  };
  return (
    <div className="max-w-screen-md mx-auto">
      <form
        className="space-y-4 md:space-y-6 flex flex-col"
        action={updateProfile}
      >
        <Card>
          <CardHeader>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Hồ Sơ Của Tôi
            </h1>
          </CardHeader>
          <CardBody className="gap-4">
            <Input
              label="Tên"
              name="fullName"
              defaultValue={profile.fullName}
            />
            <Input label="Email" name="email" defaultValue={profile.email} />
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
