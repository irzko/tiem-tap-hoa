import AddAddressForm from "@/components/user/add-address-form";
import getSession from "@/lib/getSession";
import prisma from "@/lib/prisma";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
} from "@nextui-org/react";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

const getAddresses = async (userId: string): Promise<IAddress[]> => {
  const res = await fetch(`${process.env.API_URL}/api/user/address/${userId}`, {
    next: { tags: ["address"] },
  });
  const data = await res.json();
  return data;
};

export default async function Page() {
  const session = await getSession();
  if (!session) {
    return null;
  }
  const userId = session.user.userId;
  const addresses = await getAddresses(userId);

  const setAddressAsDefault = async (formData: FormData) => {
    "use server";
    const userId = formData.get("userId") as string;
    const addressId = formData.get("addressId") as string;

    await prisma.address.updateMany({
      data: {
        isDefault: false,
      },
      where: {
        isDefault: true,
        userId,
      },
    });

    await prisma.address.update({
      data: {
        isDefault: true,
      },
      where: {
        addressId,
      },
    });

    revalidateTag("address");
    redirect("/user/address");
  };

  return (
    <div className="max-w-screen-md mx-auto">
      <Card>
        <CardHeader className="flex justify-between">
          <h4 className="font-bold text-large">Địa chỉ của tôi</h4>
          <AddAddressForm />
        </CardHeader>
        <Divider />

        <CardBody className="overflow-visible py-2">
          <ul
            className="w-full flex flex-col gap-0.5 p-1 outline-none"
            aria-label="Address List"
            role="listbox"
            tabIndex={-1}
          >
            {addresses.length > 0 &&
              addresses.map((addr) => (
                <li
                  key={addr.addressId}
                  tabIndex={0}
                  className="flex group gap-2 items-center justify-between relative px-2 py-1.5 w-full h-full box-border rounded-small subpixel-antialiased cursor-pointer tap-highlight-transparent outline-none"
                >
                  <span
                    data-label="true"
                    className="flex-1 text-small font-normal truncate"
                  >
                    <h4 className="font-bold text-large">{addr.fullName}</h4>
                    <p>{addr.phoneNumber}</p>

                    <p>
                      {addr.streetAddress}, {addr.ward.WardName},{" "}
                      {addr.district.DistrictName}, {addr.province.ProvinceName}
                    </p>
                    {addr.isDefault && (
                      <Chip color="warning" variant="flat">
                        Mặc định
                      </Chip>
                    )}
                  </span>
                  <div className="flex flex-col space-y-2">
                    <Button type="button" variant="light">
                      Chỉnh sửa
                    </Button>
                    {!addr.isDefault && (
                      <form action={setAddressAsDefault}>
                        <input
                          defaultValue={addr.addressId}
                          name="addressId"
                          hidden
                        />
                        <input
                          defaultValue={addr.userId}
                          name="userId"
                          hidden
                        />
                        <Button type="submit" color="primary">
                          Đặt làm mặc định
                        </Button>
                      </form>
                    )}
                  </div>
                </li>
              ))}
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}
