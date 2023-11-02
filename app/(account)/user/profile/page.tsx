import getSession from "@/lib/getSession";
import { Button, Card, CardBody, CardFooter, CardHeader, Input } from "@nextui-org/react";

const getUser = async (userId: string) => {
  return fetch(`${process.env.API_URL}/api/user/profile/${userId}`)
      .then((res) => res.json()).then((data) => data);
}


export default async function Page() {
  const session = await getSession();
  const profile = await getUser(session?.user.userId!);
  return (
    <div className="max-w-screen-lg mx-auto">
      <form className="space-y-4 md:space-y-6 flex flex-col">
        <Card>
          <CardHeader>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Hồ Sơ Của Tôi
            </h1>
          </CardHeader>
          <CardBody className="gap-4">
            <Input label="Tên" defaultValue={profile.fullName} />
            <Input label="Email" defaultValue={profile.email} />
          </CardBody>
          <CardFooter>
            <Button color="primary">Cập nhật</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
