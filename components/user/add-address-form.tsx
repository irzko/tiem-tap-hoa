"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Tabs,
  Tab,
  RadioGroup,
  Radio,
  cn,
} from "@nextui-org/react";
import useSWR from "swr";
import { addAddress } from "@/lib/actions";

async function fetchWithToken(url: string, token: string) {
  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
  }).then((res) => res.json());
}

const AddressSelect = ({
  selectedAddress,
  setSelectedAddress,
}: {
  selectedAddress: [any, any, any];
  setSelectedAddress: React.Dispatch<React.SetStateAction<[any, any, any]>>;
}) => {
  const [currentTab, setCurrentTab] = useState("city");

  const [districts, setDistricts] = useState<any>();
  const [wards, setWards] = useState<any>();
  const [toggle, setToggle] = useState(false);

  const { data } = useSWR(
    [
      `${process.env.NEXT_PUBLIC_GHN_API_URL}/master-data/province`,
      process.env.NEXT_PUBLIC_GHN_TOKEN as string,
    ],
    ([url, token]) => fetchWithToken(url, token),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const handleSelectCity = (province: any) => {
    setSelectedAddress((prev) => [province, prev[1], prev[2]]);
    fetch(`${process.env.NEXT_PUBLIC_GHN_API_URL}/master-data/district`, {
      headers: {
        "Content-Type": "application/json",
        token: process.env.NEXT_PUBLIC_GHN_TOKEN as string,
      },
      body: JSON.stringify({
        province_id: province.ProvinceID,
      }),
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        setDistricts(data.data);
      });
    setCurrentTab("district");
  };

  const handleSelectDistrict = (district: any) => {
    setSelectedAddress((prev) => [prev[0], district, prev[2]]);
    fetch(`${process.env.NEXT_PUBLIC_GHN_API_URL}/master-data/ward`, {
      headers: {
        "Content-Type": "application/json",
        token: process.env.NEXT_PUBLIC_GHN_TOKEN as string,
      },
      body: JSON.stringify({
        district_id: district.DistrictID,
      }),
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        setWards(data.data);
      });
    setCurrentTab("ward");
  };

  const handleSelectWard = (ward: any) => {
    setSelectedAddress((prev) => [prev[0], prev[1], ward]);
    setToggle(false);
  };

  return (
    <>
      <Input
        isReadOnly
        onChange={() => {}}
        value={
          selectedAddress[2].WardCode &&
          `${selectedAddress[0].ProvinceName}, ${selectedAddress[1].DistrictName}, ${selectedAddress[2].WardName}`
        }
        label="Địa chỉ"
        placeholder="Chọn địa chỉ"
        onClick={() => setToggle((prev) => !prev)}
      />
      {toggle && (
        <Tabs
          fullWidth
          aria-label="Options"
          selectedKey={currentTab}
          onSelectionChange={(key) => setCurrentTab(key.toString())}
        >
          <Tab key="city" title="Tỉnh / Thành Phố">
            <RadioGroup
              value={selectedAddress[0].CityId}
              className="h-64 overflow-auto"
            >
              {data?.data.map((province: any) => (
                <Radio
                  onChange={() => handleSelectCity(province)}
                  key={province.ProvinceID}
                  value={province.ProvinceID}
                  classNames={{
                    base: cn(
                      "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                      "flex-row-reverse max-w-full cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
                      "data-[selected=true]:border-primary"
                    ),
                  }}
                >
                  {province.ProvinceName}
                </Radio>
              ))}
            </RadioGroup>
          </Tab>
          <Tab key="district" title="Quận / Huyện">
            <RadioGroup
              className="h-64 overflow-auto"
              value={selectedAddress[1].DistrictId}
            >
              {districts?.map((district: any) => (
                <Radio
                  onChange={() => handleSelectDistrict(district)}
                  key={district.DistrictID}
                  value={district.DistrictID}
                  classNames={{
                    base: cn(
                      "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                      "flex-row-reverse max-w-full cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
                      "data-[selected=true]:border-primary"
                    ),
                  }}
                >
                  {district.DistrictName}
                </Radio>
              ))}
            </RadioGroup>
          </Tab>
          <Tab key="ward" title="Phường / Xã">
            <RadioGroup
              className="h-64 overflow-auto"
              value={selectedAddress[2].WardCode}
            >
              {wards?.map((ward: any) => (
                <Radio
                  key={ward.WardCode}
                  onChange={() => handleSelectWard(ward)}
                  value={ward.WardCode}
                  classNames={{
                    base: cn(
                      "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                      "flex-row-reverse max-w-full cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
                      "data-[selected=true]:border-primary"
                    ),
                  }}
                >
                  {ward.WardName}
                </Radio>
              ))}
            </RadioGroup>
          </Tab>
        </Tabs>
      )}
    </>
  );
};

export default function AddAddressForm() {
  const [selectedAddress, setSelectedAddress] = useState<[any, any, any]>([
    {},
    {},
    {},
  ]);
  const { data: session } = useSession();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button color="primary" variant="flat" onPress={onOpen}>
        Thêm địa chỉ mới
      </Button>
      <Modal
        scrollBehavior="inside"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <form
                action={(formData) => {
                  formData.append("userId", session?.user?.userId as string);
                  formData.append(
                    "province",
                    JSON.stringify(selectedAddress[0])
                  );
                  formData.append(
                    "district",
                    JSON.stringify(selectedAddress[1])
                  );
                  formData.append("ward", JSON.stringify(selectedAddress[2]));
                  addAddress(formData);
                }}
                className="flex flex-col space-y-4"
              >
                <ModalHeader className="flex flex-col gap-1">
                  Thêm địa chỉ mới
                </ModalHeader>
                <ModalBody>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input id="fullName" name="fullName" label="Họ và tên" />
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      label="Số điện thoại"
                    />
                  </div>
                  <AddressSelect
                    selectedAddress={selectedAddress}
                    setSelectedAddress={setSelectedAddress}
                  />

                  <Input
                    id="streetAddress"
                    name="streetAddress"
                    label="Địa chỉ cụ thể"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Hủy
                  </Button>
                  <Button type="submit" color="primary" onPress={onClose}>
                    Thêm
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
